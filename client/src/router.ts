import CreateHistory from "./views/create-history-view";
import Header from "./views/header-view";
import History from "./views/history-view";
import cem from './utils/custom-event';

export default class Router {
    constructor() {
        new Header();
        new History();
        new CreateHistory();

        window.addEventListener('popstate',(event) => {
            if(event.state === null) return;
            cem.fire('statepop',event.state);
        })

        cem.subscribe('statechange',(event: CustomEvent) =>
            this.stateChangeHandler({state: event.detail})
        )
    }

    stateChangeHandler(event?: Record<'state', Record<string, string|number>>) {
        if(event.state.isReplace) {
            delete event.state.isReplace;
            history.replaceState(event.state, '', event.state.path as string);
        } else {
            history.pushState(event.state, '', event.state.path as string);
        }
    }
}