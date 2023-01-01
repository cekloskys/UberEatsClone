import React, { useEffect, useState } from 'react';
import { View, Text, Image, FlatList, ActivityIndicator } from 'react-native';
import { useRoute } from '@react-navigation/native';
import styles from './styles';
import OrderItem from '../../components/OrderItem';
import { useOrderContext } from '../../contexts/OrderContext';

const OrderDetailsHeader = ({order}) => {
  return (
    <View style={styles.page}>        
        <Image 
            source={{uri: order.Restaurant[0].image}} 
            style={styles.image} />
        <View style={styles.container}>
            <Text style={styles.title}>{order.Restaurant[0].name}</Text>
            <Text style={styles.subtitle}>{order.status} &#8226; 2 days ago</Text>
            <Text style={styles.menu}>Your Orders</Text>
        </View>         
    </View>
  );
};

const OrderDetailsScreen = () => {

    const {getOrder} = useOrderContext();
    const [order, setOrder] = useState();

    const route = useRoute();
    const id = route.params?.id;

    useEffect(() => {
        getOrder(id).then(setOrder);
    }, []);

    if (!order) {
        return <ActivityIndicator color='grey' />
    }

    return (
        <View style={styles.page}>
            <FlatList 
                data={order.dishes} 
                renderItem={({item}) => <OrderItem orderDish={item} />}
                ListHeaderComponent={() => <OrderDetailsHeader order={order}/>}
            />
        </View>
    );
}

export default OrderDetailsScreen;