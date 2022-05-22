import PointView from '../view/point-view';
import OfferFormView from '../view/offer-form-view';
import { remove, render, renderPosition, replace } from '../render.js';
import { UpdateAction, UpdateType } from '../utils/const';
import SortView from '../view/sort-view';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter {
  #pointContainer = null;

  #point = null;
  #prevPoint = null;
  #pointComponent = null;
  #pointEditComponent = null;
  #changeData = null;
  #changeMode = null;
  #mode = Mode.DEFAULT;

  constructor(pointContainer, changeData, changeMode) {
    this.#pointContainer = pointContainer;
    this.#changeData = changeData;
    this.#changeMode = changeMode;
  }

  init = (point) => {
    this.#point = point;
    this.#prevPoint = this.#point;

    const prevPointComponent = this.#pointComponent;
    const prevEditPointComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView(point);
    this.#pointEditComponent = new OfferFormView(point);

    this.#pointComponent.setEditClickHandler(this.#handleEdit);
    this.#pointEditComponent.setFormSubmitHandler(this.#handleFormSubmit);
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
    this.#mode = Mode.EDITING;
  }

  #replaceFormToPoint = () => {
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#mode = Mode.DEFAULT;
  }

  #onEscKeydowm = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc')
    {
      evt.preventDefault();
      this.#replaceFormToPoint();

      this.init(this.#prevPoint);

      this.#pointEditComponent.reset(this.#prevPoint);

      this.#pointEditComponent._restoreHandlers();
      document.removeEventListener('keydown', this.#onEscKeydowm);

    }
  }

  #handleFavorite = () => {
    this.#changeData(
      UpdateAction.UPDATE_TASK,
      UpdateType.PATCH,
      { ...this.#point, isFavorite: !this.#point.isFavorite }
    );
  }

  #handleFormSubmit = (point) => {
    this.#replaceFormToPoint();//
    document.removeEventListener('keydown', this.#onEscKeydowm);//

    this.#changeData(
      UpdateAction.UPDATE_TASK,
      UpdateType.PATCH,
      point
    );
  }

  #handleEdit = () => {
    this.#replacePointToForm();
    document.addEventListener('keydown', this.#onEscKeydowm);
  }
}
