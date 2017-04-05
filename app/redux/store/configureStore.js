import { createStore } from 'redux'
import rootReducer from 'redux/modules/root'

const configureStore = (preloadedState) => {
  const store = createStore(
    rootReducer,
    preloadedState
  )

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('redux/modules/root', () => {
      store.replaceReducer(rootReducer)
    })
  }

  return store
}

export default configureStore
