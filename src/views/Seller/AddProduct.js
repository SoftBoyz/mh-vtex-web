import React from "react";
import { TextField, Button, CircularProgress } from "@material-ui/core";

import { withStyles } from '@material-ui/styles';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import firebaseApi, { fbAuth } from "../../services/firebase.conf";
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";
import Box from '@material-ui/core/Box';

import * as mask from "../../mask";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

class AddProduct extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      owner: null,
      nome: "",
      preco: "",
      estoque: "",
      peso_volume: "",
      error: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.cancel = this.cancel.bind(this);
  }

  componentDidMount() {
    var user = fbAuth.currentUser;
    var name, email, photoUrl, uid, emailVerified;

    if (user != null) {
      name = user.displayName;
      email = user.email;
      photoUrl = user.photoURL;
      emailVerified = user.emailVerified;
      uid = user.uid;  // The user's ID, unique to the Firebase project. Do NOT use
                      // this value to authenticate with your backend server, if
                      // you have one. Use User.getToken() instead.
      this.setState({ owner: uid })
    }

  }

  handleChange(e) {
    let data = e.target.value;
    
    this.setState({ [e.target.id]: data });

  }

  handleSubmit(){
    const { 
      owner,
      nome,
      preco,
      estoque,
      peso_volume } = this.state;

    firebaseApi.database().ref(`/products/${owner}`).push().set({
      nome,
      preco,
      estoque,
      peso_volume 
    }, (error) => {
      if (error) {
        alert(error)
      } else {
        this.props.navigate("ListProducts")
      }
    });
  }
  
  cancel(e) {
    this.props.navigate("ListProducts")
  }

  render() {
    const { classes } = this.props;
    const {
      nome,
      preco,
      estoque,
      peso_volume,
      error,
    } = this.state;
    return (
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
          <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Dados do produto</h4>
              </CardHeader>
              <CardBody>
              <Box mx={5}>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={12}>
                    <CustomInput
                      labelText="Nome"
                      id="nome"
                      inputProps={{
                        onChange: this.handleChange,
                        value: nome,
                        error: error.nome,
                        required: true
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Preço"
                      id="preco"
                      inputProps={{
                        onChange: this.handleChange,
                        value: preco,
                        error: error.preco,
                        required: true,
                        type: 'number'
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Estoque"
                      id="estoque"
                      inputProps={{
                        onChange: this.handleChange,
                        value: estoque,
                        error: error.estoque,
                        required: true,
                        type: 'number'
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Peso/Volume"
                      id="peso_volume"
                      inputProps={{
                        onChange: this.handleChange,
                        value: peso_volume,
                        error: error.peso_volume,
                        required: true,
                        type: 'number'
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                </Box>
                <div className="buttons">
                  <Button className="button" variant="outlined" size="small" color="primary" onClick={this.cancel}>
                    Cancelar
                  </Button>
                  <Button className="button" variant="contained" size="small" color="primary" onClick={this.handleSubmit}>
                    Cadastrar
                  </Button>
                </div>
              </CardBody>
            </Card>
          </GridItem>
        </GridContainer>
    );
  }
}

export default withStyles(styles)(AddProduct);