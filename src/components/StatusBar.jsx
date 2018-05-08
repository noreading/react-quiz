import React from "react";

function StatusBar(props) {
  return (
    <div className="question-header">
      <div className="row">
        <div className="col col-lg-6">
          Question {props.count} / {props.total}
        </div>
        <div className="col col-lg-6 text-right">
          Score: &nbsp; {props.score}
        </div>
      </div>
    </div>
  );
}

export default StatusBar;
