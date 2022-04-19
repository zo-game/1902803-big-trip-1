import TripEditEventView from '../view/site-edit-events-view';
import TripEventView from '../view/site-events-view';
import { RenderPosition, render, replace, remove } from '../utils/render';

const Mode = {
  DEFAULT: 'DEFAULT',
  EDITING: 'EDITING',
};

export default class PointPresenter{
    #tripEventContainer = null;
    #tripEditComponent = null;
    #tripEventComponent = null;
    #changeData = null;
    #changeMode = null;

    #mode = Mode.DEFAULT;

    #event = null
    constructor(taskEventComponent, dataChange, changeMode){
      this.#tripEventContainer = taskEventComponent;
      this.#changeData = dataChange;
      this.#changeMode = changeMode;
    }

    init = (event) =>{
      this.#event = event;

      const prevEventComponent = this.#tripEventComponent;
      const prevEditEventComponent = this.#tripEditComponent;

      this.#tripEventComponent= new TripEventView(event);
      this.#tripEditComponent = new TripEditEventView(event);

      this.#tripEventComponent.setEditCardToFormClickHandler(this.#handleEditForm);
      this.#tripEventComponent.setFavoriteClickHandler(this.#handleFavoriteClick);

      this.#tripEditComponent.setEditFormToCardClickHandler(() => {
        replace(this.#tripEventComponent, this.#tripEditComponent);
        document.removeEventListener('keydown', this.#escKeyDownHandler);
      });

      render(this.#tripEventContainer, this.#tripEventComponent, RenderPosition.BEFOREEND);
      if(prevEventComponent && this.#mode === Mode.DEFAULT)
      {
        replace(this.#tripEventComponent, prevEventComponent);
      }

      if(prevEditEventComponent && this.#mode === Mode.EDITING)
      {
        replace(this.#tripEditComponent, prevEditEventComponent);
      }
      remove(prevEditEventComponent);
      remove(prevEventComponent);
    }

    destroy = () =>{
      remove(this.TripEditEventView);
      remove(this.#tripEventComponent);
    };

    #handleFormSubmit = (event) =>{
      this.#changeData(event);
      this.#replaceFormToCard();
    }


    #handleFavoriteClick = () =>{
      this.#changeData({...this.#event, isFavorite: !this.#event.isFavorite});
    }

    #handleArchiveClick = () =>{
      this.#changeData({...this.#event, isArchive: !this.#event.isArchive});
    }

    #handleEditForm = () => {
      this.#replaceCardToForm();
    }

    #replaceFormToCard = () => {
      replace(this.#tripEventComponent, this.#tripEditComponent);
      document.removeEventListener('keydown', this.#escKeyDownHandler);

      this.#mode = Mode.DEFAULT;
    }

    #replaceCardToForm =()=>{
      replace(this.#tripEditComponent, this.#tripEventComponent);
      document.addEventListener('keydown', this.#escKeyDownHandler);
      this.#changeMode();
      this.#mode = Mode.EDITING;
    }

    resetView = () => {
      if (this.#mode !== Mode.DEFAULT) {
        this.#replaceFormToCard();
      }
    }

    #escKeyDownHandler = (evt) =>{
      if(evt.key === 'Escape' || evt.key === 'Esc'){
        evt.preventDefault();

        this.#replaceFormToCard();
      }
    }
}
