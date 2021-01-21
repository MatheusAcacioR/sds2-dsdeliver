import React, { useEffect, useState } from 'react'
import { Image, Text, View, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native'
import { RectButton, TouchableWithoutFeedback } from 'react-native-gesture-handler'
import { fetchOrders } from '../api'
import Header from '../Header'
import OrderCard from '../OrderCard'
import { Order } from '../types';

function Orders() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true)
        fetchOrders()
        .then(response => setOrders(response.data))
        .catch(() => Alert.alert("Can not loading Orders"))
        .finally(() => setIsLoading(false))
    }, []);

    return(
        <>
            <Header />
            <ScrollView style={styles.container}>
                {isLoading ? (
                    <>
                    <View style={styles.containerLoading}>
                        <ActivityIndicator 
                            size='large'
                            color='#DA5C5C'
                        />
                    <Text>Buscando pedidos...</Text>
                    </View>
                    </>
                ) : (
                    orders.map(order => (
                        <TouchableWithoutFeedback key={order.id}>
                            <OrderCard order={order}/>
                        </TouchableWithoutFeedback>
                    ))
                )}
            </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingRight: '5%',
        paddingLeft: '5%',
    },
    
    containerLoading: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default Orders;