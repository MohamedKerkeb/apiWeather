import React, { Component } from "react";

export default class Search extends Component {
  state = {
    search: ""
  };
  onSearchChange = e => {
    this.setState({ search: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.getSearch(this.query.value);
    e.currentTarget.reset();
  };

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="search">VILLE : </label>
          <input
            type="text"
            onChange={this.onSearchChange}
            ref={Input => (this.query = Input)}
            name="search"
            placeholder="..."
          />
          <button type="submit" className="btn btn-danger">
            {" "}
            Météo
          </button>
        </form>
      </div>
    );
  }
}
