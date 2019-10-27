import React, {Component} from 'react';
import './item-add-form.css';

export default class ItemAddForm extends Component {
  constructor() {
    super();

    this.state = {
      label: ``
    };

    this.onLabelChange = (evt) => {
      this.setState({label: evt.target.value});
    };

    this.onSubmit = (evt) => {
      evt.preventDefault();
      this.props.onAddItem(this.state.label);
      this.setState({label: ``});
    }

  }
  
  render() {
    return (
      <form className="item-add-button  d-flex"
            onSubmit = {this.onSubmit} >
        <input type="text"
               className = "form-control"
               onChange = {this.onLabelChange}
               placeholder = "What needs to be done" 
               value = {this.state.label} />

        <button className="btn btn-outline-secondary">Add Item</button>
      </form>
    );
  }
}