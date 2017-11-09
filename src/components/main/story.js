import React from 'react';
import { graphql } from 'react-apollo';
import moment from 'moment';
import _ from 'lodash';

import Cattle from 'src/graphql/queries/cattle.gql';
import races from 'src/tvd/races';

import {
  Segment,
  Header,
  Feed,
  Form,
  Radio,
  Button,
} from 'semantic-ui-react';

moment.locale('de');

@graphql(Cattle, {
  options: ({ match }) => ({
    variables: {
      id: match.params.id,
    },
  }),
})
export default class Story extends React.Component {
  state = {
    formRating: '',
    formText: '',
    formSubmitted: false,
  }

  sendFeedback = () => {
    const url = process.env.NODE_ENV === 'production'
      ? '/feedback'
      : 'http://localhost:8081/feedback';
    fetch(url, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      },
      method: "POST",
      body: JSON.stringify(this.state)
    })
    .then(result => result)
    .then(result => this.setState({ formSubmitted: true }));
  }

  render() {
    const { data } = this.props;
    const cattle = data.cattle && data.cattle;
    const isLoaded = !data.loading;
    const stays = data.cattle && _.slice(data.cattle.History, 1).map((stay, index) => {
      let delimiter = ', ';
      if (index === 0) {
        delimiter = ' ';
      }
      if (_.slice(data.cattle.History, 1).length === index + 1) {
        delimiter = ' und ';
      }
      return `${delimiter} ${stay.StayLocation}`;
    });

    return (
      <div>
        {isLoaded &&
          <Segment basic>
            <Header as="h2">Die Geschichte von {cattle.Name}</Header>
            <Feed>
              <Feed.Event>
                <Feed.Label>
                  <img src="/img/cow.svg" size="tiny" className="icons" alt="cow" />
                </Feed.Label>
                <Feed.Content>
                  {cattle.Name} ist ein {races[cattle.Race]} und ist am
                  {' '}{moment(cattle.BirthDate).format('LL')} zur Welt gekommen.
                </Feed.Content>
              </Feed.Event>
              <Feed.Event>
                <Feed.Label>
                  <img src="/img/tractor.svg" size="tiny" className="icons" alt="tractor" />
                </Feed.Label>
                <Feed.Content>
                  Nach der Geburt bei der Familie {cattle.History[0].StayFamily}
                  {' '}in {cattle.History[0].StayLocation}
                  {' '}ging die Reise nach {_.join(stays, '')}.
                  {' '}Dort überall verbrachte Sie viel Zeit mit ihren FreundInnen
                  {' '}wiederkäuend auf den Weiden
                </Feed.Content>
              </Feed.Event>
            </Feed>
          </Segment>
        }
        <div className="fair">
          {this.state.formSubmitted
          &&
            <Segment basic>
              <Header as="h2" textAlign="center">Vielen Dank!</Header>
            </Segment>
          ||
            <Segment basic>
              <Header as="h2">Teile uns deine Meinung mit!</Header>
              <Form onSubmit={this.sendFeedback}>
                <Form.Group grouped>
                  <Header as="h3">Wie findest du deine MeatStory?</Header>
                  <Form.Field>
                    <Radio
                      label="Interessant"
                      name="radioGroup"
                      value="interessant"
                      checked={this.state.formRating === 'interessant'}
                      onChange={(e, { value }) => this.setState({ formRating: value })}
                      />
                  </Form.Field>
                  <Form.Field>
                    <Radio
                      label="Durchschnittlich"
                      name="radioGroup"
                      value="durchschnittlich"
                      checked={this.state.formRating === 'durchschnittlich'}
                      onChange={(e, { value }) => this.setState({ formRating: value })}
                      />
                  </Form.Field>
                  <Form.Field>
                    <Radio
                      label="Uniteressant"
                      name="radioGroup"
                      value="uniteressant"
                      checked={this.state.formRating === 'uniteressant'}
                      onChange={(e, { value }) => this.setState({ formRating: value })}
                      />
                  </Form.Field>
                </Form.Group>
                <Form.Group grouped>
                  <Header as="h3">Welche Information findest du besonders interessant, was vermisst du?</Header>
                  <Form.Field
                    control="textarea"
                    rows="3"
                    value={this.state.formText}
                    onChange={event => this.setState({ formText: event.target.value })} />
                  <Button type="submit">Senden</Button>
                </Form.Group>
              </Form>
            </Segment>
          }
        </div>
      </div>
    );
  }
}
