import React from 'react';
// @material-ui/core components
import { withStyles } from '@material-ui/styles';
// core components
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Typography from '@material-ui/core/Typography';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import { Button } from '@material-ui/core';

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

import firebaseApi, { fbAuth } from "../../services/firebase.conf";

const styles = {
    cardCategoryWhite: {
      "&,& a,& a:hover,& a:focus": {
        color: "rgba(255,255,255,.62)",
        margin: "0",
        fontSize: "14px",
        marginTop: "0",
        marginBottom: "0"
      },
      "& a,& a:hover,& a:focus": {
        color: "#FFFFFF"
      }
    },
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: "#777",
        fontSize: "65%",
        fontWeight: "400",
        lineHeight: "1"
      }
    },
    gridContainer: {
      marginTop: "0px",
    }
};

class ListProducts extends React.Component{

  constructor(props) {
    super(props);

    this.state = {
      products: []
    };    

    this.handleDelete = this.handleDelete.bind(this)
    this.createRow = this.createRow.bind(this)
    this.onRemoveItem = this.onRemoveItem.bind(this)
  }

  async componentDidMount() {
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

      
      var query = firebaseApi.database().ref(`products/${uid}`);
      
      await query.once("value", snapshot => {
        snapshot.forEach(child => {
          let product = { data: child.val(), id: child.key };
          this.setState({ products: [product].concat(this.state.products) });
        });
      })
      
    }
  }

  handleDelete(productId, key){
    firebaseApi.database().ref(`/products/${this.state.owner}`)
      .child(`${productId}`).remove()
    
    this.onRemoveItem(key)
  }

  onRemoveItem = i => {
    this.setState(state => {
      const products = state.products.filter((item, j) => i !== j);
 
      return {
        products,
      };
    });
  };
  
  createRow(key, productData, productId) {
      return [productData.nome, productData.preco, productData.estoque, productData.peso_volume, 
        <div>
          <Button color="primary" ><EditIcon /></Button>
          <Button color="primary" 
            onClick={() => {
              this.handleDelete(productId, key)
            }}
            ><DeleteIcon /></Button>
        </div> 
      ];
  }
  
    
  render(){
    const { classes } = this.props;
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain className={classes.gridContainer}>
            <CardBody>
              <Button 
                color="primary" 
                onClick={() => this.props.navigate("ListProducts", "AddProduct")}
                >
                  Adicionar Produto 
              </Button>
              <Table
                tableHeaderColor="primary"
                tableHead={["Nome", "Preço","Estoque", "Peso/Volume", "Ações"]}
                tableData={this.state.products.map((prop, key) => {
                  return this.createRow(key, prop.data, prop.id)
                })}
                style={{margin: "30px"}}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

export default withStyles(styles)(ListProducts);