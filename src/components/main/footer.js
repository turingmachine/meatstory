import React from 'react';

import {
  Segment,
  Header,
  Feed,
  Image,
} from 'semantic-ui-react';

const Footer = () => {
  return (<div>
    <div>
      <Segment basic className="about">
        <Header as="h2">Über uns</Header>
        <p>
          MeatStory ermöglicht Konsumenten die Herkunft von Fleischprodukten zu verfolgen.
          {' '}Die Rückverfolgbarkeit erleichtert ihnen informierte Entscheidungen zu treffen.
        </p>
        <Feed className="about">
          <Feed.Event image="/img/sam.png" content="Samuel Bühlmann schafft mehr Bewusstsein für dein Plätzli à la Minute." />
          <Feed.Event image="/img/simon.png" content="Simon Josi entwickelt Rückverfolgbarkeit von deinem Teller zur Wiese." />
          <Feed.Event image="/img/pascal.png" content="Pascal Geronimi zeichnet Daten für Lebensmittel-LiebhaberInnen auf." />
        </Feed>
      </Segment>
    </div>
    <div className="dark">
      <Segment basic className="partner">
        <Header as="h2">Partner</Header>
        <div className="is-flex">
          <a href="https://opendata.ch/" target="_blank" rel="noopener noreferrer"><img src="/img/OpenData.ch@2x.png" alt="open data" /></a>
          <a href="https://food.opendata.ch/" target="_blank" rel="noopener noreferrer"><img src="/img/OpenFoodlogo@2x.png" alt="open food" /></a>
          <a href="https://www.identitas.ch/" target="_blank" rel="noopener noreferrer"><Image src="/img/id.png" alt="identitas" /></a>
          <a href="https://www.hafl.bfh.ch/home.html" target="_blank" rel="noopener noreferrer"><Image src="/img/BFH1.png" alt="BFH-HAFL" /></a>
        </div>
        <Header as="h2" style={{ marginTop: 0 }}>Medien</Header>
        <div className="is-flex">
          <a href="http://www.20min.ch/schweiz/bern/story/28948666" target="_blank" rel="noopener noreferrer"><Image src="/img/20min@2x.png" alt="20min" /></a>
          <a href="https://desktop.12app.ch/articles/30000183" target="_blank" rel="noopener noreferrer"><Image src="/img/SonntagsZeitung@2x.png" alt="SonntagsZeitung" /></a>
        </div>
      </Segment>
    </div>
    <div>
      <Segment basic inverted>
        <Header as="h2">Kontakt</Header>
        <a href="mailto:hello@meatstory.ch" target="_top">hello@meatstory.ch</a>
      </Segment>
    </div>
  </div>);
};

export default Footer;
