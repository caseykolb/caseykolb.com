import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App';
import Menu from './components/Menu';
import Bio from './components/Bio';
import Music from './components/Music';


const routes = (
	<Route path="/" component={ App }>
		<IndexRoute component={ Menu } />
		<Route path="bio" component={ Bio } />
		<Route path="music" component={ Music } />
	</Route>
);

export default routes;