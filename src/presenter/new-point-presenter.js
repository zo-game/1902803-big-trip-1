import PointView from '../view/point-view';
import NewPointView from '../view/new-point-view';
import { remove, render, renderPosition, replace } from '../render.js';
import { UpdateAction, UpdateType } from '../utils/const';
import PointPresenter from './point-presenter';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class NewPointPresenter {
  isFilterDisabled = false;

  #pointContainer = null;
  #point = null;
  #prevPoint = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #changeAction = null;
  #pointPresenters = null;
  #pointModel = null;

  #mode = Mode.DEFAULT;

  constructor(pointContainer, changeAction, pointPresenters, pointModel) {
    this.#pointContainer = pointContainer;
    this.#changeAction = changeAction;
    this.#pointPresenters = pointPresenters;
    this.#pointModel = pointModel;
  }

  init = (point) => {
    if(this.#pointEditComponent !== null){
      return;
    }
    this.#point = point;
    this.#prevPoint = this.#point;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView(point);
    this.#pointEditComponent = new NewPointView(point, this.#pointModel);

    this.#pointComponent.setEditClickHandler(this.#handleEdit);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
    this.#pointEditComponent.setFormDeleteHandler(this.#handleFormReset);
    this.#pointComponent.setFavoriteClickHandler(this.#handleFavorite);
    render(this.#pointContainer, this.#pointEditComponent, renderPosition.AFTERBEGIN);
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
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#mode = Mode.DEFAULT;
  }

  #onEscKeydown = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc')
    {
      evt.preventDefault();
      this.#replaceFormToPoint();

      this.init(this.#prevPoint);

      this.#pointEditComponent.reset(this.#prevPoint);

      this.#pointEditComponent._restoreHandlers();
      document.removeEventListener('keydown', this.#onEscKeydown);

    }
  }

  #handleFavorite = () => {
    this.#changeAction(UpdateAction.UPDATE_POINT, UpdateType.PATCH, { ...this.#point, isFavorite: !this.#point.isFavorite });
  }

  #makeVisibleTabs = () =>{
    document.querySelector( `[value=${'STATS'}]`).classList.remove('visually-hidden');
    document.querySelector( `[value=${'TABLE'}]`).classList.remove('visually-hidden');
  }

  #handleFormSubmit = (point) => {
    this.isFilterDisabled = false;
    document.removeEventListener('keydown', this.#onEscKeydown);
    const pointPresenter = new PointPresenter(this.#pointContainer, this.#changeAction);
    this.#pointPresenters.set(point.id, pointPresenter);
    this.#changeAction(UpdateAction.ADD_POINT, UpdateType.MAJOR, point).finally(() => {
      remove(this.#pointEditComponent);
      this.#pointEditComponent = null;
    });
    this.#makeVisibleTabs();
  }

  #handleEdit = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#onEscKeydown);
  }

  #handleFormReset = (point) => {
    this.isFilterDisabled = false;
    document.removeEventListener('keydown', this.#onEscKeydown);
    remove(this.#pointEditComponent);
    this.#makeVisibleTabs();
    this.#changeAction(UpdateAction.ADD_POINT, UpdateType.MINOR, point);
    this.#changeAction(UpdateAction.DELETE_POINT, UpdateType.MINOR, point);
  }

  setSaving = () => {
    this.#pointEditComponent.updateData({
      isDisabled: true,
      isSaving: true,
    });
  }

  setAborting = () => {
    const resetState = () => {
      this.#pointEditComponent.updateData({
        isDisabled: false,
        isDeleting: false,
        isSaving: false,
      });
    };

    this.#pointEditComponent(resetState);
  }

}
