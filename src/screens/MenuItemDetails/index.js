import React, { useState, useEffect } from 'react';
import { View, Text, Pressable, ActivityIndicator } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { DataStore } from 'aws-amplify';
import { Dish } from '../../models';
import {AntDesign} from '@expo/vector-icons';
import styles from './styles';
import { useBasketContext } from '../../contexts/BasketContext';

const MenuItemDetailsScreen = () => {

    const navigation = useNavigation();
    const route = useRoute();
    const id = route.params?.id;
    const [dish, setDish] = useState([]);

    const [quantity, setQuantity] = useState(1);

    const {addDishToBasket} = useBasketContext();

    useEffect(() => {
        DataStore.query(Dish, id).then(setDish);
    }, []);

    const onMinus = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        } 
    };

    const onPlus = () => {
        setQuantity(quantity + 1);
    };

    const getTotalPrice = () => {
        return dish.price * quantity;
    };

    const onPress = async () => {
        await addDishToBasket(dish, quantity);
        navigation.goBack();
    };

    if (!dish) {
        return (
          <ActivityIndicator color='grey' />
        );
    }

  return (
    <View style={styles.page}>
        <Text style={styles.name}>{dish.name}</Text>
        <Text style={styles.description}>{dish.description}</Text>
        <View style={styles.separator}></View>
        <View style={styles.row}>
            <AntDesign
                name='minuscircleo'
                size={60}
                color='black'
                onPress={onMinus}
            />
            <Text style={styles.quantity}>{quantity}</Text>
            <AntDesign
                name='pluscircleo'
                size={60}
                color='black'
                onPress={onPlus}
            />
        </View>
        <Pressable style={styles.button} onPress={onPress}>
            <Text style={styles.buttonText}>Add {quantity} To Basket &#8226; $ {getTotalPrice().toFixed(2)}</Text>
        </Pressable>
    </View>
  );
};

export default MenuItemDetailsScreen;