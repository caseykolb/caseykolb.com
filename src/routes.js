import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './pages/App';
import Menu from './pages/Menu';
import Bio from './pages/Bio';
import Music from './pages/Music';


const routes = (
	<Route path="/" component={ App }>
		<IndexRoute component={ Menu } />
		<Route path="bio" component={ Bio } />
		<Route path="music" component={ Music } />
	</Route>
);

export default routes;