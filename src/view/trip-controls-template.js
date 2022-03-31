import AbstractClass from './abstract-class';

const createControlsTemplate = () => ('<div class=\'trip-main__trip-controls\'></div>');

export default class ControlsTemplate extends AbstractClass{
  get template(){
    return createControlsTemplate();
  }

}
