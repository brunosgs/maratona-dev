// Configurar o servidor
const express = require("express")
const server = express()

// Configurar o servidor para apresentar arquivos extras
server.use(express.static('public'))

// Habilitar body do formulario
server.use(express.urlencoded({ extended: true }))

// Configurando a template engine
const nunjucks = require("nunjucks")
nunjucks.configure("./", {
    express: server,
    noCache: true,
})

// Lista de doadores (Vetor ou Array)
const donors = [{
        name: "Diego Fernandes",
        blood: "AB+"
    },
    {
        name: "Cleiton Souza",
        blood: "B+"
    },
    {
        name: "Robson Marques",
        blood: "A+"
    },
    {
        name: "Mayk Brito",
        blood: "O+"
    }
]

// Configurar a apresentação da página
server.get("/", function(req, res) {
    return res.render("index.html", { donors })
})

server.post("/", function(req, res) {
    // Pega dados do formulario
    const name = req.body.name
    const email = req.body.email
    const blood = req.body.blood

    // Adiciono valores no array
    donors.push({
        name: name,
        blood: blood,
    })

    return res.redirect("/")
})

// Ligar o server e permitir o acesso a porta 3000 
server.listen(3000, function() {
    console.log("Start server...")
})