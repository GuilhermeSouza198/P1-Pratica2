const mysql = require('mysql2');

class DAO {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'fatec123',
            database: 'escola'
        });

        this.connection.connect((err) => {
            if (err) {
                console.error('Erro ao conectar ao banco de dados:', err);
                return;
            }
            console.log('Conectado ao banco de dados MySQL.');
        });
    }

    gravarAluno(aluno) {
        const query = 'INSERT INTO aluno (nome, email, telefone) VALUES (?, ?, ?)';
        return new Promise((resolve, reject) => {
            this.connection.query(query, [aluno.nome, aluno.email, aluno.telefone], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.insertId);
            });
        });
    }

    atualizarAluno(aluno) {
        const query = 'UPDATE aluno SET nome = ?, email = ?, telefone = ? WHERE id = ?';
        return new Promise((resolve, reject) => {
            this.connection.query(query, [aluno.nome, aluno.email, aluno.telefone, aluno.id], (err, results) => {
                if (err) {
                    return reject(err);
                }
                resolve(results.affectedRows);
            });
        });
    }
}

module.exports = new DAO();
