// server/server.js
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

const app = express();
const port = 3000;

const cors = require('cors');
app.use(cors());

// Configuração para servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static(path.join(__dirname, '../public')));

// Configuração do Body Parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configuração do Multer para upload de arquivos (opcional)
const upload = multer({ dest: 'uploads/' });

// Configuração do MySQL
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345678',
    database: 'sistemausuario'
});

// Conectar ao banco de dados MySQL
connection.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err.stack);
        return;
    }
    console.log('Conectado ao banco de dados MySQL.');
});

// Rota principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.use(express.json()); // Para analisar corpos de requisição JSON

app.post('/submit', (req, res) => {
    const { nome, sobrenome, email, telefone, senha, confirmaSenha } = req.body;
    
    console.log('Dados recebidos:', { nome, sobrenome, email, telefone, senha, confirmaSenha });

    // Exemplo de inserção no banco de dados
    const query = 'INSERT INTO usuarios (nome, sobrenome, email, telefone, senha) VALUES (?, ?, ?, ?, ?)';
    connection.query(query, [nome, sobrenome, email, telefone, senha], (err, results) => {
        if (err) {
            console.error('Erro ao inserir dados no banco de dados:', err);
            return res.status(500).send('Erro ao inserir dados');
        }
        res.status(200).send('Dados inseridos com sucesso!');
    });
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});