import React from 'react';
import { View, Text } from 'react-native';
import styles from './styles';

const BasketItem = ({basketDish}) => {

  return (
    <View style={styles.row}>
        <View style={styles.quantityContainer}>
            <Text>{basketDish.quantity}</Text>
        </View>
        <Text style={{fontWeight: '600',}}>{basketDish.Dish.name}</Text>
        <Text style={{marginLeft: 'auto',}}>$ {basketDish.Dish.price.toFixed(2)}</Text>
    </View>
  );
};

export default BasketItem;