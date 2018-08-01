import React from 'react';
import Document, { Head, Main, NextScript } from 'next/document';

class MeatStory extends Document {
  render() {
    return (
      <html lang="de">
        <Head>
          <title>MeatStory</title>
          <meta content="width=device-width, initial-scale=1" name="viewport" />
          <meta content="Webflow" name="generator" />
          <link href="/static/css/normalize.css" rel="stylesheet" type="text/css" />
          <link href="/static/css/webflow.css" rel="stylesheet" type="text/css" />
          <link href="/static/css/meatstory-02.webflow.css" rel="stylesheet" type="text/css" />
          <link href="/static/images/Favicon.png" rel="shortcut icon" type="image/x-icon" />
          <link href="/static/images/Webclip.png" rel="apple-touch-icon" />
        </Head>
        <body>
          <div className="header-section">
            <div className="container w-container"><img src="/static/images/meatstory-logo.svg" className="logo" /></div>
          </div>
          <Main />
          <div className="featuring-section">
            <div className="container w-container">
              <h2 className="title-2">Gesehen auf</h2>
              <div className="logo-block">
                <img src="/static/images/20min-Logo2x.png" width="69" className="feature-logo" />
                <img src="/static/images/SonntagsZeitung2x.png" width="71" className="feature-logo" />
                <img src="/static/images/Radio-SRF12x.png" width="59" className="feature-logo" />
                <img src="/static/images/Neo1-Logo2x.png" width="71" className="feature-logo" />
                <img src="/static/images/St-Galler-Tagblatt2x.png" width="136" className="feature-logo" />
                <img src="/static/images/bz2x.png" width="72" className="feature-logo" />
                <img src="/static/images/Schweizer-Bauer2x.png" width="206" className="feature-logo" />
              </div>
              <h2 className="title-2">Mit der Unterstützung von</h2>
              <div className="logo-block">
                <img src="/static/images/OpenData.ch-Logo2x.png" width="152" className="feature-logo" />
                <img src="/static/images/OpenFoodlogo2x.png" width="153" className="feature-logo" />
                <img src="/static/images/Identitas-Logo2x.png" width="72" className="feature-logo" />
                <img src="/static/images/Logo_BLW2x.png" width="131" className="feature-logo" />
              </div>
            </div>
          </div>
          <div className="footer-section">
            <div className="container w-container">
              <div className="w-row">
                <div className="column-1 w-col w-col-8">
                  <h2 className="title-2 white">Über uns</h2>
                  <p className="footer-text">MeatStory ermöglicht Konsumenten die Herkunft von Fleischprodukten zu verfolgen.</p>
                  <p className="footer-text">Die Rückverfolgbarkeit erleichtert ihnen informierte Entscheidungen zu treffen.</p>
                </div>
                <div className="column-2 w-col w-col-4">
                  <h2 className="title-2 white">Kontakt</h2><a href="mailto:hallo@meatstory.ch?subject=Hallo" className="link">hallo@meatstory.ch</a></div>
              </div>
            </div>
          </div>
          <NextScript />
        </body>
      </html>
    );
  }
}

export default MeatStory;
