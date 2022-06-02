import React, { Component } from "react";
import { variables } from "./Variables.js";

export class ShtoAbonuesin extends Component {
  constructor(props) {
    super(props);

    this.state = {
      abonuesi: [],
      modalTitle: "",
      AbonuesiId: 0,
      fullName: "",
      Shkollimi: "",
      DateOfJoining: "",
      VitiLindjes: "",
      Vendbanimi: "",
    };
  }

  refreshList() {
    fetch(variables.API_URL + "abonuesi")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ abonuesi: data });
      });
  }

  componentDidMount() {
    this.refreshList();
  }

  changefullName = (e) => {
    this.setState({ fullName: e.target.value });
  };
  changeShkollimi = (e) => {
    this.setState({ Shkollimi: e.target.value });
  };
  changeDateOfJoining = (e) => {
    this.setState({ DateOfJoining: e.target.value });
  };
  changeVitiLindjes = (e) => {
    this.setState({ VitiLindjes: e.target.value });
  };
  changeVendbanimi = (e) => {
    this.setState({ Vendbanimi: e.target.value });
  };

  addClick() {
    this.setState({
      modalTitle: "Shto Abonuesin",
      AbonuesiId: 0,
      fullName: "",
      Shkollimi: "",
      DateOfJoining: "",
      VitiLindjes: "",
      Vendbanimi: "",
    });
  }
  editClick(ab) {
    this.setState({
      modalTitle: "Edit Abonuesin",
      AbonuesiId: ab.AbonuesiId,
      fullName: ab.fullName,
      Shkollimi: ab.Shkollimi,
      DateOfJoining: ab.DateOfJoining,
      VitiLindjes: ab.VitiLindjes,
      Vendbanimi: ab.Vendbanimi,
    });
  }

  createClick() {
    fetch(variables.API_URL + "abonuesi", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: this.state.fullName,
        Shkollimi: this.state.Shkollimi,
        DateOfJoining: this.state.DateOfJoining,
        VitiLindjes: this.state.VitiLindjes,
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
    fetch(variables.API_URL + "abonuesi", {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        AbonuesiId: this.state.AbonuesiId,
        fullName: this.state.fullName,
        Shkollimi: this.state.Shkollimi,
        DateOfJoining: this.state.DateOfJoining,
        VitiLindjes: this.state.VitiLindjes,
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
      fetch(variables.API_URL + "abonuesi/" + id, {
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
      abonuesi,
      modalTitle,
      AbonuesiId,
      fullName,
      Shkollimi,
      DateOfJoining,
      VitiLindjes,
      Vendbanimi,
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
          Shto Abonuesi
        </button>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>ID e Abonuesi</th>
              <th>Emri i Abonuesi</th>
              <th>Salla e Punes</th>
              <th>Dita e Abonimit</th>
              <th>Opsionet</th>
            </tr>
          </thead>
          <tbody>
            {abonuesi.map((ab) => (
              <tr key={ab.AbonuesiId}>
                <td>{ab.AbonuesiId}</td>
                <td>{ab.fullName}</td>
                <td>{ab.Shkollimi}</td>
                <td>{ab.DateOfJoining}</td>
                <td>
                  <button
                    type="button"
                    className="btn btn-light mr-1"
                    data-bs-toggle="modal"
                    data-bs-target="#exampleModal"
                    onClick={() => this.editClick(ab)}
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
                    onClick={() => this.deleteClick(ab.AbonuesiId)}
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
                      <span className="input-group-text">Emri & Mbiemri</span>
                      <input
                        type="text"
                        className="form-control"
                        value={fullName}
                        onChange={this.changefullName}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">VitiLindjes</span>
                      <input
                        type="text"
                        className="form-control"
                        value={VitiLindjes}
                        onChange={this.changeVitiLindjes}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Vendbanimi</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Vendbanimi}
                        onChange={this.changeVendbanimi}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">Shkollimi</span>
                      <input
                        type="text"
                        className="form-control"
                        value={Shkollimi}
                        onChange={this.changeShkollimi}
                      />
                    </div>

                    <div className="input-group mb-3">
                      <span className="input-group-text">DateOfJoining</span>
                      <input
                        type="date"
                        className="form-control"
                        value={DateOfJoining}
                        onChange={this.changeDateOfJoining}
                      />
                    </div>
                  </div>
                </div>

                {AbonuesiId == 0 ? (
                  <button
                    type="button"
                    className="btn btn-primary float-start"
                    onClick={() => this.createClick()}
                  >
                    Krijo
                  </button>
                ) : null}

                {AbonuesiId != 0 ? (
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
