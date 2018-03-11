import EventEmitter from 'sm-event-emitter';

const EVENTS = {
    SHOW: 'LOADER_SERVICE.SHOW',
    HIDE: 'LOADER_SERVICE.HIDE'
};

let isLoading = false;

export class LoaderService {
    static show() {
        EventEmitter.emit(EVENTS.SHOW);
        isLoading = true;
    }

    static hide() {
        EventEmitter.emit(EVENTS.HIDE);
        isLoading = false;
    }

    static inLoading() {
        return isLoading;
    }
}

LoaderService.EVENTS = EVENTS;
