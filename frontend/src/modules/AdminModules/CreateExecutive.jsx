import React, { Component } from "react";
import axios from "axios";
import Clock from "../../component/common/clock/Clock";
import "./Review.css";

export default class CreateExecutive extends Component {
  constructor(props) {
    super(props);

    this.state = {
      executives: []
    };
  }
  componentDidMount() {
    this.retrieveexecutives();
    console.log("hello");
  }

  retrieveexecutives() {
    axios
      .get("http://localhost:5000/executives", {
        headers: {
          authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxM2I5NDY4ZmQxMTI2NGMzMGNjZTMyNCIsImlhdCI6MTYzMTI5NTc2MywiZXhwIjoxNjkxMjk1NzYzfQ.Ramqp4NLgYF_XBVWdcre6Fm-spFLCNqO2ualeQzxBVw"
        }
      })
      .then(res => {
        if (res.data.success) {
          this.setState({
            executives: res.data.existingexecutives
          });
          console.log(this.state.executives);
        }
      });
  }

  onDelete = id => {
    axios.delete(`http://localhost:5000/executives/delete/${id}`).then(res => {
      alert("Deleted Successfully");
      this.retrieveexecutives();
    });
  };

  // filterData(executives, searchKey) {
  //  const result = executives.filter(
  //      (executives) =>
  //        executives.username.toLowerCase().includes(searchKey) ||
  //        executives.email.toLowerCase().includes(searchKey)
  //    );
  //    this.setState({ executives: result });
  // }

  handleSearchArea = e => {
    const searchKey = e.currentTarget.value;

    axios.get("http://localhost:5000/executives").then(res => {
      if (res.data.success) {
        this.filterData(res.data.existingexecutives, searchKey);
      }
    });
  };

  render() {
    return (
      <div className="container grad">
        <div class="adminreview">
          <div className="row">
            <div className="exploreText">
              User Executive Management Dashboard
            </div>
            <hr />
            <div className="col-lg-9 mt-2 mb-2">
              <Clock />
              <br />
              <button className="btn btn-primary btn-lg">
                <a
                  href="/admin"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  Back to Main Dashboard
                </a>
              </button>
            </div>
            <div className="col-lg-3 mt-2 mb-2">
              <button type="button" class="btn btn-outline-info">
                <a
                  href="/displaymyprofile"
                  style={{ textDecoration: "none", color: "#276678" }}
                >
                  My Personal Profile
                </a>
              </button>
              <br />
              <br />
            </div>
          </div>
          <div className="row">
            <div className="col-lg-9 mt-2 mb-2">
              <h1 className="h3 mb-3 font-weight-normal">All Executives</h1>
            </div>
          </div>
          <table className="table table-hover" style={{ marginTop: "30px" }}>
            <thead>
              <tr class="bg-info">
                <th scope="col"></th>
                <th scope="col">Executive Id</th>
                <th scope="col">Executive Name</th>
                <th scope="col">Email</th>

                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {this.state.executives.map((executives, index) => (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>
                    <a
                      href={`/displayexecutive/${executives._id}`}
                      style={{ textDecoration: "none" }}
                    >
                      {executives.exeno}
                    </a>
                  </td>
                  <td>{executives.username}</td>
                  <td>{executives.email}</td>

                  <td>
                    <a
                      className="btn btn-warning"
                      href={`/editexecutive/${executives._id}`}
                    >
                      <i className="fas fa-edit"></i>&nbsp;Edit
                    </a>
                    &nbsp;
                    <a
                      className="btn btn-danger"
                      href="#"
                      onClick={() => this.onDelete(executives._id)}
                    >
                      <i className="fas fa-trash-alt"></i>&nbsp;Delete
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}
