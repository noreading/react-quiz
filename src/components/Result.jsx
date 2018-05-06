import React from "react";
import { withRouter } from "react-router-dom";

class Result extends React.Component {
  restart = () => {
    this.props.resetQuiz();
    this.props.history.push("/");
  };

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

        <p>
          <button className="btn btn-secondary" onClick={this.restart}>
            <i className="fa fa-refresh" /> Restart the quiz
          </button>
        </p>
      </div>
    );
  }
}

export default withRouter(Result);
