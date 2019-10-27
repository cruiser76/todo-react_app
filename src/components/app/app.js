import React, {Component} from 'react';
import AppHeader from '../app-header';
import SearchPanel from '../search-panel';
import TodoList from '../todo-list';
import ItemStatusFilter from '../item-status-filter';
import ItemAddForm from '../item-add-form';

import './app.css';

export default class App extends Component {
  constructor() {
    super();

    this._maxId = 100;

    this.state = {
      todoData: [
        this._createTodoItem(`Drink Coffee`),
        this._createTodoItem(`Make Awesome App`),
        this._createTodoItem(`Have a lunch`),
      ],
      term: ``,
      filter: `all` //all, active, done
    };

    this.deleteItem = (id) => {
      this.setState(({todoData}) => {
        const idx = todoData.findIndex((el) => el.id === id);
        const todoDataCopy = todoData.slice(); // создаем копию массива из стэйт, чтобы не менять существующий стэйт
        todoDataCopy.splice(idx, 1);
        return {
          todoData: todoDataCopy,
        }
      });
    };

    this.addItem = (text) => {
      this.setState(({todoData}) => {
        const newArr = todoData.slice();
        newArr.push(this._createTodoItem(text));
        return {
          todoData: newArr
        }
      });
    };

    this.onToggleImportant = (id) => {
      this.setState(({todoData}) => {
        return {todoData: this._toggleProperty(todoData, id, `important`)};
      });
    };

    this.onToggleDone = (id) => {
      console.log(id);
      this.setState(({todoData}) => {
        return {todoData: this._toggleProperty(todoData, id, `done`)};
      });
    };

    this.onChangeSearch = (term) => {
      this.setState({term});
    }

    this.onFilterChange = (filter) => {
      this.setState({filter});
    }
  }

  _toggleProperty(arr, id, propName) {
    const idx = arr.findIndex((el) => el.id === id);
    const arrCopy = arr.slice(); // создаем копию массива из стэйт, чтобы не менять существующий стэйт
    const newObj = {...arr[idx], [propName]: !arr[idx][propName]};// создаем копию объекта
    arrCopy.splice(idx, 1, newObj);
    return arrCopy;
  }

  _createTodoItem(title) {
    return {title, important: false, id: this._maxId++, done: false, visible: true};
  }

  _search(items, term) {
    return items.filter((el) => {
      return el.title.toLowerCase().includes(term.toLowerCase());
    }) 
  }

  _filters(items, filter) {
    switch(filter) {
      case `all`:
        return items;
      case `active`:
        return items.filter((el) => !el.done);
      case `done`:
          return items.filter((el) => el.done);
      default: 
        return items;   
    }
  }

  render() {
    const {todoData, term, filter} = this.state;
    const visibleItem = this._filters(this._search(todoData, term), filter);
    const doneCount = todoData.filter((el) => el.done).length;
    const todoCount = todoData.length - doneCount;

    return (
      <div className="todo-app">
        
        <AppHeader todo={todoCount} done={doneCount} />
        <div className="top-panel d-flex">
          <SearchPanel onChangeSearch = {this.onChangeSearch}/>
          <ItemStatusFilter filter = {filter} onFilterChange = {this.onFilterChange} />
        </div>
        
        <TodoList 
        todos={visibleItem}  
        onDeleted = {this.deleteItem}
        onToggleDone = {this.onToggleDone} 
        onToggleImportant = {this.onToggleImportant}
        />
        <ItemAddForm onAddItem = {this.addItem}/>
      </div>
    );
  }
}