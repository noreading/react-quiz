import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";

class Home extends React.Component {
  start = event => {
    event.preventDefault();
    this.props.history.push(`/q/${this.props.getFirstQuestion().uuid}`);
  };

  render() {
    return (
      <Fragment>
        <div>
          <p>
            This is a quiz about HTML, CSS and JavaScript, that can be used to
            repeat all the basics that are needed in everday's life of a web
            developer. Send questions or bugs to&nbsp;
            <a href="mailto:questions@dominik-hanke.de">
              questions@dominik-hanke.de
            </a>.
          </p>
          <p>Find out if you know all the details!</p>
        </div>
        <button className="btn btn-primary" onClick={this.start}>
          Let's have fun!&nbsp;
          <i className="fa fa-arrow-right" />
        </button>
      </Fragment>
    );
  }
}

export default withRouter(Home);
