import {createStore,compose} from 'redux' //{} needed if import not default
import {syncHistoryWithStore} from 'react-router-redux'
import {browserHistory} from 'react-router'
import rootReducer from './reducers/index'
import comments from './data/comments'
import posts from './data/posts'

const defaultState = {
  posts, //no need to do posts:posts if var name and key are same
  comments
}

const store = createStore(rootReducer,defaultState)
export const history = syncHistoryWithStore(browserHistory,store)
if (module.hot) {
  module.hot.accept('./reducers/',() => {
    const nextRootReducer = require('./reducers/index').default
    store.replaceReducer(nextRootReducer)
  })
}
export default store