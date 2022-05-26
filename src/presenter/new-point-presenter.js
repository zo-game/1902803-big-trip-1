import PointView from '../view/point-view';
// import OfferFormView from '../view/offer-form-view';
import NewPointView from '../view/new-point-view';
import { remove, render, renderPosition, replace } from '../render.js';
import { UpdateAction, UpdateType } from '../utils/const';
import PointPresenter from './point-presenter';
import SortView from '../view/sort-view';

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

  #mode = Mode.DEFAULT;

  constructor(pointContainer, changeAction, pointPresenters) {
    this.#pointContainer = pointContainer;
    this.#changeAction = changeAction;
    this.#pointPresenters = pointPresenters;
  }

  init = (point) => {
    // this.isFilterDisabled = true;
    if(this.#pointEditComponent !== null){
      return;
    }
    this.#point = point;
    this.#prevPoint = this.#point;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView(point);
    this.#pointEditComponent = new NewPointView(point);

    this.#pointComponent.setEditClickHandler(this.#handleEdit);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
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
    this.#pointComponent = null;
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

  #handleFormSubmit = (point) => {
    this.isFilterDisabled = false;
    document.removeEventListener('keydown', this.#onEscKeydown);
    remove(this.#pointEditComponent);
    this.#pointEditComponent = null;

    const pointPresenter = new PointPresenter(this.#pointContainer, this.#changeAction);
    this.#pointPresenters.set(point.id, pointPresenter);
    this.#changeAction(UpdateAction.ADD_POINT, UpdateType.MAJOR, point);

  }

  #handleEdit = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#onEscKeydown);
  }
}
