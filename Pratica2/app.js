const express = require('express');
const bodyParser = require('body-parser');
const dao = require('./dao');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/cadastrar', async (req, res) => {
    try {
        const aluno = {
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone
        };
        const id = await dao.gravarAluno(aluno);
        console.log('Aluno cadastrado com ID:', id);
        res.redirect('/');
    } catch (error) {
        console.error('Erro ao cadastrar aluno:', error);
        res.status(500).send('Erro ao cadastrar aluno.');
    }
});

app.post('/atualizar', async (req, res) => {
    try {
        const aluno = {
            id: req.body.id,
            nome: req.body.nome,
            email: req.body.email,
            telefone: req.body.telefone
        };
        const affectedRows = await dao.atualizarAluno(aluno);
        console.log('Aluno atualizado:', affectedRows);
        res.redirect('/');
    } catch (error) {
        console.error('Erro ao atualizar aluno:', error);
        res.status(500).send('Erro ao atualizar aluno.');
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});
