module.exports = {
  publicPath: './',
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        extraResources: ['src/res/']
      },
      externals: ['knex','sqlite3','better-sqlite3'],
    }
  }
}