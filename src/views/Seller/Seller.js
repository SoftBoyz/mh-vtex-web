import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from "react-router-dom";
import firebaseApi from '../../services/firebase.conf';
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

import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';

import Maps from "../Maps/Maps";

import {pedidos} from 'components/User.js';
import OrderLists from 'components/user/OrderList';
import { Button } from '@material-ui/core';

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

function createRow(ID, name, price, stock, weight) {
  return [ID, name, price, stock, weight, 
    <div>
      <Button color="primary" ><EditIcon /></Button>
      <Button color="primary" ><DeleteIcon /></Button>
    </div> 
  ];
}

const useStyles = makeStyles(styles);

function TableOne() {
  return <OrderLists orders={pedidos} />;
}

function TableTwo() {
  const classes = useStyles();

  const produtos = [
    createRow("1", "Maçã", "R$3,70", "123", "1kg"),
    createRow("2", "Banana", "R$2,20", "123", "1kg"),
    createRow("3", "Chocolate", "R$6,50", "123", "300g"),
    createRow("4", "Suco", "R$2,99", "123", "1L"),
  ]

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Card plain className={classes.gridContainer}>
          <CardBody>
            <Button 
              color="primary" 
              onClick={() => console.log("teste")}
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
// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.layout + route.path}
      render={props => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
  );
}
export default function SellerTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
    </Paper>
  );
}
