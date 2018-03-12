import EventEmitter from 'sm-event-emitter';

const TOASTER_TYPES = {
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  NORMAL: 'NORMAL',
  SHOW: 'SHOW',
}

export class ToasterService {

  static error(message, options) {
    EventEmitter.emit(TOASTER_TYPES.SHOW, {
      type: TOASTER_TYPES.ERROR,
      message,
      options
    });
  }

  static success(message, options) {
    EventEmitter.emit(TOASTER_TYPES.SHOW, {
      type: TOASTER_TYPES.SUCCESS,
      message,
      options
    });
  }
}

ToasterService.TYPES = TOASTER_TYPES
