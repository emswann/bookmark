module.exports = app => {
  // Requires other bookmarks controllers so only need to use one in node server.
  require('./bookmarks_controller_get')(app);
  require('./bookmarks_controller_post')(app);
  require('./bookmarks_controller_put')(app);
};
