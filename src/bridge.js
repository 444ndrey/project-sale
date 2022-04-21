const { ipcMain, electron,} = require('electron');
const db = require('./database.js');



module.exports = {

    listen: () => {
        ipcMain.on('get-all-agents', (e, ...args) => {
            db.getAgents().then(res => {
                e.reply('send-all-agents', res)
            })
        });
        ipcMain.on('get-agent-info', (e, id) => {
            db.getAgentbyId(id).then(res => {
                e.reply('send-agent-info',res)
            });
        });
        ipcMain.on('add-agent', (e, agent) => {
            db.addAgent(agent);
        });
        // ipcMain.on('remove-agent', (e, id) => {
        //     db.removeAgentbyId(id);
        // });
        ipcMain.handle('remove-agent', (e, id) => {
            db.removeAgentbyId(id).then(() => {
                return true;
            })
        })
        ipcMain.on('edit-agent',(e,agent) => {
            db.edtAgent(agent);
        });
        
    }
}

