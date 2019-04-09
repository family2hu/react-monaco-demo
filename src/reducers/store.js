import thunk from 'redux-thunk';
import { applyMiddleware, createStore } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import createHistory from 'history/createBrowserHistory';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducers from './index';

const history = createHistory();
const middleware = routerMiddleware(history);
const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk, middleware)));

store.subscribe(() => {
  const { editor } = store.getState();
  if (editor && editor.screenId) {
    localStorage.setItem(`screen_${editor.screenId}`, JSON.stringify(editor));
  }
});

export { store, history };
