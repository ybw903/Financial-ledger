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