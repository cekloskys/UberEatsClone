import React from 'react';
import { View, Text, FlatList, Pressable } from 'react-native';
import styles from './styles';
import BasketItem from '../../components/BasketItem';
import { useBasketContext } from '../../contexts/BasketContext';
import { useOrderContext } from '../../contexts/OrderContext';
import { useNavigation } from '@react-navigation/native';

const BasketScreen = () => {

    const {restaurant, finalBasketDishes, totalPrice} = useBasketContext();
    const {createOrder} = useOrderContext();
    const navigation = useNavigation();

    const onCreateOrder = async () => {
        await createOrder();
        navigation.navigate('Orders');
    }

  return (
    <View style={styles.page}>
        <Text style={styles.name}>{restaurant.name}</Text>
        <Text style={{fontSize: 18,}}>Your Items</Text>
        <FlatList 
            data={finalBasketDishes}
            renderItem={({item}) => <BasketItem basketDish={item} />}
        />
        <View style={styles.separator}></View>
        <View style={styles.row}>
            <Text style={{fontWeight: '600', color: 'grey'}}>Total</Text>
            <Text style={{marginLeft: 'auto', color: 'grey'}}>$ {totalPrice.toFixed(2)}</Text>
        </View>
        <Pressable style={styles.button} onPress={onCreateOrder}>
            <Text style={styles.buttonText}>Create Order</Text>
        </Pressable>
    </View>
  );
};

export default BasketScreen;