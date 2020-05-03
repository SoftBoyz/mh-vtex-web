import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import firebase from '../services/firebase.conf';
import { Link } from 'react-router-dom';

import OrderList from './user/OrderList'
// import ProductList from './user/ProductList'

const produtos = [
  { 
    id: 912839812,
    name: 'Maçã', 
    price: 2.23, 
    stock: 487, 
    cold: false,
    countable: true,
    weight: null
  },
  {
    id: 912839812,
    name: 'Banana',
    price: 1.43, 
    stock: 2387, 
    cold: false,
    countable: true,
    weight: null
  }
];

export const pedidos = [
    {
        id: "1",
        status: "aprovado",
        cart: [
            {
                item: {
                    name: "Banana", 
                    price: 2.5
                },
                qnt: 3
            },
            {
                item: {
                    name: "Maçã", 
                    price: 1
                },
                qnt: 6
            }
        ],
        total: 13.5
    },
    {
        id: "2",
        status: "aprovado",
        cart: [
            {
                item: {
                    name: "Chocolate", 
                    price: 12
                },
                qnt: 2
            },
            {
                item: {
                    name: "Suco", 
                    price: 3
                },
                qnt: 3
            }
        ],
        total: 33
    }
];

class User extends Component {
    constructor(props) {
        super(props);
    
    }

    render() {
        
        return(
            <div>
            
                {/* <Menu > </Menu> */}
    
                <OrderList orders={pedidos}> </OrderList>
                {/* <ProductList products={produtos}></ProductList> */}
            </div>
     
        );
    }
}


export default User;