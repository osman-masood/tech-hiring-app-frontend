import 'babel-polyfill';
import 'whatwg-fetch';

import FastClick from 'fastclick';

import React from 'react';
import ReactDOM from 'react-dom';
import Relay from 'react-relay';
import { Router, Route, IndexRoute, applyRouterMiddleware, browserHistory} from 'react-router';
import useRelay from 'react-router-relay';
import config from './../config';

import App from './components/App/App';
import Home from './components/Home/Home';
import CandidateDetail from './components/Home/CandidateDetail';
import GraphiQLModule from './components/GraphiQL/GraphiQL';
import { HomeQueries, prepareHomeParams, BodyQueries} from './routes/HomeRoute';
import {ProfileQueries, prepareProfileParams} from "./routes/ProfileRoute";

const options = {};

// let routesJson = require('./routes.json').default; // Loaded with utils/routes-loader.js

const container = document.getElementById('root');

if (localStorage.scapholdAuthToken) {
    options.headers = {
        Authorization: 'Bearer ' + localStorage.scapholdAuthToken
    }
}

Relay.injectNetworkLayer(
    new Relay.DefaultNetworkLayer(config.scapholdUrl, options)
);

// function renderComponent(component) {
    ReactDOM.render(
        <Router
            history={browserHistory}
            render={applyRouterMiddleware(useRelay)}
                environment={Relay.Store}
        >
            <Route path="/" component={App} />
            <Route path="/home" component={Home} queries={HomeQueries} prepareParams={prepareHomeParams} />
            <Route path="/profile/:jobId/:userId" component={CandidateDetail} queries={ProfileQueries} prepareParams={prepareProfileParams} />
            <Route path="/graphiql" component={GraphiQLModule} />
        </Router>,
        container
    );
// }

/* Add queries={HomeQueries} prepareParams={prepareHomeParams} as attributes to the 'home' route to make queries defined in /routes/HomeRoute.js */


// Find and render a web page matching the current URL path,
// if such page is not found then render an error page (see routesJson.json, core/router.js)
// function render(location) {
//     router.resolve(routesJson, location)
//         .then(renderComponent)
//         .catch(error => router.resolve(routesJson, { ...location, error }).then(renderComponent));
// }

// Handle client-side navigation by using HTML5 History API
// For more information visit https://github.com/ReactJSTraining/history/tree/master/docs#readme
// history.listen(render);
// render(history.location);

// Eliminates the 300ms delay between a physical tap
// and the firing of a click event on mobile browsers
// https://github.com/ftlabs/fastclick
FastClick.attach(document.body);

// Enable Hot Module Replacement (HMR)
// if (module.hot) {
//     module.hot.accept('./routes.json', () => {
//         routesJson = require('./routes.json').default; // eslint-disable-line global-require
//         render(history.location);
//     });
// }