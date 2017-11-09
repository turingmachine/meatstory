import React from 'react';
import {
  Route,
} from 'react-router-dom';
import { withRouter } from 'react-router';
import Helmet from 'react-helmet';
import {
  Container,
} from 'semantic-ui-react';
import ReactGA from 'react-ga';

import Head from './head';
import Landing from './landing';
import Story from './story';
import Footer from './footer';

class Main extends React.PureComponent {
  componentDidMount = () => {
    if (process.env.NODE_ENV === 'production') {
      ReactGA.initialize('UA-109529087-1');
      ReactGA.pageview(window.location.pathname + window.location.search);
      this.props.history.listen(() => {
        ReactGA.pageview(window.location.pathname + window.location.search);
      });
    }
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>meatstory - Die Geschichte deines Steaks</title>
          <link rel="stylesheet" href="/semantic.min.css" />
          <link rel="stylesheet" href="/styles.global.css" />
        </Helmet>
        <Container>
          <Head />
          <Route exact path="/" component={Landing} />
          <Route exact path="/story/:id" component={Story} />
          <Footer />
        </Container>
      </div>
    );
  }
}

export default withRouter(Main);
