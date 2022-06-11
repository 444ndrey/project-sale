module.exports = {
  publicPath: './',
  pluginOptions: {
    electronBuilder: {
      nodeIntegration: true,
      builderOptions: {
        extraResources: ['src/res/'],
        win:{
          icon: './icon.ico'
        }
      },
      externals: ['knex','sqlite3','better-sqlite3'],
    }
  }
}