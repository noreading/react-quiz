import React, { Fragment } from "react";

class Answer extends React.Component {
  toggleChecked = () => {
    this.props.toggleChecked(this.props.index);
  };

  render() {
    const id = `${this.props.question.uuid}-${this.props.index}`;
    const isValid = this.props.question.solutions.includes(this.props.index);

    let validationClass = "";

    if (this.props.disabled) {
      if (isValid) {
        validationClass = "correct";
      } else if (this.props.success === false) {
        validationClass = "wrong";
      }
    }

    return (
      <div className="answer">
        <div className={`custom-control custom-checkbox ${validationClass}`}>
          <input
            className="custom-control-input"
            type="checkbox"
            value={id}
            id={id}
            disabled={this.props.disabled}
            onChange={this.toggleChecked}
            checked={this.props.checked}
          />
          <label className="custom-control-label" htmlFor={id}>
            {this.props.question.language && !this.props.question.code ? (
              <pre
                className={
                  this.props.question.hasOwnProperty("language")
                    ? `language-${this.props.question.language}`
                    : ""
                }
              >
                <code>{this.props.text}</code>
              </pre>
            ) : (
              <Fragment>{this.props.text}</Fragment>
            )}
          </label>
        </div>
      </div>
    );
  }
}

export default Answer;
