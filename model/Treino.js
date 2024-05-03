const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Treino = new Schema({
    name: {
        type: String
    },
    serie: {
        type: String
    },
    rep: {
        type: String
    }
}, {
    collection: 'treino'
});

module.exports = mongoose.model('Treino', Treino);