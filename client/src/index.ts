import CreateHistory from "./components/create-history";
import Header from "./components/header";
import History from "./components/history";
import Model from "./models";
import Router from "./router";
import cem from './utils/custom-event';

new Router();
new Model();

cem.fire(
    'statechange',
    history.state ?? {
        path: '/',
        year: new Date().getFullYear(),
        month: new Date().getMonth() +1,
        isReplace: true
    }
)