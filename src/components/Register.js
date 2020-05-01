import React from 'react';
import '../App.css';
import { TextField, Card, CardContent, Button } from '@material-ui/core';
import { fbDatabase, fbAuth } from '../services/firebase.conf';
import * as mask from '../mask';

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cnpj: '',
      name: '',
      cep: '',
      address: '',
      number: '',
      complement: '',
      email: '',
      phone: '',
      password: '',
      conf_password: '',
      error: {}
    };
    this.handlechange = this.handlechange.bind(this);
    this.createStore = this.createStore.bind(this);
  }

  createStore(e) {
    let data = this.state;
    data.error = {}
    let erro = true

    if (data.cnpj.length < 18) {
      data.error.cnpj = true;
    }
    else if (data.cep.length < 9) {
      data.error.cep = true;
    }
    else if(!(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(data.email))) {
      data.error.email = true;
    }
    else if (data.phone.length < 15) {
      data.error.phone = true;
    }
    else if (data.password != data.conf_password) {
      data.error.password = true
      data.error.conf_password = "As senhas são diferentes"
    }
    else if (data.password.length < 6) {
      data.error.password = true
      data.error.conf_password = "A senha precisa ter no mínimo 6 caracteres"
    }
    else {
      erro = false
      const store = ["name", "address", "number"]

      store.forEach(e => {
        if(!data[""+e]) {
          erro = true;
          data.error[e] = true;
        }
      })
    }

    if (erro) {
      this.setState({error: data.error})
      return;
    }

    fbAuth.createUserWithEmailAndPassword(data.email, data.password).catch(e => {
      data.error.email = true
    })

    data = JSON.parse(JSON.stringify(this.state))

    delete data.cnpj;
    delete data.error;
    delete data.email;
    delete data.password;
    delete data.conf_password;

    const cnpj = this.state.cnpj.replace(/\D/g, '')

    fbDatabase
      .child("/stores")
      .child("/" + cnpj)
      .set(data)

  }

  handlechange(e) {
    let data = e.target.value

    if (e.target.id === 'cep'){
      this.setState({ cep: mask.cepMask(data) })
    }
    else if (e.target.id === 'phone'){
      this.setState({ phone: mask.phoneMask(data) })
    }
    else if (e.target.id === 'cnpj'){
      this.setState({ cnpj: mask.cnpjMask(data) })
    }
    else {
      this.setState({[e.target.id]: data})
    }
  }

  render() {
    const { cnpj, name, cep, address, number, complement, email, phone, password, conf_password, error } = this.state
    return (
      <div>
        <Card className="form">
          <CardContent>
            <form noValidate autoComplete="off">
              <div>
                <TextField
                  label="CNPJ"
                  id="cnpj"
                  margin="normal"
                  value= {cnpj}
                  onChange= {this.handlechange}
                  error={error.cnpj}
                  required
                />
              </div>
              <div>
                <TextField
                  label="Nome"
                  id="name"
                  margin="normal"
                  value= {name}
                  onChange= {this.handlechange}
                  error={error.name}
                  required
                />
              </div>
              <div>
                <TextField
                  label="CEP"
                  id="cep"
                  margin="normal"
                  value= {cep}
                  onChange= {this.handlechange}
                  error={error.cep}
                  required
                />
              </div>
              <div>
                <TextField
                  label="Endereço"
                  id="address"
                  margin="normal"
                  value= {address}
                  onChange= {this.handlechange}
                  error={error.address}
                  required
                />
              </div>
              <div>
                <TextField
                  label="Número"
                  id="number"
                  margin="normal"
                  value= {number}
                  onChange= {this.handlechange}
                  error={error.number}
                  required
                />
              </div>
              <div>
                <TextField
                  label="Complemento"
                  id="complement"
                  margin="normal"
                  value= {complement}
                  onChange= {this.handlechange}
                />
              </div>
              <div>
                <TextField
                  label="Email"
                  id="email"
                  type="email"
                  margin="normal"
                  value= {email}
                  onChange= {this.handlechange}
                  error={error.email}
                  required
                />
              </div>
              <div>
                <TextField
                  label="Telefone"
                  id="phone"
                  margin="normal"
                  value= {phone}
                  onChange= {this.handlechange}
                  error={error.phone}
                  required
                />
              </div>
              <div>
                <TextField
                  label="Senha"
                  id="password"
                  type="password"
                  margin="normal"
                  value= {password}
                  onChange= {this.handlechange}
                  error={error.password}
                  helperText={error.conf_password}
                  required
                />
              </div>
              <div>
                <TextField
                  label="Confirmar senha"
                  id="conf_password"
                  type="password"
                  margin="normal"
                  value= {conf_password}
                  onChange= {this.handlechange}
                  error={error.password}
                  helperText={error.conf_password}
                  required
                />
              </div>
            </form>

            <Button className="button" size="small" onClick={this.createStore}>Cadastrar</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

}

export default Register;