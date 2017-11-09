import React from 'react';
import { Link } from 'react-router-dom';
import {
  Header,
  Segment,
  Image,
} from 'semantic-ui-react';

const Head = () => {
  return (<div>
    <Segment basic>
      <Link to="/">
        <Image src="/img/logo-meatstory@2x.png" size="medium" alt="logo meatstory" />
        <Header size="medium" style={{ margin: 0, marginLeft: '0px' }}>Die Geschichte deines Steaks</Header>
      </Link>
    </Segment>
  </div>);
};

export default Head;
