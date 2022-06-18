import './Faqet.css';
import React, { Component } from "react";
import { variables } from "../Variables.js";

export class AudioAbo extends Component {
  constructor(props) {
    super(props);

    this.state = {
        audiobooks: [],
        modalTitle: "",
        AudioBooksId: 0,
        AudioBooksName: "",
        AudioBooksAuthor: "",
        publishDate: "",
        PhotoFileName: "anonymous.png",
        PhotoPath: variables.PHOTO_URL,
        Genre: "",
        BookNameFilter: "",
        BookIdFilter: "",
      };
    }
  
    //Pjesa e Filterit....
    FilterFn() {
      var BookNameFilter = this.state.BookNameFilter;
      var BookIdFilter = this.state.BookIdFilter;
  
      var filteredData = this.state.booksWithoutFilter.filter(function (el) {
        return (
          el.AudioBooksName.toString()
            .toLowerCase()
            .includes(BookNameFilter.toString().trim().toLowerCase())
        );
      });
  
      this.setState({ audiobooks: filteredData });
    }
  
    sortResult(prop, asc) {
      var sortedData = this.state.booksWithoutFilter.sort(function (a, b) {
        if (asc) {
          return a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0;
        } else {
          return b[prop] > a[prop] ? 1 : b[prop] < a[prop] ? -1 : 0;
        }
      });
  
      this.setState({ audiobooks: sortedData });
    }
  
    //Pjesa tjeter
    refreshList() {
      fetch(variables.API_URL + "AudioBooks")
        .then((response) => response.json())
        .then((data) => {
          this.setState({ audiobooks: data });
        });
    }
  
    componentDidMount() {
      this.refreshList();
    }
  
  
    changeBookNameFilter = (e) => {
      this.state.BookNameFilter = e.target.value;
      this.FilterFn();
    };
  
    changeBookIdFilter = (e) => {
      this.state.BookIdFilter = e.target.value;
      this.FilterFn();
    };
  
    refreshList() {
      fetch(variables.API_URL + "AudioBooks")
        .then((response) => response.json())
        .then((data) => {
          this.setState({ audiobooks: data, booksWithoutFilter: data });
        });
    }


  render() {
    const {
        audiobooks,
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
            {audiobooks.map((bk) => (
                <div >
                    <audio controls>
                    <source src={variables.PHOTO_URL + bk.PhotoFileName} type="audio/mpeg" /><br/>
                    </audio>
                    <p>{bk.AudioBooksName} -    by: {bk.AudioBooksAuthor}</p>
                </div>
            ))}
        </div>
    </>
    );
  }
}
