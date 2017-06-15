import { resolve } from 'path'
import { readFile } from 'fs'
import React from 'react'
import { renderToString } from 'react-dom/server'
import configureStore from 'redux/store/configureStore'
import App from 'containers/App'

export default function serverRender (stats) {
  return (req, res, next) => {
    const context = {}

    // Compile an initial state
    const preloadedState = {
      counter: 5,
      test: 2
    }

    // Create a new Redux store instance
    const store = configureStore(preloadedState)

    const html = renderToString(
      <App
        server
        store={store}
        location={req.url}
        context={context}
      />
    )

    // Grab the initial state from our Redux store
    // const finalState = store.getState()

    if (context.url) {
      res.redirect(301, context.url)
    } else {
      console.log('Server side rendering...')
      // TODO: En vez de leer del disco, usar el compiler para acceder al FS virtual ;)
      readFile(resolve(__dirname, 'template.html'), 'utf8', function (err, file) {
        if (err) return next(err)

        const document = file.replace('<div id="react-root"></div>', `<div id="react-root">${html}</div>`)
          .replace('window.__PRELOADED_STATE__ = {};', `window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState)};`)

        res.status(context.status || 200).send(document)
      })
    }
  }
}
