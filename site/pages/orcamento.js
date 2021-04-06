import Menu from "../components/Menu";
import Rodape from "../components/Rodape";
import Head from 'next/head'
import react, {useState} from "react";

import {
  Container,
  Jumbotron,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Alert
} from "reactstrap";

function orcamento() {
  const [orcamento, setOrcamento] = useState({
    name:'',
    email:'',
    phone:'',
    whatsapp:'',
    projeto:''

  });
  const [respose, setRespose] = useState({
    formSave:false,
    type:'',
    message:''
  })

  const onChangInput = e => setOrcamento({...orcamento, [e.target.name]: e.target.value});

  const sendOrcamento = async e => {
    e.preventDefault();
    console.log(orcamento);
    setRespose({formSave:true})
    try {
      const res =await fetch(`http://localhost:8080/orcamento`,{
        method:'POST',
        body: JSON.stringify(orcamento),
        headers:{'Content-Type':'aplication/json'}
      });

      const responseEnv = await res.json();

      if(responseEnv.error){
        setRespose({
          formSave:false,
          type: 'error', 
          message: responseEnv.message
        })
       
      }else{
        setRespose({
          type:'success',
          message:responseEnv.message
        });
        
      }
      
    } catch (err) {
      setRespose({
        type:'success',
        message:'Erro ao solicitar orçamento, tente novamente!'
      });
    }
   
  }

  return (
    <div>
      <head>
        <title>Orçamento-Lucas</title>
      </head>
      {/* componentes */}
      <Menu /> 
      
      <Jumbotron fluid className="descr-top ">
        <style>
          {`.descr-top{
                        background-color:black;
                        color: #00a1fc;
                        padding-top:40px;
                        padding-bootom:40px;
                        margin-bottom: 0rem; !important
                    }`}
        </style>
        <Container className="text-center">
          <h1 className="display-4">Faça já o seu orçamento</h1>
        </Container>
      </Jumbotron>
      <Jumbotron fluid className="form-orc">
        <style>
          {`.form-orc{
                        padding-top:80px;
                        padding-botom:80px;
                        background-color:#fff;
                        whidth:450px;

                        margin-bottom: 0rem !important;

                    }`}
        </style>
        <Container>
          {respose.type ==='error'? <Alert color="danger">
            {respose.message}
          </Alert>:'' }
          {respose.type ==='success'? <Alert color="success">
            {respose.message}
          </Alert>:'' }
          
          <Form onSubmit={sendOrcamento}>
            <FormGroup>
              <Label for="name">Nome</Label>
              <Input
                type="text"
                name="name"
                id="iname"
                placeholder="Preencha com o nome completo"
                onChange={onChangInput}
              />
            </FormGroup>
            <FormGroup>
              <Label for="email">E-mail</Label>
              <Input
                type="email"
                name="email"
                id="iemail"
                placeholder="Preencha seu email"
                onChange={onChangInput}
              />
            </FormGroup>
            <FormGroup>
              <Label for="phone">Telefone</Label>
              <Input
                type="text"
                name="phone"
                id="iphone"
                placeholder="(XX)XXXX-XXXX"
                onChange={onChangInput}
              />
            </FormGroup>
            <FormGroup>
              <Label for="whatsapp">Whatsapp</Label>
              <Input
                type="text"
                name="whatsapp"
                id="iwhatsapp"
                placeholder="(XX)XXXX-XXXX"
                onChange={onChangInput}
              />
            </FormGroup>
            
            <FormGroup>
              <Label for="projeto">Projeto</Label>
              <Input
                type="textarea"
                name="projeto"
                id="iprojeto"
                placeholder="Fale um pouco sobre seu projeto"
                onChange={onChangInput}
              />
            </FormGroup>
            {respose.formSave ? <Button type="submit" outline color="danger" disabled >Enviando...</Button>:<Button type="submit" outline color="primary">Solicitar orçamento</Button>}
            
          </Form>
        </Container>
      </Jumbotron>
      <Rodape/>
    </div>
    
  );
}

export default orcamento;
