import EventEmitter from 'sm-event-emitter';

const TOASTER_TYPES = {
  WARNING: 'WARNING',
  ERROR: 'ERROR',
  SUCCESS: 'SUCCESS',
  NORMAL: 'NORMAL',
}

export class ToasterService {

  static error(message, options) {
    EventEmitter.emit(TOASTER_TYPES.ERROR, {
      type: TOASTER_TYPES.ERROR,
      message,
      options
    });
  }

  static success(message, options) {
    EventEmitter.emit(TOASTER_TYPES.SUCCESS, {
      type: TOASTER_TYPES.SUCCESS,
      message,
      options
    });
  }
}

ToasterService.TYPES = TOASTER_TYPES
