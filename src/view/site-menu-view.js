import AbstractView from './abstract-view.js';
import { MenuItem } from '../utils/const.js';

const createSiteMenuTemplate = () =>
  `<div class="trip-controls__navigation">
    <h2 class="visually-hidden">Switch trip view</h2>
    <nav class="trip-controls__trip-tabs  trip-tabs">
      <a class="trip-tabs__btn  trip-tabs__btn--active" href="#" value='${MenuItem.TABLE}'>Table</a>
      <a class="trip-tabs__btn" href="#" value='${MenuItem.STATS}'>Stats</a>
    </nav>
  </div>
  `;

export default class SiteMenuView extends AbstractView{
  constructor(){
    super();
  }

  get template() {
    return createSiteMenuTemplate();
  }

  setMenuClickHandler = (callback) =>{
    this._callback.menuClick = callback;
    const buttons = [...this.element.querySelectorAll('.trip-tabs__btn')];
    buttons.forEach((button) =>
      button.addEventListener('click', this.#menuClickHandler));
  }

  #menuClickHandler = (evt) => {
    evt.preventDefault();
    const value = evt.target.attributes.value.nodeValue;
    this._callback.menuClick(value);
  }

  setMenuItem = (menuItem) => {
    const items = this.element.querySelectorAll('.trip-tabs__btn');
    items.forEach((item) => item.classList.remove('trip-tabs__btn--active'));
    const changingItem = this.element.querySelector(`[value=${menuItem}]`);

    if(changingItem !== null){
      changingItem.classList.add('trip-tabs__btn--active');
    }
  }
}
