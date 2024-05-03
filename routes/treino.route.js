const express = require('express');
const app = express();
const treinoRoutes = express.Router();

let Treino = require('../model/Treino');

// api to add treino
treinoRoutes.route('/add').post(function (req, res) {
    let treino = new Treino(req.body);
    treino.save()
        .then(treino => {
            res.status(200).json({ 'status': 'Treino salvo com sucesso :D', 'mssg': 'treino added successfully' });
        })
        .catch(err => {
            res.status(409).send({ 'status': 'failure', 'mssg': 'unable to save to database' });
        });
});

// api to get treinos
treinoRoutes.route('/').get(function (req, res) {
    Treino.find(function (err, treinos) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'treinos': treinos });
        }
    });
});

// api to get treino
treinoRoutes.route('/treino/:id').get(function (req, res) {
    let id = req.params.id;
    Treino.findById(id, function (err, treino) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'treino': treino });
        }
    });
});

// api to update route
treinoRoutes.route('/update/:id').put(function (req, res) {
    Treino.findById(req.params.id, function (err, treino) {
        if (!treino) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Unable to find data' });
        } else {
            treino.name = req.body.name;
            treino.serie = req.body.serie;
            treino.rep = req.body.rep;

            treino.save().then(business => {
                res.status(200).json({ 'status': 'Treino editado com sucesso :D', 'mssg': 'Update complete' });
            })
        }
    });
});

// api for delete
treinoRoutes.route('/delete/:id').delete(function (req, res) {
    Treino.findByIdAndRemove({ _id: req.params.id }, function (err,) {
        if (err) {
            res.status(400).send({ 'status': 'failure', 'mssg': 'Something went wrong' });
        }
        else {
            res.status(200).json({ 'status': 'success', 'mssg': 'Delete successfully' });
        }
    });
});

module.exports = treinoRoutes;