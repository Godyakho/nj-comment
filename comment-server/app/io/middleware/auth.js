'use strict';

module.exports = () => {
  return function* (next) {
    this.socket.emit('res', 'connected!');
    yield* next;
    console.log('disconnection!');
  };
};
