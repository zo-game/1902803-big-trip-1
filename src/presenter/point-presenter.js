import PointView from '../view/point-view';
import OfferFormView from '../view/offer-form-view';
import { remove, render, renderPosition, replace } from '../render.js';
import { UpdateAction, UpdateType } from '../utils/const';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

export default class PointPresenter {
  #pointContainer = null;

  #point = null;
  #prevPoint = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #changeMode = null;
  #changeAction = null;
  #pointModel = null;

  #mode = Mode.DEFAULT;

  constructor(pointContainer, changeAction, changeMode, pointModel) {
    this.#pointContainer = pointContainer;
    this.#changeMode = changeMode;
    this.#changeAction = changeAction;
    this.#pointModel = pointModel;
  }

  init = (point) => {
    this.#point = point;
    this.#prevPoint = point;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView(point);
    this.#pointEditComponent = new OfferFormView(point, this.#pointModel);

    this.#pointComponent.setEditClickHandler(this.#handleEdit);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setFormDeleteHandler(this.#handleFormReset);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavorite);
    render(this.#pointContainer, this.#pointComponent, renderPosition.BEFOREEND);

    if (this.#mode === Mode.DEFAULT && prevPointComponent) {
      replace(this.#pointComponent, prevPointComponent);
    }
    if (this.#mode === Mode.EDITING && prevEditPointComponent) {
      replace(this.#pointEditComponent, prevEditPointComponent);
    }

    remove(prevPointComponent);
    remove(prevEditPointComponent);
  }

  resetView = () => {
    if (this.#mode !== Mode.DEFAULT) {
      this.#replaceFormToPoint();
    }
  }

  destroy = () => {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #replacePointToForm = () => {
    replace(this.#pointEditComponent, this.#pointComponent);
    this.#changeMode();
    document.addEventListener('keydown', this.#onEscKeydown);
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#onEscKeydown);
    this.#mode = Mode.DEFAULT;
  }

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc')
    {
      evt.preventDefault();
      this.#replaceFormToPoint();

      this.#resetOffers(this.#prevPoint);
      this.init(this.#prevPoint);
      this.#pointEditComponent.reset(this.#prevPoint);
      this.#pointEditComponent._restoreHandlers();
      document.removeEventListener('keydown', this.#onEscKeydown);
    }
  }

  #resetOffers = (point) => {
    const offers = point.offer.offers;
    offers.forEach((offer) => {
      if(offer !== undefined || offer.isChecked !== undefined){
        offer.isChecked = false;
      }
    });
  }

  #handleFavorite = () => {
    this.#changeAction(UpdateAction.UPDATE_POINT, UpdateType.PATCH, { ...this.#point, isFavorite: !this.#point.isFavorite });
  }

  #handleFormSubmit = (point) => {
    document.removeEventListener('keydown', this.#onEscKeydown);
    this.#changeAction(UpdateAction.UPDATE_POINT, UpdateType.MAJOR, point).finally(()=>{
      this.#replaceFormToPoint();

    });
  }

  #handleEdit = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#onEscKeydown);
  }

  #handleFormReset = (point) => {
    document.removeEventListener('keydown', this.#onEscKeydown);
    this.#changeAction(UpdateAction.DELETE_POINT, UpdateType.MAJOR, point).finally(()=>{
      this.#replaceFormToPoint();
    });
  }

  setViewState = (state) => {
    if(this.#mode === Mode.DEFAULT){
      return;
    }

    const resetState = () => {
      this.#pointEditComponent.updateData({
        isDisabled: false,
        isDeleting: false,
        isSaving: false,
      });
    };

    switch(state){
      case State.DELETING:
        this.#pointEditComponent.updateData({
          isDisabled: true,
          isDeleting: true
        });
        break;
      case State.SAVING:
        this.#pointEditComponent.updateData({
          isDisabled: true,
          isSaving: true
        });
        break;
      case State.ABORTING:
        this.#pointComponent.shake(resetState);
        this.#pointEditComponent.shake(resetState);//
    }
  }
}
