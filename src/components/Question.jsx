import React from "react";
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
      last: false
    };
  }

  componentDidMount() {
    Prism.highlightAll();
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const lastQuestion = nextProps.getLastQuestion();
    prevState.last = lastQuestion.uuid === nextProps.question.uuid;

    return prevState;
  }

  toggleChecked = index => {
    index = parseInt(index, 10);

    this.setState(state => {
      if (state.checked.indexOf(index) !== -1) {
        state.checked.splice(index, 1);
      } else {
        state.checked.push(parseInt(index, 10));
      }

      return state;
    });
  };

  submit = event => {
    event.preventDefault();

    const solutions = this.props.question.solutions;
    solutions.sort();

    const checked = [...this.state.checked].sort();

    if (solutions.length !== checked.length) {
      this.props.updateScore(false);

      return this.setState(state => {
        state.submitted = true;
        state.success = false;
        return state;
      });
    }

    for (let i = 0; i < checked.length; i++) {
      if (!solutions.includes(checked[i])) {
        this.props.updateScore(false);

        return this.setState(state => {
          state.submitted = true;
          state.success = false;
          return state;
        });
      }
    }

    this.props.updateScore(true);

    return this.setState(state => {
      state.submitted = true;
      state.success = true;
      return state;
    });
  };

  nextQuestion = event => {
    event.preventDefault();
    const next = this.props.getNextQuestion(this.props.id);

    this.setState(state => {
      state.submitted = false;
      state.disabled = false;
      state.success = false;
      state.checked = [];

      return state;
    });

    this.props.history.push(`/q/${next.uuid}`);
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

        {this.state.submitted &&
          this.state.success && (
            <div className="alert alert-success">
              <strong>Great!</strong> Your answer is correct!
            </div>
          )}

        {this.state.submitted &&
          !this.state.success && (
            <div className="alert alert-danger">
              <strong>Sorry!</strong> You didn't choose the right answers!
            </div>
          )}

        <h2>{question.question}</h2>

        {question.hasOwnProperty("code") && (
          <pre
            className={
              question.hasOwnProperty("language")
                ? `language-${question.language}`
                : ""
            }
          >
            <code>{question.code}</code>
          </pre>
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
                checked={this.state.checked.indexOf(index) !== -1}
                disabled={this.state.submitted}
                toggleChecked={this.toggleChecked}
              />
            );
          })}
        </div>

        {this.state.submitted === false && (
          <button className="btn btn-primary" onClick={this.submit}>
            Submit&nbsp; <i className="fa fa-arrow-right" />
          </button>
        )}

        {this.state.submitted === true &&
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
