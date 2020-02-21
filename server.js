// Configurar o servidor
const express = require("express");
const server = express();

// Configurar o servidor para apresentar arquivos extras
server.use(express.static('public'));

// Habilitar body do formulario
server.use(express.urlencoded({ extended: true }));

// Configurar a conexão com o banco de dados
const Pool = require('pg').Pool;
const db = new Pool({
    user: 'postgres',
    password: 'rocketseat',
    host: 'localhost',
    port: 5432,
    database: 'doe'
});

// Configurando a template engine
const nunjucks = require("nunjucks");
nunjucks.configure("./", {
    express: server,
    noCache: true,
});

// Configurar a apresentação da página
server.get("/", function(req, res) {
    db.query("select * from donors", function(err, result) {
        if (err) {
            return res.send("Erro de bando de dados!");
        }

        const donors = result.rows;

        return res.render("index.html", { donors });
    });
});

server.post("/", function(req, res) {
    // Pega dados do formulario
    const name = req.body.name;
    const email = req.body.email;
    const blood = req.body.blood;

    if (name == "" || email == "" || blood == "") {
        return res.send("Todos os campos são obrigatórios.");
    }

    // Adiciono valores dentro do banco de dados.
    const sql = `insert into donors ("name", "email", "blood") values ($1, $2, $3)`;
    const values = [name, email, blood];

    db.query(sql, values, function(err) {
        // Fluxo de erro
        if (err) {
            return res.send("Erro no banco de dados!");
        }
        return res.redirect("/");
    });
});

// Ligar o server e permitir o acesso a porta 3000 
server.listen(3000, function() {
    console.log("Start server...");
});