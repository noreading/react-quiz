import React from "react";

class Result extends React.Component {
  render() {
    return (
      <div className="result">
        <h2>Your final results!</h2>

        <div className="alert alert-info">
          You answered{" "}
          <strong>{this.props.result.correct + this.props.result.wrong}</strong>{" "}
          questions in total.
        </div>
        <div className="alert alert-success">
          You had <strong>{this.props.result.correct}</strong> correct answers.
        </div>
        <div className="alert alert-danger">
          You had <strong>{this.props.result.wrong}</strong> wrong answers.
        </div>
      </div>
    );
  }
}

export default Result;
