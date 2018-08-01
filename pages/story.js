import React from 'react'
import 'isomorphic-fetch'
import _ from 'lodash'
import moment from 'moment'
moment.locale('de-ch')
import pageview from '../analytics'

class Story extends React.Component {
  static async getInitialProps({ req, query }) {
    const id = query.id.replace(/\s*/g, '')
    const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
    const host = req ? `${protocol}://${req.headers.host}` : window.location.origin;
    const url = `${host}/api/story/${_.startsWith(id, '120') ? '' : '120'}.${id}`
    const res = await fetch(url)
    const cattle = await res.json()
    return { cattle }
  }
  getHistory = history => {
    const intermediateStays = _.slice(history, 1, -1)
    return _.slice(intermediateStays, 0, -1).map(stayItem => {
      return stayItem.StayLocation
    }).join(', ') + ` und ${true ? 'zurück nach' : ''} ${_.last(intermediateStays).StayLocation}`
  }
  componentDidMount () {
    pageview()
  }
  render() {
    const { cattle } = this.props
    const history = this.getHistory(cattle.CattleHistory)
    return (
      <div className="story-section">
        <div className="container w-container">
          <h1 className="title-1">Die Geschichte von {cattle.Name}</h1>
          <div className="w-row">
            <div className="story-column w-col w-col-4">
              <div className="story-block">
                <h3 className="title-3">Herkunft</h3>
                <p className="story-text">
                  {cattle.Name} war eine schöne {cattle.Race} Kuh und ist am {moment(cattle.BirthDate).format('M. MMMM YYYY')} zur Welt gekommen.
                  Ihre Eltern waren {cattle.NameMother} und {cattle.NameFather}.
                </p>
              </div>
            </div>
            <div className="story-column w-col w-col-4">
              <div className="story-block">
                <h3 className="title-3 tractor">Auf der Weise</h3>
                <p className="story-text">
                  Nach der Geburt bei der Familie {_.first(cattle.CattleHistory).StayFamily}
                  in {_.first(cattle.CattleHistory).StayLocation} ging die Reise nach
                  {' '}{history}
                  {'.'}
                </p>
              </div>
            </div>
            <div className="story-column w-col w-col-4">
              <div className="story-block">
                <h3 className="title-3 steak">Bis zum Teller</h3>
                <p className="story-text">
                  Melanzane wurde am {moment(cattle.DeathDate).format('M. MMMM YYYY')}
                  {' '}in {_.last(cattle.CattleHistory).StayLocation} geschlachtet.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Story;
