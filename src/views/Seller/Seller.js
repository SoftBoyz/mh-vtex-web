import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from "react-router-dom";
import firebaseApi, { fbAuth } from '../../services/firebase.conf';
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

import Maps from "../Maps/Maps";

import {pedidos} from 'components/User.js';
import OrderLists from 'components/user/OrderList';
import SellerRoutes from 'views/Seller/SellerRoutes'

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

function TableRender(props) {
  const {head, body} = props;
  const classes = useStyles();
  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain className={classes.gridContainer}>
          <CardBody>
            <Table
              tableHeaderColor="primary"
              tableHead={head}
              tableData={body}
            />
          </CardBody>
        </Card>
      </GridItem>
    </GridContainer>
  );
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={1}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles(styles);

function TableOne() {
  return <OrderLists orders={pedidos} />;
}

function TableTwo() {
  return <SellerRoutes />
}

async function getData(table) {
  let user = ''
  await firebaseApi.auth().onAuthStateChanged(function (user) {
    if (user) {
      user = user.uid
      console.log(user)
    }
  })
  let data = []
  let store = {}
  let cnpj;

  var userQuery = firebaseApi.database().ref(table);
  await userQuery.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
      if (child.val().owner == user) {
        store = child.val()
        cnpj = child.key;
      }
    });
  });
  
  var query = firebaseApi.database().ref(table);
  await query.once("value", snapshot => {
    snapshot.forEach(child => {
      if (child.key != cnpj && child.val().center == true){
        data.push({cnpj: child.key, ...child.val()});
      }
    });
  })

  data.splice(store, 1);

  return {data, cnpj};
}

async function partners(setStores) {
  const {data} = await getData('/stores')

  const storesArray = data.map(el => {
    const store = [el.cnpj, el.name, '']
    return store;
  })


  const lojas = {
    head: ["CNPJ", "Loja", "Ação"],
    body: storesArray
  }
  setStores(lojas);

}

export default function SellerTabs() {
  const [value, setValue] = React.useState(0);
  const [lojas_disponiveis, setStores] = React.useState({head: ["CNPJ", "Loja", "Ação"], body: []});

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    partners(setStores)
  }, []);

  return (
    <Paper square>
      <Tabs
        value={value}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Pedidos" />
        <Tab label="Produtos cadastrados" />
        <Tab label="Parceiros" />
        <Tab label="Novo ponto de entrega" />
      </Tabs>
      <TabPanel value={value} index={0}>
        <TableOne />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TableTwo />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <Maps />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <TableRender head={lojas_disponiveis.head} body={lojas_disponiveis.body} />
      </TabPanel>
    </Paper>
  );
}
