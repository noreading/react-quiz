import React, { Fragment } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Home from "./Home";
import StatusBar from "./StatusBar";
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
    const keys = Object.keys(this.state.questions);
    const currentIndex = keys.indexOf(currentId);
    const nextIndex = currentIndex + 1;
    const nextId = keys[nextIndex];

    return this.state.questions[nextId];
  };

  getFirstQuestion = () => {
    const questionId = Object.keys(this.state.questions)[0];
    return this.state.questions[questionId];
  };

  getLastQuestion = () => {
    const keys = Object.keys(this.state.questions);
    const lastKey = keys[keys.length - 1];

    return this.state.questions[lastKey];
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
              render={() => <Home getFirstQuestion={this.getFirstQuestion} />}
            />
            <Route
              path="/q/:id"
              render={request => {
                const questionId = request.match.params.id;
                return (
                  <Fragment>
                    <StatusBar
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
