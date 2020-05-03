import React from 'react';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

import Button from "../../components/CustomButtons/Button.js";

export default function DisabledTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <GridContainer>
      <GridItem xs={12} sm={12} md={12}>
        <Button 
          color={"primary"}
          >Ativar local como ponto de entrega</Button>
      </GridItem>
      <GridItem xs={12} sm={12} md={12}>
        <Paper square>
          <Tabs
            value={value}
            indicatorColor="primary"
            textColor="primary"
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            <Tab label="Mostrar propostas de lojas para fazer parceria" />
            <Tab label="Listar lojas parceiras" />
          </Tabs>
        </Paper>
      </GridItem>
    </GridContainer>
  );
}
