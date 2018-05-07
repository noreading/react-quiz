import React from "react";

class StatusBar extends React.Component {
  render() {
    return (
      <div className="question-header">
        <div className="row">
          <div className="col col-lg-6">
            Question {this.props.count} / {this.props.total}
          </div>
          <div className="col col-lg-6 text-right">
            Score: &nbsp; {this.props.score}
          </div>
        </div>
      </div>
    );
  }
}

export default StatusBar;
