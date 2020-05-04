import React from "react";
// @material-ui/core components
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/styles';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import CustomInput from "components/CustomInput/CustomInput.js";
import Button from "components/CustomButtons/Button.js";
import Card from "components/Card/Card.js";
import CardHeader from "components/Card/CardHeader.js";
import CardBody from "components/Card/CardBody.js";
import CardFooter from "components/Card/CardFooter.js";

import firebaseApi, { fbAuth } from "../../services/firebase.conf";
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

class UserProfile extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      key: null,
      cnpj: "",
      name: "",
      cep: "",
      address: "",
      number: "",
      complement: "",
      phone: "",
      error: {},
      loading: false
    };
    this.handlechange = this.handlechange.bind(this);
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
    }

    let storeInfo = firebaseApi.database().ref('stores').orderByKey();
    storeInfo.on('child_added', snapshot => {
      if(snapshot.val().owner && snapshot.val().owner == uid){
        this.setState({key: snapshot.key})
        this.setState({cnpj: mask.cnpjMask(snapshot.key)})
        this.setState({name: snapshot.val().name})
        this.setState({cep: mask.cepMask(snapshot.val().cep)})
        this.setState({address: snapshot.val().address})
        this.setState({number: snapshot.val().number})
        this.setState({complement: snapshot.val().complement})
        this.setState({phone:  mask.phoneMask(snapshot.val().phone)})
      }
    })
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

  handleSubmit(){
    const { cnpj, name, cep, address, number, complement, phone } = this.state;
    firebaseApi.database()
      .ref("/stores")
      .child("/" + this.state.key)
      .update({ cnpj, name, cep, address, number, complement, phone });
  }

  cancel(e) {
    window.location.replace("/");
  }

  render() {
    const { classes } = this.props;
    const {
      cnpj,
      name,
      cep,
      address,
      number,
      complement,
      phone,
      error,
      loading
    } = this.state;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={12}>
            <Card>
              <CardHeader color="primary">
                <h4 className={classes.cardTitleWhite}>Editar Perfil</h4>
                <p className={classes.cardCategoryWhite}>Editar perfil da loja</p>
              </CardHeader>
              <CardBody>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={5}>
                    <CustomInput
                      labelText="CNPJ"
                      id="cnpj"
                      inputProps={{
                        onChange: this.handlechange,
                        value: cnpj
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={3}>
                    <CustomInput
                      labelText="Nome"
                      id="name"
                      inputProps={{
                        onChange: this.handlechange,
                        value: name
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="Endereço"
                      id="address"
                      inputProps={{
                        onChange: this.handlechange,
                        value: address
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
                <GridContainer>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Número"
                      id="number"
                      inputProps={{
                        onChange: this.handlechange,
                        value: number
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={6}>
                    <CustomInput
                      labelText="Complemento"
                      id="complement"
                      inputProps={{
                        onChange: this.handlechange,
                        value: complement
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
                      labelText="Telefone"
                      id="phone"
                      inputProps={{
                        onChange: this.handlechange,
                        value: phone
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                  <GridItem xs={12} sm={12} md={4}>
                    <CustomInput
                      labelText="CEP"
                      id="cep"
                      inputProps={{
                        onChange: this.handlechange,
                        value: cep
                      }}
                      formControlProps={{
                        fullWidth: true
                      }}
                    />
                  </GridItem>
                </GridContainer>
              </CardBody>
              <CardFooter>
                <Button color="primary"
                  onClick={() => this.handleSubmit()}>Salvar</Button>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

UserProfile.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(UserProfile);
