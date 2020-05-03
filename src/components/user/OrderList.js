import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ListSubheader from '@material-ui/core/ListSubheader';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import CallReceivedIcon from '@material-ui/icons/CallReceived';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import Checkbox from '@material-ui/core/Checkbox';
import ControlCameraIcon from '@material-ui/icons/ControlCamera';
import LocalShippingRoundedIcon from '@material-ui/icons/LocalShippingRounded';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

export default function OrderLists(props) {
  const classes = useStyles();

  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
    {
      props.orders.map((pedido, i) => {
        return (<Order key={i} pedido={pedido} st={classes}> </Order>);
      }) 
    }
      
    </List>
  );
}

class Order extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      open: false,
      checked: props.pedido.cart.map(() => false),
      allChecked: false
    }
  }

  handleClick = () => {
    this.setState({open: !this.state.open});
  }

  handleToggle = (i) => {
    const newChecked = this.state.checked.slice();

    newChecked[i] = !newChecked[i];

    let flag = true;
    for(let i = 0; i < newChecked.length; i++) {
      if(!newChecked[i]) {
        flag = false;
        break;
      }
    }

    this.setState({
      checked: newChecked, 
      allChecked: flag
    });
  }

  render() {
    return (
      <div>
      
      <ListItem button onClick={this.handleClick}>
        <ListItemIcon>
          {this.state.allChecked ? <LocalShippingRoundedIcon /> : <CallReceivedIcon />}
        </ListItemIcon>

        <ListItemText primary={"Pedido "+ this.props.pedido.id} secondary={"Total: R$ " + this.props.pedido.total.toFixed(2).toString() + " (" + this.props.pedido.status+ ")" } />
        {this.state.open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      
      {
        this.props.pedido.cart.map((product, i) => {
          
          return(
            <Collapse key={i} in={this.state.open} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
              
                <ListItem 
                  button 
                  className={this.props.st.nested} >
                  
                  <ListItemIcon>
                    <ControlCameraIcon 
                    onClick={() => {
                      alert("redirect to product page");
                      // todo: redirect to product page
                    }} 
                    />
                  </ListItemIcon>
                
                  <ListItemText primary={product.item.name} secondary={"R$ " + product.item.price.toFixed(2).toString() + " (Qnt: " + product.qnt.toString()+")"}/>
                  
                  <ListItemSecondaryAction>
                    <Checkbox
                      onClick={() => this.handleToggle(i)} 
                      color="primary"
                      edge="end"
                      checked={this.state.checked[i]}
                    />
                  </ListItemSecondaryAction>

                </ListItem>
              </List>
            </Collapse>  
          );
        })
      }
 
      </div>
    );
  }
}


