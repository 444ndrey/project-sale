const { ipcMain, electron } = require('electron');
const db = require('./database.js')
module.exports = {

    listen: () => {
        ipcMain.on('get-all-agents', (e, ...args) => {
            e.reply('send-all-agents', ['ggg','eeee'])
            console.log('dsdsds');
        });
    }
        
}

