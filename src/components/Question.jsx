import React, { Fragment } from "react";
import { withRouter, Link } from "react-router-dom";
import Answer from "./Answer";
import Prism from "prismjs";

class Question extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      checked: [],
      submitted: false,
      success: false,
      missingChoice: false,
      last: false
    };
  }

  componentDidMount() {
    this.codeHighlight();
  }

  componentDidUpdate() {
    this.codeHighlight();
  }

  codeHighlight = () => {
    /* only redo highlighting on initial load of the component and when the props
       change for a new question to be displayed */
    if (
      this.props.question.hasOwnProperty("code") &&
      this.state.checked.length === 0 &&
      this.state.submitted === false
    ) {
      Prism.highlightAll();
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const lastQuestion = nextProps.getLastQuestion();
    prevState.last = lastQuestion.uuid === nextProps.question.uuid;

    return prevState;
  }

  toggleChecked = index => {
    index = parseInt(index, 10);

    this.setState(state => {
      const stateIndex = state.checked.indexOf(index);

      if (stateIndex !== -1) {
        state.checked.splice(stateIndex, 1);
      } else {
        state.checked.push(parseInt(index, 10));
      }

      return state;
    });
  };

  submit = event => {
    event.preventDefault();

    if (this.state.checked.length === 0) {
      return this.setState({ missingChoice: true });
    }

    this.setState({ submitted: true });
    this.props.saveChoices(this.props.id, this.state.checked);

    const solutions = this.props.question.solutions.sort();
    const checked = [...this.state.checked].sort();

    if (solutions.length !== checked.length) {
      this.props.updateScore(false);
      return this.setState({ success: false });
    }

    for (let i = 0; i < checked.length; i++) {
      if (!solutions.includes(checked[i])) {
        this.props.updateScore(false);
        return this.setState({ success: false });
      }
    }

    this.props.updateScore(true);

    return this.setState({ success: true });
  };

  nextQuestion = event => {
    event.preventDefault();
    const next = this.props.getNextQuestion(this.props.id);

    this.resetState();
    this.props.history.push(`/q/${next.uuid}`);
  };

  resetState = () => {
    this.setState(state => {
      state.submitted = false;
      state.disabled = false;
      state.success = false;
      state.missingChoice = false;
      state.checked = [];

      return state;
    });
  };

  render() {
    const question = this.props.question;

    return (
      <div className="question">
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

        {this.state.missingChoice && (
          <div className="alert alert-info">
            <strong>Hey!</strong> Didn't you forget something? Please select at
            least one answer.
          </div>
        )}

        {this.state.submitted && (
          <Fragment>
            {this.state.success && (
              <div className="alert alert-success">
                <strong>Great:</strong> That's exactly what we've asked for!
              </div>
            )}

            {this.state.submitted && (
              <div className="alert alert-danger">
                <strong>Sorry:</strong> You should try again later!
              </div>
            )}
          </Fragment>
        )}

        <h2>{question.question}</h2>

        {question.hasOwnProperty("code") && (
          <Fragment>
            <pre
              className={
                question.hasOwnProperty("language")
                  ? `language-${question.language}`
                  : ""
              }
            >
              <code>{question.code}</code>
            </pre>

            <h2>Answers</h2>
          </Fragment>
        )}

        <div className="answers">
          {Object.keys(question.answers).map(index => {
            index = parseInt(index, 10);

            return (
              <Answer
                question={question}
                index={index}
                text={question.answers[index].text}
                key={index}
                checked={
                  this.state.checked.includes(index) ||
                  this.props.choices.includes(index)
                }
                disabled={
                  this.state.submitted === true ||
                  this.props.choices.length !== 0
                }
                toggleChecked={this.toggleChecked}
              />
            );
          })}
        </div>

        {this.state.submitted === false &&
          this.props.choices.length === 0 && (
            <button className="btn btn-primary" onClick={this.submit}>
              Submit&nbsp; <i className="fa fa-arrow-right" />
            </button>
          )}

        {(this.state.submitted === true || this.props.choices.length !== 0) &&
          this.state.last === false && (
            <button className="btn btn-primary" onClick={this.nextQuestion}>
              Next question&nbsp; <i className="fa fa-arrow-right" />
            </button>
          )}

        {this.state.submitted === true &&
          this.state.last === true && (
            <Link to="/result" className="btn btn-primary">
              Final Result&nbsp; <i className="fa fa-arrow-right" />
            </Link>
          )}
      </div>
    );
  }
}

export default withRouter(Question);
