import React, { Fragment } from "react";
import Result from "./Result";
const Papaparse = require("papaparse");
class MultiStepForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 1,
      pName: "",
      pDescription: "",
      Client: "",
      Contractor: "",
      //file:"",
      isCSV: false,
      max_X: "",
      min_X: "",
      max_Y: "",
      min_Y: "",
      max_Z: "",
      min_Z: "",
      resultPage: false,
      x_axis: [],
      y_axis: [],
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.UpdateCSV = this.UpdateCSV.bind(this);
  }
  nextPrev(step) {
    if (
      step == 2 &&
      (this.state.pName != "" ||
        this.state.pDescription != "" ||
        this.state.Client != "" ||
        this.state.Contractor != "")
    ) {
      this.setState(() => ({ step: step }));
    } else {
      this.setState(() => ({ step: 1 }));
    }
  }
  resultPage() {
    if (
      this.state.step == 2 &&
      (this.state.max_X != "" ||
        this.state.min_X != "" ||
        this.state.max_Y != "" ||
        this.state.min_Y != "" ||
        this.state.max_Z != "" ||
        this.state.min_Z != "")
    ) {
      this.setState(() => ({ resultPage: true }));
    } else {
      this.setState(() => ({ step: 2 }));
    }
    this.setState(() => ({}));
  }
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }
  onFileChange(e) {
    let file = e.target.files[0];
    let fileType = file.type.toLowerCase();
    if (fileType == "application/vnd.ms-excel") {
      Papaparse.parse(file, {
        header: true,
        delimiter: ",",
        skipEmptyLines: true,
        complete: this.UpdateCSV,
      });
    } else {
      this.setState(() => ({
        isCSV: false,
      }));
    }
    // console.log("result", result)

    // this.setState(() => ({
    //     max_X: result.max_X,
    //     min_X: result.min_X,
    //     max_Y: result.max_Y,
    //     min_Y: result.min_Y,
    //     max_Z: result.max_Z,
    //     min_Z: result.min_Z,
    // }));
  }
  async UpdateCSV(results) {
    //console.log("Parsing complete:", results.data);
    var all_data = results.data;
    // var X = await Promise.all( all_data.map(async function(element) {
    //     if(element.X != undefined){
    //         return parseFloat(element.X)
    //     }
    // }))
    //var max_X = Math.max(...X)
    var KP = await Promise.all(
      all_data.map(async function (element) {
        if (element.KP != undefined) {
          return parseFloat(element.KP);
        }
      })
    );
    var X = await Promise.all(
      all_data.map(async function (element) {
        if (element.X != undefined) {
          return parseFloat(element.X);
        }
      })
    );

    var Y = await Promise.all(
      all_data.map(async function (element) {
        if (element.Y != undefined) {
          return parseFloat(element.Y);
        }
      })
    );
    var Z = await Promise.all(
      all_data.map(async function (element) {
        if (element.Z != undefined) {
          return parseFloat(element.Z);
        }
      })
    );
    var max_X = Math.max.apply(Math, X);
    var min_X = Math.min.apply(Math, X);

    var max_Y = Math.max.apply(Math, Y);
    var min_Y = Math.min.apply(Math, Y);

    var max_Z = Math.max.apply(Math, Z);
    var min_Z = Math.min.apply(Math, Z);
    //console.log("all_data", X)
    console.log("max_X", max_X);
    console.log("min_X", min_X);
    console.log("max_Y", max_Y);
    console.log("min_Y", min_Y);
    console.log("max_Z", max_Z);
    console.log("min_Z", min_Z);
    this.setState(() => ({
      max_X: max_X,
      min_X: min_X,
      max_Y: max_Y,
      min_Y: min_Y,
      max_Z: max_Z,
      min_Z: min_Z,
      isCSV: true,
      x_axis: KP,
      y_axis: X,
    }));
    // all_data.forEach(element => {
    //     console.log("element", element)
    // });
  }
  render() {
    const { step, resultPage } = this.state;
    return (
      <Fragment>
        <form id="regForm" action="/action_page.php">
          <h1>Sample Project :: ABC Engine</h1>
          {resultPage ? (
            <Fragment>
              <Result data={this.state} />
            </Fragment>
          ) : (
            <Fragment>
              {step == 1 ? (
                <div className="tab">
                  <h2>Step 1:</h2>
                  <p>
                    <input
                      placeholder="Project Name"
                      value={this.state.pName}
                      onChange={this.handleInputChange}
                      name="pName"
                    />
                  </p>
                  <p>
                    <input
                      placeholder="Project Description"
                      value={this.state.pDescription}
                      onChange={this.handleInputChange}
                      name="pDescription"
                    />
                  </p>
                  <p>
                    <input
                      placeholder="Client"
                      value={this.state.Client}
                      onChange={this.handleInputChange}
                      name="Client"
                    />
                  </p>
                  <p>
                    <input
                      placeholder="Contractor"
                      value={this.state.Contractor}
                      onChange={this.handleInputChange}
                      name="Contractor"
                    />
                  </p>
                </div>
              ) : (
                <div className="tab">
                  <h2>Step 2:</h2>
                  <p>
                    {/* <input
                        placeholder="Project Name"
                        value={this.state.pName}
                        onChange={this.handleInputChange}
                        name="pName"
                    /> */}
                    Project Name: {this.state.pName}
                  </p>
                  <p>
                    {/* <input
                        placeholder="Project Description"
                        value={this.state.pDescription}
                        onChange={this.handleInputChange}
                        name="pDescription"
                    /> */}
                    Project Description: {this.state.pDescription}
                  </p>
                  <p>
                    {/* <input
                        placeholder="Client"
                        value={this.state.Client}
                        onChange={this.handleInputChange}
                        name="Client"
                    /> */}
                    Client: {this.state.Client}
                  </p>
                  <p>
                    {/* <input
                        placeholder="Contractor"
                        value={this.state.Contractor}
                        onChange={this.handleInputChange}
                        name="Contractor"
                    /> */}
                    Contractor: {this.state.Contractor}
                  </p>
                  <p>
                    <input
                      placeholder="File Upload"
                      //value={this.state.file}
                      //onChange={this.handleInputChange}
                      type="file"
                      name="file"
                      onChange={this.onFileChange}
                    />
                  </p>
                  <p>
                    <input
                      placeholder="max_X"
                      value={this.state.max_X}
                      onChange={this.handleInputChange}
                      name="max_X"
                    />
                  </p>
                  <p>
                    <input
                      placeholder="min_X"
                      value={this.state.min_X}
                      onChange={this.handleInputChange}
                      name="min_X"
                    />
                  </p>
                  <p>
                    <input
                      placeholder="max_Y"
                      value={this.state.max_Y}
                      onChange={this.handleInputChange}
                      name="max_Y"
                    />
                  </p>
                  <p>
                    <input
                      placeholder="min_Y"
                      value={this.state.min_Y}
                      onChange={this.handleInputChange}
                      name="min_Y"
                    />
                  </p>
                  <p>
                    <input
                      placeholder="max_Z"
                      value={this.state.max_Z}
                      onChange={this.handleInputChange}
                      name="max_Z"
                    />
                  </p>
                  <p>
                    <input
                      placeholder="min_Z"
                      value={this.state.min_Z}
                      onChange={this.handleInputChange}
                      name="min_Z"
                    />
                  </p>
                </div>
              )}
              <div style={{ overflow: "auto" }}>
                <div style={{ float: "right" }}>
                  {step == 2 && (
                    <button
                      type="button"
                      id="prevBtn"
                      onClick={() => this.nextPrev(1)}
                    >
                      Previous
                    </button>
                  )}
                  {step == 1 ? (
                    <button
                      type="button"
                      id="nextBtn"
                      onClick={() => this.nextPrev(2)}
                    >
                      Next
                    </button>
                  ) : (
                    <button
                      type="button"
                      id="nextBtn"
                      onClick={() => this.resultPage()}
                    >
                      Submit
                    </button>
                  )}
                </div>
              </div>
              {/* Circles which indicates the steps of the form: */}
              <div style={{ textAlign: "center", marginTop: "40px" }}>
                <span className={step == 1 ? "step finish active" : "step"} />
                <span className={step == 2 ? "step finish active" : "step"} />
              </div>
            </Fragment>
          )}
        </form>
      </Fragment>
    );
  }
}

export default MultiStepForm;
