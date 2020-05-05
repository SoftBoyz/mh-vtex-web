import React, { Component } from 'react';
import firebaseApi, {fbAuth, fbDatabase} from '../services/firebase.conf';
import OrderList from './user/OrderList'

class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pedidos: []
        } 
    }

    async componentDidMount() {
        const pedidos = []
        var query = firebaseApi.database().ref('orders');
        await query.once("value", snapshot => {
            snapshot.forEach(child => {
                pedidos.push(child.val())

            });
            this.setState({pedidos});
        })
    }

    render() {
        
        return(
            <div>
                <OrderList orders={this.state.pedidos}> </OrderList>
            </div>
     
        );
    }
}

export default User;