import React, { Component } from "react";
import { variables } from "./Variables.js";

export class ImportBook extends Component {
  constructor(props) {
    super(props);

    this.state = {
      book: [],
      modalTitle: "",
      BookId: 0,
      BookName: "",
      BookAuthor: "",
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
        el.BookId.toString()
          .toLowerCase()
          .includes(BookIdFilter.toString().trim().toLowerCase()) &&
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

  changeBookName = (e) => {
    this.setState({ BookName: e.target.value });
  };
  changeBookAuthor = (e) => {
    this.setState({ BookAuthor: e.target.value });
  };
  changepublishDate = (e) => {
    this.setState({ publishDate: e.target.value });
  };

  changeGenre = (e) => {
    this.setState({ Genre: e.target.value });
  };

  changeBookNameFilter = (e) => {
    this.state.BookNameFilter = e.target.value;
    this.FilterFn();
  };

  changeBookIdFilter = (e) => {
    this.state.BookIdFilter = e.target.value;
    this.FilterFn();
  };

  refreshList() {
    fetch(variables.API_URL + "book")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ book: data, booksWithoutFilter: data });
      });
  }

  addClick() {
    this.setState({
      modalTitle: "Shto Librin",
      BookId: 0,
      BookName: "",
      BookAuthor: "",
      publishDate: "",
      PhotoFileName: "anonymous.png",
      Genre: "",
    });
  }
  editClick(bk) {
    this.setState({
      modalTitle: "Edit Book",
      BookId: bk.BookId,
      BookName: bk.BookName,
      BookAuthor: bk.BookAuthor,
      publishDate: bk.publishDate,
      PhotoFileName: bk.PhotoFileName,
      Genre: bk.Genre,
    });
  }

  createClick() {
    fetch(variables.API_URL + "book", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BookName: this.state.BookName,
        BookAuthor: this.state.BookAuthor,
        publishDate: this.state.publishDate,
        PhotoFileName: this.state.PhotoFileName,
        Genre: this.state.Genre,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  updateClick() {
    fetch(variables.API_URL + "book", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        BookId: this.state.BookId,
        BookName: this.state.BookName,
        BookAuthor: this.state.BookAuthor,
        publishDate: this.state.publishDate,
        PhotoFileName: this.state.PhotoFileName,
        Genre: this.state.Genre,
      }),
    })
      .then((res) => res.json())
      .then(
        (result) => {
          alert(result);
          this.refreshList();
        },
        (error) => {
          alert("Failed");
        }
      );
  }

  deleteClick(id) {
    if (window.confirm("A jeni te sigurt?")) {
      fetch(variables.API_URL + "book/" + id, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then(
          (result) => {
            alert(result);
            this.refreshList();
          },
          (error) => {
            alert("Failed");
          }
        );
    }
  }

  imageUpload = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", e.target.files[0], e.target.files[0].name);

    fetch(variables.API_URL + "book/savefile", {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        this.setState({ PhotoFileName: data });
      });
  };

  render() {
    const {
      book,
      modalTitle,
      BookId,
      BookName,
      BookAuthor,
      publishDate,
      PhotoPath,
      PhotoFileName,
      Genre,
    } = this.state;

    return (
      <div>
        <button
          type="button"
          className="btn btn-primary m-2 float-end"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          onClick={() => this.addClick()}
        >
          Shto Librin
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>
                <div className="d-flex flex-row">
                  <input
                    className="form-control m-2"
                    onChange={this.changeBookNameFilter}
                    placeholder="Filtrues sipas Emrit"
                  />
                </div>
              </th>
            </tr>

            <tr>
              <th>ID e Librit</th>
              <th>Emri i Librit</th>
              <th>Emri i Autori</th>
              <th>Viti i Publikimit</th>
              <th>Zhanra</th>
              <th>Foto</th>
              <th>Opsionet</th>
            </tr>
          </thead>
          <tbody>
            {book.map((bk) => (
              <tr key={bk.BookId}>
                <td>{bk.BookId}</td>
                <td>{bk.BookName}</td>
                <td>{bk.BookAuthor}</td>
                <td>{bk.publishDate}</td>
                <td>{bk.Genre}</td>
                <td>
                  <img
                    class="Bookfoto"
                    src={variables.PHOTO_URL + bk.PhotoFileName}
                  ></img>
                </td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editClick(bk)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-pencil-square"
                      viewBox="0 0 16 16"
                    >
                      <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                      <path
                        fillRule="evenodd"
                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"
                      />
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    onClick={() => this.deleteClick(bk.BookId)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-trash-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z" />
                    </svg>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div
          className="modal fade"
          id="exampleModal"
          tabIndex="-1"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">{modalTitle}</h5>
                <button
                  type="button"
                  className="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>

              <div className="modal-body">
                <div className="d-flex flex-row bd-highlight mb-3">
                  <div className="p-2 w-50 bd-highlight">
                    <div className="input-group mb-3">
                      <span className="input-group-text">Emri i Librit</span>
                      <input
                        type="text"
                        className="form-control"
                        value={BookName}
                        onChange={this.changeBookName}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Emri i Autori</span>
                      <input
                        type="text"
                        className="form-control"
                        value={BookAuthor}
                        onChange={this.changeBookAuthor}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">
                        Data e Publikimit
                      </span>
                      <input
                        type="date"
                        className="form-control"
                        value={publishDate}
                        onChange={this.changepublishDate}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Zhanra</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Genre}
                        onChange={this.changeGenre}
                      />
                    </div>
                  </div>
                  <div className="p-2 w-50 bd-highlight">
                    <img
                      width="250px"
                      height="250px"
                      src={PhotoPath + PhotoFileName}
                    />
                    <input
                      className="m-2"
                      type="file"
                      onChange={this.imageUpload}
                    />
                  </div>
                </div>

                {BookId == 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.createClick()}
                  >
                    Krijo
                  </button>
                ) : null}

                {BookId != 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.updateClick()}
                  >
                    Ruaj ndryshimet
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
