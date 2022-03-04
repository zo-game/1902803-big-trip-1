import { createSiteMenuTemplate } from "./view/site-menu-view";
import { createEventsTemlate } from "./view/site-events-view";
import { renderTemplate, RenderPosition } from './render.js';

const tripContainer = document.querySelector('.page-body__container');
const tripMain = tripContainer.querySelector('.trip-main');


renderTemplate(tripMain, createSiteMenuTemplate(), RenderPosition.BEFOREEND);
renderTemplate(tripMain, createEventsTemlate(), RenderPosition.BEFOREEND);
