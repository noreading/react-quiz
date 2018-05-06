import React from "react";

class Answer extends React.Component {
  toggleChecked = () => {
    this.props.toggleChecked(this.props.index);
  };

  render() {
    const id = `${this.props.question.uuid}-${this.props.index}`;
    const isValid = this.props.question.solutions.includes(this.props.index);

    let validationClass = "";

    if (this.props.disabled) {
      if (isValid === false) {
        validationClass = "wrong";
      } else {
        validationClass = "correct";
      }
    }

    return (
      <div className="answer">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            value={id}
            id={id}
            disabled={this.props.disabled}
            onChange={this.toggleChecked}
            checked={this.props.checked}
          />
          <label className={`form-check-label ${validationClass}`} htmlFor={id}>
            {this.props.text}
          </label>
        </div>
      </div>
    );
  }
}

export default Answer;
