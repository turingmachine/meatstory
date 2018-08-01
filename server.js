const port = parseInt(process.env.PORT, 10) || 3000

const _ = require('lodash')
const next = require('next')
const routes = require('./routes')
const api = require('./api')
const app = next({dev: process.env.NODE_ENV !== 'production'})
const handle = routes.getRequestHandler(app)

const { createServer } = require('http')
const { parse } = require('url')

app.prepare().then(() => {
  createServer((req, res) => {
    const parsedUrl = parse(req.url, true)
    const { pathname, query } = parsedUrl

    if (_.startsWith(pathname, '/api/story/')) {
      api.fetchCattle(_.last(_.split(pathname, '/'))).then(cattle => {
        res.writeHead(200, {'Content-Type': 'application/json'})
        res.write(JSON.stringify(cattle))
        res.end()
      }).catch(error => {
        console.log(error)
        res.writeHead(500)
        res.end()
      });
    } else {
      handle(req, res, parsedUrl)
    }
  }).listen(port, err => {
    if (err) throw err
  })
})
