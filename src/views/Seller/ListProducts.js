import React from 'react';
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
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

function createRow(ID, name, price, stock, weight) {
    return [ID, name, price, stock, weight, 
      <div>
        <Button color="primary" ><EditIcon /></Button>
        <Button color="primary" ><DeleteIcon /></Button>
      </div> 
    ];
}

const produtos = [
    createRow("1", "Maçã", "R$3,70", "123", "1kg"),
    createRow("2", "Banana", "R$2,20", "123", "1kg"),
    createRow("3", "Chocolate", "R$6,50", "123", "300g"),
    createRow("4", "Suco", "R$2,99", "123", "1L"),
]

const useStyles = makeStyles(styles);
export default function ListProducts(props){
    const classes = useStyles();
    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card plain className={classes.gridContainer}>
            <CardBody>
              <Button 
                color="primary" 
                onClick={() => props.navigate("ListProducts", "AddProduct")}
                >
                  Adicionar Produto 
              </Button>
              <Table
                tableHeaderColor="primary"
                tableHead={["ID", "Nome", "Preço","Estoque", "Peso/Volume", "Ações"]}
                tableData={produtos}
                style={{margin: "30px"}}
              />
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
}