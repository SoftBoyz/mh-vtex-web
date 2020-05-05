import React, { Component } from 'react';
import firebaseApi, {fbAuth, fbDatabase} from '../services/firebase.conf';
import OrderList from './user/OrderList'

class User extends Component {
    constructor(props) {
        super(props);
        console.log("ahdgasdhksa")
        this.state = {
            pedidos: []
        } 
    }

    async componentDidMount() {
        const pedidos = []
        var query = firebaseApi.database().ref('orders');
        await query.once("value", snapshot => {
            // console.log("pedidos")
            snapshot.forEach(child => {
                pedidos.push(child.val())

            });
            console.log(pedidos)
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