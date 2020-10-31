import React, { Fragment } from "react";
import jsPDF from "jspdf";
import { Line } from "react-chartjs-2";
import "jspdf-autotable";

class Result extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showChart: false,
    };
  }
  // chart = () => {
  //   this.setState(() => ({ showChart: true }));
  // };
  exportPDF = () => {
    console.log("call");
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 40;
    const doc = new jsPDF(orientation, unit, size);

    doc.setFontSize(15);
    const {
      pName,
      pDescription,
      Client,
      Contractor,
      isCSV,
      max_X,
      min_X,
      max_Y,
      min_Y,
      max_Z,
      min_Z,
    } = this.props.data;
    const title = "Sample Project :: ABC Engine";
    let content = {
      startY: 50,
      head: [["Input", "Value"]],
      body: [
        ["Project Name", pName],
        ["Project Description", pDescription],
        ["Client", Client],
        ["Contractor", Contractor],
        ["CSV File", isCSV ? "Yes" : "No"],
        ["max_X", max_X],
        ["min_X", min_X],
        ["max_Y", max_Y],
        ["min_Y", min_Y],
        ["max_Z", max_Z],
        ["min_Z", min_Z],
      ],
    };

    doc.text(title, marginLeft, 40);
    doc.autoTable(content);
    doc.save("report.pdf");
  };
  chart = () => {
    this.setState(() => ({ showChart: true }));
  };
  render() {
    const {
      pName,
      pDescription,
      Client,
      Contractor,
      isCSV,
      max_X,
      min_X,
      max_Y,
      min_Y,
      max_Z,
      min_Z,
      x_axis,
      y_axis,
    } = this.props.data;
    const chartVal = {
      labels: x_axis,
      datasets: [
        {
          label: "Chart",
          fill: false,
          lineTension: 0.5,
          backgroundColor: "rgba(75,192,192,1)",
          borderColor: "rgba(0,0,0,1)",
          borderWidth: 1,
          data: y_axis,
        },
      ],
    };
    return (
      <Fragment>
        {this.state.showChart ? (
          <Fragment>
            <Line
              data={chartVal}
              options={{
                title: {
                  display: true,
                  text: "",
                  fontSize: 20,
                },
                legend: {
                  display: true,
                  position: "right",
                },
              }}
            />
          </Fragment>
        ) : (
          <Fragment>
            <h2>Result :</h2>
            <table>
              <thead>
                <tr id="t01">
                  <th>Input</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr id="t02">
                  <td>Project Name</td>
                  <td>{pName}</td>
                </tr>

                <tr id="t03">
                  <td>Project Description</td>
                  <td>{pDescription}</td>
                </tr>
                <tr id="t04">
                  <td>Client</td>
                  <td>{Client}</td>
                </tr>
                <tr id="t05">
                  <td>Contractor</td>
                  <td>{Contractor}</td>
                </tr>
                <tr id="t06">
                  <td>CSV File</td>
                  <td>{isCSV ? "Yes" : "No"}</td>
                </tr>
                <tr id="t07">
                  <td>max_X</td>
                  <td>{max_X}</td>
                </tr>
                <tr id="t07">
                  <td>min_X</td>
                  <td>{min_X}</td>
                </tr>
                <tr id="t08">
                  <td>max_Y</td>
                  <td>{max_Y}</td>
                </tr>
                <tr id="t09">
                  <td>min_Y</td>
                  <td>{min_Y}</td>
                </tr>
                <tr id="t10">
                  <td>max_Z</td>
                  <td>{max_Z}</td>
                </tr>
                <tr id="t11">
                  <td>min_Z</td>
                  <td>{min_Z}</td>
                </tr>
              </tbody>
            </table>
            <div style={{ overflow: "auto" }}>
              <div style={{ float: "right" }}>
                <button
                  type="button"
                  id="nextBtn"
                  onClick={() => this.exportPDF()}
                >
                  Download PDF
                </button>
                <button
                  type="button"
                  id="chartBtn"
                  onClick={() => this.chart()}
                >
                  Show KP vs X Chart
                </button>
              </div>
            </div>
          </Fragment>
        )}
      </Fragment>
    );
  }
}

export default Result;
