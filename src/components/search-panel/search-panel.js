import React, {Component} from 'react';
import './search-panel.css';

export default class SearchPanel extends Component {
  constructor() {
    super();

    this.state = {
      term: ``
    };

    this.onChangeSearch = (evt) => {
      const term = evt.target.value;
      this.setState({term});
      this.props.onChangeSearch(term);
    };
  }
    
  render() {
    
    return (<input type="text" 
                   className="form-control search-input"
                   onChange = {this.onChangeSearch} 
                   placeholder="type to search" 
                   value = {this.state.term} />);
  };
};
