'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.post('/user/create', controller.user.create);
  router.post('/user/get', controller.user.get);
  router.post('/case/get', controller.case.get);
  router.post('/case/create', controller.case.create);
  router.post('/comment/create', controller.comment.create);
  router.post('/comment/get', controller.comment.get);
  router.put('/comment/update', controller.comment.update);
  app.io.of('/chat').route('chat', app.io.controllers.chat);
};
