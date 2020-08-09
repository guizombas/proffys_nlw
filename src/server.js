const {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClass
} = require("./pages")


//Configuração das rotas
const express = require("express")
const server = express()

//Configuração do nunjucks (template engine)
const nunjucks = require("nunjucks")
nunjucks.configure("src/views",{
    express: server,
    noCache: true
})

//Rotas e arquivos estáticos
server
//config de arquivos estáticos
.use(express.static("public"))
//config de requisição do body
.use(express.urlencoded( {extended:true} ))
//cofig de rotas
.get('/', pageLanding)
.get('/study', pageStudy)
.get('/giveClasses', pageGiveClasses)
.post('/saveClass', saveClass)
//inicia servidor
.listen(  process.env.PORT || "5500")