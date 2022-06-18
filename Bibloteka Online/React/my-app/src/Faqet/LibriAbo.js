import './Faqet.css';
import React, { Component } from "react";
import { variables } from "../Variables.js";

export class LibriAbo extends Component {
  constructor(props) {
    super(props);

    this.state = {
      book: [],
      modalTitle: "",
      BookNameFilter: "",
    };
  }

  //Pjesa e Filterit....
  FilterFn() {
    var BookNameFilter = this.state.BookNameFilter;

    var filteredData = this.state.booksWithoutFilter.filter(function (el) {
      return (
        el.BookName.toString()
          .toLowerCase()
          .includes(BookNameFilter.toString().trim().toLowerCase())
      );
    });

    this.setState({ book: filteredData });
  }

  sortResult(prop, asc) {
    var sortedData = this.state.booksWithoutFilter.sort(function (a, b) {
      if (asc) {
        return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
      } else {
        return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
      }
    });

    this.setState({ book: sortedData });
  }

  //Pjesa tjeter
  refreshList() {
    fetch(variables.API_URL + "book")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ book: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  changeBookNameFilter = (e) => {
    this.state.BookNameFilter = e.target.value;
    this.FilterFn();
  };

  refreshList() {
    fetch(variables.API_URL + "book")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ book: data, booksWithoutFilter: data });
      });
  }


  render() {
    const {
      book,
    } = this.state;

    return (
    <>
        <div className="d-flex flex-row">
            <input
            className="form-control m-2"
            onChange={this.changeBookNameFilter}
             placeholder="Searche..."
            />
        </div>

        <div className='content'>
            {book.map((bk) => (
                <div >
                    <img class="td-libri" src={variables.PHOTO_URL + bk.PhotoFileName}></img><br/>
                    <p>{bk.BookName} -    by: {bk.BookAuthor}</p>
                </div>
            ))}
        </div>
    </>
    );
  }
}
