import React from "react";
import "./Register.css";
import { TextField, Button, CircularProgress } from "@material-ui/core";
import { fbDatabase, fbAuth } from "../services/firebase.conf";
import * as mask from "../mask";

class Register extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      cnpj: "",
      name: "",
      cep: "",
      address: "",
      number: "",
      complement: "",
      email: "",
      phone: "",
      password: "",
      conf_password: "",
      error: {},
      loading: false
    };
    this.handlechange = this.handlechange.bind(this);
    this.createStore = this.createStore.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  async createStore(e) {
    let data = this.state;
    data.error = {};
    this.setState({ loading: true });
    let erro = true;

    if (data.cnpj.length < 18) {
      data.error.cnpj = true;
    } else if (data.cep.length < 9) {
      data.error.cep = true;
    } else if (!/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/.test(data.email)) {
      data.error.email = true;
    } else if (data.phone.length < 14) {
      data.error.phone = true;
    } else if (data.password !== data.conf_password) {
      data.error.password = true;
      data.error.conf_password = "As duas senhas precisam ser iguais";
    } else if (data.password.length < 6) {
      data.error.password = true;
      data.error.conf_password = "A senha precisa ter no mínimo 6 caracteres";
    } else {
      erro = false;
      const store = ["name", "address", "number"];

      store.forEach((e) => {
        if (!data["" + e]) {
          erro = true;
          data.error[e] = true;
        }
      });
    }

    if (erro) {
      this.setState({ error: data.error, loading: false });
      return;
    }

    await fbAuth
      .createUserWithEmailAndPassword(data.email, data.password)
      .catch((e) => {
        erro = true
        data.error.email = true;
        data.error.message = "Esse email já está cadastrado";
      })

    if (erro) return;
    
    data = JSON.parse(JSON.stringify(this.state));
    await fbAuth.signInWithEmailAndPassword(data.email, data.password)
    data.owner = fbAuth.currentUser.uid

    delete data.cnpj;
    delete data.error;
    delete data.email;
    delete data.password;
    delete data.conf_password;
    delete data.loading;

    const cnpj = this.state.cnpj.replace(/\D/g, "");

    fbDatabase
      .child("/stores")
      .child("/" + cnpj)
      .set(data);

    this.setState({ loading: false });
    window.location.replace("/admin");
  }

  handlechange(e) {
    let data = e.target.value;

    if (e.target.id === "cep") {
      this.setState({ cep: mask.cepMask(data) });
    } else if (e.target.id === "phone") {
      this.setState({ phone: mask.phoneMask(data) });
    } else if (e.target.id === "cnpj") {
      this.setState({ cnpj: mask.cnpjMask(data) });
    } else {
      this.setState({ [e.target.id]: data });
    }
  }

  cancel(e) {
    window.location.replace("/");
  }

  render() {
    const {
      cnpj,
      name,
      cep,
      address,
      number,
      complement,
      email,
      phone,
      password,
      conf_password,
      error,
      loading
    } = this.state;
    return (
      <div>
        <div className="logo" onClick={this.cancel}>
          <span className="name">smart</span>
        </div>
        <div className="background"></div>

        <div className="form">
            <form>
              <div>
                <TextField
                  label="CNPJ"
                  id="cnpj"
                  margin="normal"
                  value={cnpj}
                  onChange={this.handlechange}
                  disabled={loading}
                  error={error.cnpj}
                  required
                />
              </div>
              <div>
                <TextField
                  label="Nome da Loja"
                  id="name"
                  margin="normal"
                  value={name}
                  onChange={this.handlechange}
                  disabled={loading}
                  error={error.name}
                  required
                />
              </div>
              <div>
                <TextField
                  label="CEP"
                  id="cep"
                  margin="normal"
                  value={cep}
                  onChange={this.handlechange}
                  disabled={loading}
                  error={error.cep}
                  required
                />
              </div>
              <div>
                <TextField
                  label="Endereço"
                  id="address"
                  margin="normal"
                  value={address}
                  onChange={this.handlechange}
                  disabled={loading}
                  error={error.address}
                  required
                />
              </div>
              <div>
                <TextField
                  label="Número"
                  id="number"
                  margin="normal"
                  value={number}
                  onChange={this.handlechange}
                  disabled={loading}
                  error={error.number}
                  required
                />
              </div>
              <div>
                <TextField
                  label="Complemento"
                  id="complement"
                  margin="normal"
                  value={complement}
                  onChange={this.handlechange}
                  disabled={loading}
                />
              </div>
              <div>
                <TextField
                  label="Email"
                  id="email"
                  type="email"
                  margin="normal"
                  value={email}
                  onChange={this.handlechange}
                  disabled={loading}
                  helperText={error.message}
                  error={error.email}
                  required
                />
              </div>
              <div>
                <TextField
                  label="Telefone"
                  id="phone"
                  margin="normal"
                  value={phone}
                  onChange={this.handlechange}
                  disabled={loading}
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
                  value={password}
                  onChange={this.handlechange}
                  disabled={loading}
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
                  value={conf_password}
                  onChange={this.handlechange}
                  disabled={loading}
                  error={error.password}
                  helperText={error.conf_password}
                  required
                />
              </div>
              <div>
                <small>Já possui conta? <a href="/login">Faça Login</a></small>
              </div>
            </form>

            <div className="buttons">
              {loading ?
                <CircularProgress size={65}/>
              :
                <div>
                  <Button className="button" variant="outlined" size="small" color="primary" onClick={this.cancel}>
                    Cancelar
                  </Button>
                  <Button className="button" variant="contained" size="small" color="primary" onClick={this.createStore}>
                    Cadastrar
                  </Button>
                </div>
              }
          </div>
        </div>
      </div>
    );
  }
}

export default Register;