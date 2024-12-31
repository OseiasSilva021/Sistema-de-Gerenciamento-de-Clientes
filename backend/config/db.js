const mongoose = require('mongoose');
const db = conectaAoMongoose()

function conectaAoMongoose() {

    mongoose.connect("mongodb+srv://usuario021:oseias@cluster0.deyip.mongodb.net/bancodeoseias?retryWrites=true&w=majority&appName=Cluster0")


.then(() => {console.log('MongoDB conectado!')})
.catch(err => {console.log(err)})
}

module.exports = db;