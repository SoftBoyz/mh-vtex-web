import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { Switch, Route } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// core components
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Table from "components/Table/Table.js";
import Card from "components/Card/Card.js";
import CardBody from "components/Card/CardBody.js";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import firebaseApi, { fbDatabase, fbAuth } from "../../services/firebase.conf";

import Button from "../../components/CustomButtons/Button.js";

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0",
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF",
    },
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
      lineHeight: "1",
    },
  },
  gridContainer: {
    marginTop: "0px",
  },
};
// A special wrapper for <Route> that knows how to
// handle "sub"-routes by passing them in a `routes`
// prop to the component it renders.
function RouteWithSubRoutes(route) {
  return (
    <Route
      path={route.path}
      render={(props) => (
        // pass the sub-routes down to keep nesting
        <route.component {...props} routes={route.routes} />
      )}
    />
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

const useStyles = makeStyles(styles);

function TableRender(props) {
  const { head, body } = props;
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

async function getData(table) {
  let user = "";
  await firebaseApi.auth().onAuthStateChanged(function(user) {
    if (user) {
      user = user.uid;
    }
  });
  let data = { center: false, partners: [], proposals: [] };
  let cnpj;

  var userQuery = firebaseApi.database().ref(table);
  await userQuery.once("value", function(snapshot) {
    snapshot.forEach(function(child) {
      if (child.val().owner == user) {
        cnpj = child.key;
      }
    });
  });

  var query = firebaseApi.database().ref(table);
  await query.once("value", (snapshot) => {
    snapshot.forEach((child) => {
      if (child.key == cnpj) {
        data = Object.assign(data, child.val());
        data.center = !child.val().center;
      }
    });
  });

  return { data, cnpj };
}

async function storeCenter(setCenter) {
  const { data, cnpj } = await getData("/stores");

  setCenter(data.center);

  fbDatabase
    .child("/stores")
    .child("/" + cnpj)
    .set(data);
}

async function partners(setCenter, setPartners, setProposals) {
  const { data } = await getData("/stores");

  const proposals = Object.values(data.proposals);
  const proposalsArray = proposals.map((el) => {
    return Object.values(el);
  });

  setCenter(!data.center);

  const propostas = {
    head: ["Loja", "Proposta", "Ação"],
    body: proposalsArray,
  };
  setProposals(propostas);

  const lojas_parceiras = {
    head: ["Loja", "Ação"],
    body: data.partners,
  };
  setPartners(lojas_parceiras);
}

const DropOff = (props) => {
  const [value, setValue] = React.useState(0);
  const [center, setCenter] = React.useState(false);
  const [lojas_parceiras, setPartners] = React.useState({ head: [], body: [] });
  const [propostas, setProposals] = React.useState({ head: [], body: [] });

  useEffect(() => {
    partners(setCenter, setPartners, setProposals);
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Button color={"primary"} onClick={() => storeCenter(setCenter)}>
          {center ? "Desativar " : "Ativar "}
          local como ponto de entrega
        </Button>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Paper square>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
          >
            <Tab label="Propostas de parceria" />
            <Tab label="Listar lojas parceiras" />
          </Tabs>
          <TabPanel value={value} index={0}>
            <TableRender head={propostas.head} body={propostas.body} />
          </TabPanel>
          <TabPanel value={value} index={1}>
            <TableRender
              head={lojas_parceiras.head}
              body={lojas_parceiras.body}
            />
          </TabPanel>
        </Paper>
      </GridItem>
    </GridContainer>
  );
};

export default DropOff;
