import React from "react";
import "./Register.css";
import { TextField, Card, CardContent, Button } from "@material-ui/core";
import { fbAuth } from "../services/firebase.conf";

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      error: {},
    };
    this.handlechange = this.handlechange.bind(this);
    this.loginAttempt = this.loginAttempt.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  loginAttempt(e) {
    let data = this.state;
    data.error = {};
    let erro = true;

    fbAuth
      .signInWithEmailAndPassword(data.email, data.password)
      .then((e) => {
        erro = false;
      })
      .catch((e) => {
        data.error.email = true;
        data.error.password = true;
        data.error.message = "Email ou senha incorretos";
      })
      .finally(() => {
        if (erro) {
          this.setState({ error: data.error });
        }
      });
  }

  handlechange(e) {
    let data = e.target.value;

    this.setState({ [e.target.id]: data });
  }

  cancel(e) {
    window.location.replace("/");
  }

  render() {
    const { email, password, error } = this.state;
    return (
      <div>
        <div className="logo">
          <span className="name">s-Mart</span>
        </div>
        <div className="background"></div>

        <div className="form">
            <form noValidate autoComplete="off">
              <div>
                <TextField
                  label="Email"
                  id="email"
                  margin="normal"
                  value={email}
                  onChange={this.handlechange}
                  error={error.email}
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
                  error={error.password}
                  helperText={error.message}
                  required
                />
              </div>
            </form>

            <div className="buttons">
                <Button className="button" variant="outlined" size="small" color="primary" onClick={this.cancel}>
                  Cancelar
                </Button>
                <Button className="button" variant="contained" size="small" color="primary" onClick={this.loginAttempt}>
                  Entrar
                </Button>
              </div>
        </div>
      </div>
    );
  }
}

export default Login;
