const {createVersionedPagesConfig} = require('../../versioned-pages');

module.exports = function versionedPagesPlugin() {
  const versionedPagesConfig = createVersionedPagesConfig();

  return {
    name: 'versioned-pages',
    async contentLoaded({actions}) {
      versionedPagesConfig.routes.forEach((route) => {
        actions.addRoute(route);
      });
    },
  };
};
