import React, {Component} from 'react';
import './todo-list-item.css';

export default class TodoListItem extends Component {
 
  //рендер создает и возвращает реакт компонент так же как и функция, но в классе можно хранить состояния объекта
  render() {
    const {title, onDeleted, onToggleDone, onToggleImportant, important, done} = this.props;

    let classNames = `todo-list-item${done ? ` done` : ``}${important ? ` important` : ``}`;
      
    return (
      <span className={classNames}>
        <span className="todo-list-item-label" onClick = {onToggleDone}>
          {title}
        </span>
  
        <button onClick={onToggleImportant} type="button" className="btn btn-outline-success btn-sm float-right">
            <i className="fa fa-exclamation" />
        </button>
  
        
        <button type="button" className="btn btn-outline-danger btn-sm float-right" onClick={onDeleted}>
            <i className="far fa-trash-alt" />
        </button>
      </span>
    );
  }
};