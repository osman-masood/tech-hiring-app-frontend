import 'babel-polyfill';

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { Router, Route, IndexRoute, applyRouterMiddleware, browserHistory, routes} from 'react-router';
import useRelay from 'react-router-relay';
import config from './../config';

import App from './components/App/App';
import Home from './components/Home/Home';
import CandidateDetail from './components/Home/CandidateDetail';
import GraphiQLModule from './components/GraphiQL/GraphiQL';
import { HomeQueries, prepareHomeParams, BodyQueries} from './routes/HomeRoute';
import {ProfileQueries, prepareProfileParams} from "./routes/ProfileRoute";

const options = {};
if (localStorage.scapholdAuthToken) {
    options.headers = {
        Authorization: 'Bearer ' + localStorage.scapholdAuthToken
    }
}

Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer(config.scapholdUrl, options)
);

ReactDOM.render(
    <Router
        history={browserHistory}
        render={applyRouterMiddleware(useRelay)}
        routes={routes}
        environment={Relay.Store}
    >
        <Route path="/" component={App} />
        <Route path="/home" component={Home} queries={HomeQueries} prepareParams={prepareHomeParams}/>
        <Route path="/profile/:jobId/:userId/:relevancyScore" component={CandidateDetail} queries={ProfileQueries} prepareParams={prepareProfileParams} />
        <Route path="/graphiql" component={GraphiQLModule} />
    </Router>,
    document.getElementById('root')
);

/* Add queries={HomeQueries} prepareParams={prepareHomeParams} as attributes to the 'home' route to make queries defined in /routes/HomeRoute.js */
