import ReactGA from 'react-ga'

const initialize = () => {
  ReactGA.initialize('UA-109529087-1')
}

const pageview = () => {
  if (!window.GA_INITIALIZED) {
    initialize()
    window.GA_INITIALIZED = true
  }
  ReactGA.pageview(window.location.pathname)
}

export default pageview
