const { ipcMain, electron} = require('electron');
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
        ipcMain.handle('remove-agent', (e, id) => {
            db.removeAgentbyId(id).then(() => {
                return true;
            })
        })
        ipcMain.on('edit-agent',(e,agent) => {
            db.edtAgent(agent);
        });
        ipcMain.handle('get-all-products',(e) => {
           return db.getProducts().then((res) => {
                return res;
            })
        });
        ipcMain.handle('get-enities',(e,product) => {
           return db.getEntities(product).then(res => res)

        });
        ipcMain.handle('get-product-info',(e,id) => {
            return db.getProductbyId(id).then(res => res);
        });
        ipcMain.on('edit-product',(e,prodcut) => {
            db.saveChanges(prodcut);
        });
        ipcMain.on('add-product',(e,product) => {
            db.addProduct(product);
        });
        ipcMain.on('remove-product',(e,id) => {
            db.removeProductbyId(id);
        });
        ipcMain.on('add-purchase',(e,purchase) => {
            db.addNewPurchase(purchase).then(
                e.reply('succes-purchase')
            )
        });
        ipcMain.on('add-sale', (e,sale) => {
            db.addNewSale(sale).then(() => {
                e.reply('succes-sale');
            })
        })
        
    }
}

