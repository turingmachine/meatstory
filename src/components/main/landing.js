import React from 'react';
import { Link } from 'react-router-dom';
import {
  Segment,
  Header,
  Feed,
  Input,
  Button,
} from 'semantic-ui-react';

class Landing extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      eartagnumber: '',
    };
  }
  render() {
    return (
      <div>
        <Segment basic>
          <Header as="h2">So funktionierts</Header>
          <Feed>
            <Feed.Event>
              <Feed.Label>
                <Header as="h2">1.</Header>
              </Feed.Label>
              <Feed.Content>
                Scanne den QR-Code auf deinem Produkt oder gib
                {' '}die MeatStory-ID manuell ein, z.B.
                {' '}<Link to="/story/120.1166.0014.6">120.1166.0014.6</Link>
              </Feed.Content>
            </Feed.Event>
            <Feed.Event>
              <Feed.Label>
                <Header as="h2">2.</Header>
              </Feed.Label>
              <Feed.Content>
                Lerne die Geschichte deines Produkts kennen.
              </Feed.Content>
            </Feed.Event>
          </Feed>
        </Segment>
        <div className="fair">
          <Segment basic>
            <Header as="h2">Finde deine MeatStory!</Header>
            <p>Gib hier die MeatStory-ID deines Produkts ein</p>
            <Input
              action
              onChange={event => this.setState({ eartagnumber: event.target.value })}
              placeholder="z.B. 120 1166 0014 6">
              <input />
              <Button onClick={() => this.props.history.push(`/story/${this.state.eartagnumber}`)}>Los</Button>
            </Input>
          </Segment>
        </div>
      </div>
    );
  }
}

export default Landing;
