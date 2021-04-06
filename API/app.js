const express = require ('express');
const mongoose = require('mongoose');
const cors = require ('cors');

require('./models/home');
const Home = mongoose.model('Home');

require('./models/orcamento');

const Orcamento = mongoose.model('Orcamento');

mongoose.connect('mongodb://localhost:27017/lucas', {useNewUrlParser: true, useUnifiedTopology:true}).then(()=>{
    console.log("Conexão com DB mongoDB realizada com sucesso");
}).catch((err)=>{
    console.log("Erro: Conexão com DB mongoDB não realizada com sucesso");
})

const app = express();
app.use(express.json());
app.use((req, res, next)=>{
    res.header ("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,PUT,POST, DELETE");
    res.header("Access-Control-Allow-Headers", "X-PINGOTHER,Content-Type, Authorization")
    app.use(cors());
    next();
})

app.get("/home", async(req,res)=>{
    await Home.findOne({}).then((home)=>{
        return res.json({
            error: false,
            home
        }).catch((err)=>{
            return res.status(400).json({
                error:true,
                message:"Nenhum registro encontrado"
            })
        })
    })
})

app.post("/home",async (req, res)=>{
    const dados ={
        "topTitulo": "Temos a solução que sua empresa precisa!",
        "topSubtitulo": "This is a simple hero unit, a simple Jumbotron-style component for calling extra attention to featured content or information.",
        "topTextoBtn":"Orçamento",
        "topLinkBtn":"/orcamento",
        "serTitulo":"Serviço",
        "serSubtitulo":"Já estamos funcionando normalmente basta entrar em contato com nossa empresa",
        "serUmIcone":"laptop-code",
        "serUmTitulo":"Desenvolvimento Web",
        "serUmDesc":"Este serviço se refere a construção de sites responsivos",
        "serDoisIcone":"mobile-alt",
        "serDoisTitulo":"Mobile",
        "serDoisDesc":" Este serviço se refere ao desenvolvimento de Aplicativos Nativos para Android e IOS ",
        "serTresIcone":"network-wired",
        "serTresTitulo":"Redes",
        "serTresDesc":"Este serviço se refere a construção da arquitetura de redes da empresa",



    }
    const homeExiste = await Home.findOne({});
    if(homeExiste){
        return res.status(400).json({
            error:true,
            message:"A pagina home já possui um registro no banco de dados "
        });
    }
    await Home.create(dados, (err)=>{
        if(err) return res.status(400).json({
            error:true,
            message: "Erro: conteudo da página Home não cadastrado"

        })
    });

    return res.json({
        error:false,
        message:"Conteudo da página Home cadastrado com sucesso"

    })

});
app.post("/orcamento",async (req, res)=>{
    
    await Orcamento.create(req.body, (err)=>{
        if(err) return res.status(400).json({
            error:true,
            message: "Erro: Solicitação de orcamento não enviada"

        })
    });

    return res.json({
        error:false,
        message:"Solicitação de orçamento enviado com sucesso!"

    })

});

app.listen(8080, function(){console.log("Servidor rodando com sucesso na porta 8080 http://localhost:8080")});