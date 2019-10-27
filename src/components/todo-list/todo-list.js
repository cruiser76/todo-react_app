import React from 'react';
import TodoListItem from '../todo-list-item';
import './todo-list.css';

const TodoList = ({todos, onDeleted, onToggleImportant, onToggleDone}) => {

  //реакту при создании однотипных элементов из массива нужны уникальные ключи для быстродействия 
  const elements = todos.map((el) => {
    // деструктурируем объект переданный в качестве элемента массива, заберем id, остальные свойства записываем в рест
    const {id, visible, ...otherProps} = el;
    return (
      <li key={id} className="list-group-item">
        <TodoListItem 
        {...otherProps}
         onDeleted = {() => onDeleted(id)}
         onToggleImportant = {() => onToggleImportant(id)}
         onToggleDone = {() => onToggleDone(id)}
         />
      </li>
    );
  });
  
  return (
  <ul className="list-group todo-list">
    {elements}
  </ul>
  );
};

export default TodoList