import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import QuestionHeader from "./QuestionHeader";
import Question from "./Question";
import Error404 from "./Error404";
import Result from "./Result";

import questions from "../data/questions";

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      questions,
      choices: {},
      score: {
        correct: 0,
        wrong: 0,
        total: 0
      }
    };
  }

  getNextQuestion = currentId => {
    const currentIndex = Object.keys(this.state.questions).indexOf(currentId);
    const nextIndex = currentIndex + 1;
    const nextId = Object.keys(this.state.questions)[nextIndex];

    return this.state.questions[nextId];
  };

  getLastQuestion = () => {
    const keys = Object.keys(this.state.questions);
    return this.state.questions[keys[keys.length - 1]];
  };

  updateScore = success => {
    this.setState(state => {
      if (success) {
        state.score.correct++;
        state.score.total++;
      } else {
        state.score.wrong++;
      }

      return state;
    });
  };

  saveChoices = (questionId, choices) => {
    this.setState(state => {
      state.choices[questionId] = choices;
    });
  };

  resetQuiz = () => {
    this.setState(state => {
      state.choices = {};
      state.score = {
        correct: 0,
        wrong: 0,
        total: 0
      };
    });
  };

  render() {
    return (
      <div className="app container">
        <header className="header">
          <h1>
            <a href="/">My little Quiz</a>
          </h1>
          <div className="text-muted">Check your knowledge!</div>
        </header>
        <BrowserRouter>
          <Switch>
            <Route
              exact
              path="/"
              render={() => <Home questions={this.state.questions} />}
            />
            <Route
              path="/q/:id"
              render={request => {
                const questionId = request.match.params.id;
                return (
                  <Fragment>
                    <QuestionHeader
                      count={
                        Object.keys(this.state.questions).indexOf(questionId) +
                        1
                      }
                      total={Object.keys(this.state.questions).length}
                      score={this.state.score.total}
                    />
                    <Question
                      id={questionId}
                      question={this.state.questions[questionId]}
                      choices={this.state.choices[questionId] || []}
                      getNextQuestion={this.getNextQuestion}
                      getLastQuestion={this.getLastQuestion}
                      updateScore={this.updateScore}
                      saveChoices={this.saveChoices}
                    />
                  </Fragment>
                );
              }}
            />
            <Route
              exact
              path="/result"
              render={() => (
                <Result result={this.state.score} resetQuiz={this.resetQuiz} />
              )}
            />
            <Route component={Error404} />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}

export default App;
