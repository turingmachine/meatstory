import React from 'react'
import { Router, Link } from '../routes'
import pageview from '../analytics'

class Index extends React.Component {
  constructor(props) {
    super(props)
    this.state = { id: '' }
  }
  componentDidMount () {
    pageview()
  }
  handleSubmit = event => {
    event.preventDefault()
    Router.pushRoute('story', {id: this.state.id})
  }
  render() {
    return (
      <div className="hero-section">
        <div className="container w-container">
          <h1 className="hero-title">Erfahre die Geschichte deines Rindfleisch</h1>
          <div className="w-row">
            <div className="column-1 w-col w-col-6">
              <img src="/static/images/low-poly-cow2x.jpg" width="423" srcSet="/static/images/low-poly-cow2x-p-800.jpeg 800w, /static/images/low-poly-cow2x.jpg 846w" sizes="(max-width: 479px) 92vw, (max-width: 767px) 423px, (max-width: 991px) 354px, 423px" className="hero-image" />
            </div>
            <div className="column-2 w-col w-col-6">
              <div className="hero-instructions">
                Gib die MeatStory ID ein, welche sich auf der Verpackung befindet, z.B.
                {' '}<Link route='/story/1166.0014.6'><a style={{color: 'black'}}>1166.0014.6</a></Link>
              </div>
              <div className="w-form">
                <form id="wf-form-meatstory-id-form" name="wf-form-meatstory-id-form" data-name="meatstory-id-form" className="form" onSubmit={this.handleSubmit}>
                  <input type="text" className="textfield w-input" name="meatstory-id" data-name="meatstory-id" placeholder="MeatStory ID" id="meatstory-id" value={this.state.id} onChange={(event) => this.setState({id: event.target.value})} />
                  <input type="submit" value="Los geht&#x27;s" data-wait="Please wait..." className="button w-button" />
                </form>
                <div className="w-form-done">
                  <div>Thank you! Your submission has been received!</div>
                </div>
                <div className="w-form-fail">
                  <div>Oops! Something went wrong while submitting the form.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Index
