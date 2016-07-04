import React from 'react'
import ReactDOM from 'react-dom'
import { Router, Route, Link, browserHistory } from 'react-router'
import routes from './routes';

// SC - Global for Soundcloud - NPM install broken
SC.initialize({
  client_id: '4b5c0ba7c1c975229158789980bcd8b0',
  redirect_uri: 'http://localhost:8080/callback.html'
});
	

ReactDOM.render(
	<Router history={browserHistory}
		onUpdate={() => window.scrollTo(0, 0)}>
		{routes}
	</Router>,
	document.getElementById('app')
);