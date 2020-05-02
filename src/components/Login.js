import React from "react";
import "../App.css";
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
  }

  loginAttempt(e) {
    let data = this.state;
    data.error = {};
    let erro = true;

    fbAuth
      .signInWithEmailAndPassword(data.email, data.password)
      .then((e) => {
        erro = false;
        console.log("hi lorena");
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

  render() {
    const { email, password, error } = this.state;
    return (
      <div>
        <Card className="form">
          <CardContent>
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

            <Button className="button" size="small" onClick={this.loginAttempt}>
              Entrar
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
}

export default Login;
