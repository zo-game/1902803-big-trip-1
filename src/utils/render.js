import AbstractClass from '../view/abstract-class';
export const RenderPosition = {
  BEFOREBEGIN: 'beforebegin' ,
  AFTERBEGIN: 'afterbegin' ,
  BEFOREEND : 'beforeend' ,
  AFTEREND : 'afterend' ,
};

export const render = (container, element, place) => {
  const parent = container instanceof AbstractClass ? container.element : container;
  const child = element instanceof AbstractClass ? element.element : element;

  switch(place){
    case RenderPosition.BEFOREBEGIN:
      parent.before(child);
      break;
    case RenderPosition.AFTERBEGIN:
      parent.prepend(child);
      break;
    case RenderPosition.BEFOREEND:
      parent.append(child);
      break;
    case RenderPosition.AFTEREND:
      parent.after(child);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div');
  newElement.innerHTML = template;

  return newElement.firstChild;
};

export const replace = (newElement, oldElement) =>
{
  if(newElement === null || oldElement === null){
    throw('Нельзя добавить несуществующие элементы');
  }

  const newChild = newElement instanceof AbstractClass ? newElement.element : newElement;
  const oldChild = oldElement instanceof AbstractClass ? oldElement.element : oldElement;

  const parent = oldChild.parentElement;
  if(parent === null){
    throw('Не существует родительский элемент');
  }

  parent.replaceChild(newChild, oldChild);
};

export const remove = (component) => {
  if(component === null){
    return;
  }

  if(!(component instanceof AbstractClass)){
    throw('Cant remove only components');
  }

  component.element.remove();
  component.removeElement();
};
