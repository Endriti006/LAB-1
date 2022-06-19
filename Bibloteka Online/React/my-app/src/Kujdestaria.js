import React, { Component } from "react";
import { variables } from "./Variables.js";

export class Kujdestaria extends Component {
  constructor(props) {
    super(props);

    this.state = {
      kujdestaria: [],
      modalTitle: "",
      Kujdestaria: 0,
      dita: "",
      nderrimi: "",
      orari_Nga: "",
      orari_Deri: "",
    };
  }

  refreshList() {
    fetch(variables.API_URL + "kujdestaria")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ kujdestaria: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  changedita = (e) => {
    this.setState({ dita: e.target.value });
  };
  changenderrimi = (e) => {
    this.setState({ nderrimi: e.target.value });
  };
  changeOrariNga = (e) => {
    this.setState({ orari_Nga: e.target.value });
  };
  changeOrariDeri = (e) => {
    this.setState({ orari_Deri: e.target.value });
  };
  changeVendbanimi = (e) => {
    this.setState({ Vendbanimi: e.target.value });
  };

  addClick() {
    this.setState({
      modalTitle: "Shto Kujdestarine",
      KujdestariaID: 0,
      dita: "",
      nderrimi: "",
      orari_Nga: "",
      orari_Deri: "",
      Vendbanimi: "",
    });
  }
  editClick(kuj) {
    this.setState({
      modalTitle: "Edit Kujdestaria",
      KujdestariaID: kuj.KujdestariaID,
      dita: kuj.dita,
      nderrimi: kuj.nderrimi,
      orari_Nga: kuj.orari_Nga,
      orari_Deri: kuj.orari_Deri,
    });
  }

  createClick() {
    fetch(variables.API_URL + "kujdestaria", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        dita: this.state.dita,
        nderrimi: this.state.nderrimi,
        orari_Nga: this.state.orari_Nga,
        orari_Deri: this.state.orari_Deri,
        Vendbanimi: this.state.Vendbanimi,
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
    fetch(variables.API_URL + "kujdestaria", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        KujdestariaID: this.state.KujdestariaID,
        dita: this.state.dita,
        nderrimi: this.state.nderrimi,
        orari_Nga: this.state.orari_Nga,
        orari_Deri: this.state.orari_Deri,
        Vendbanimi: this.state.Vendbanimi,
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
      fetch(variables.API_URL + "kujdestaria/" + id, {
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

  render() {
    const {
      kujdestaria,
      modalTitle,
      KujdestariaID,
      dita,
      nderrimi,
      orari_Nga,
      orari_Deri,
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
          Shto Kujdestari
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID e Kujdestarise</th>
              <th>Dita</th>
              <th>Nderrimi</th>
              <th>Nga</th>
              <th>Deri</th>
              <th>Opsionet</th>
            </tr>
          </thead>
          <tbody>
            {kujdestaria.map((kuj) => (
              <tr key={kuj.KujdestariaID}>
                <td>{kuj.KujdestariaID}</td>
                <td>{kuj.dita}</td>
                <td>{kuj.nderrimi}</td>
                <td>{kuj.orari_Nga}</td>
                <td>{kuj.orari_Deri}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editClick(kuj)}
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
                    onClick={() => this.deleteClick(kuj.KujdestariaID)}
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
                      <span className="input-group-text">Dita</span>
                      <input
                        type="text"
                        className="form-control"
                        value={dita}
                        onChange={this.changedita}
                      />
                    </div>
                    <div className="input-group mb-3">
                      <span className="input-group-text">Nderrimi</span>
                      <input
                        type="text"
                        className="form-control"
                        value={nderrimi}
                        onChange={this.changenderrimi}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Nga</span>
                      <input
                        type="text"
                        className="form-control"
                        value={orari_Nga}
                        onChange={this.changeOrariNga}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Deri</span>
                      <input
                        type="text"
                        className="form-control"
                        value={orari_Deri}
                        onChange={this.changeOrariDeri}
                      />
                    </div>
                  </div>
                </div>

                {KujdestariaID == 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.createClick()}
                  >
                    Krijo
                  </button>
                ) : null}

                {KujdestariaID != 0 ? (
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
