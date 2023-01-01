import React, { useState, useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { View, FlatList, ActivityIndicator, Pressable, Text } from 'react-native';
import { DataStore } from 'aws-amplify';
import { Restaurant, Dish } from '../../models';
import {Ionicons} from '@expo/vector-icons';
import styles from './styles';
import MenuItem from '../../components/MenuItem';
import Header from './header';
import { useBasketContext } from '../../contexts/BasketContext';

const RestaurantDetailsScreen = () => {

  const navigation = useNavigation();
  const route = useRoute();
  const [restaurant, setRestaurant] = useState(null);
  const [dishes, setDishes] = useState([]);

  const id = route.params?.id;

  const {setRestaurant: setBasketRestaurant} = useBasketContext();
  const {basket, basketDishes} = useBasketContext();

  useEffect(() => {
    setBasketRestaurant(null);
    DataStore.query(Restaurant, id).then(setRestaurant);
    DataStore.query(Dish, (dish) => dish.restaurantID.eq(id)).then(setDishes);
  },[]);

  useEffect(() =>{  
    setBasketRestaurant(restaurant);
  }, [restaurant]);

  const onPress = () => {
    navigation.navigate('Restaurants');
  };

  const viewBasket = () => {
    navigation.navigate('Basket');
  };

  if (!restaurant) {
    return (
      <ActivityIndicator color='grey' />
    );
  }

  return (
    <View style={styles.page}>
        <FlatList 
            ListHeaderComponent={() => <Header restaurant={restaurant} />}
            data={dishes}
            renderItem={({item}) => <MenuItem dish={item} />} 
        /> 
        <Ionicons 
            name='arrow-back-circle'
            size={45}
            color='white'
            style={styles.iconContainer}
            onPress={onPress}
        />
        {basket && (
          <Pressable style={styles.button} onPress={viewBasket}>
            <Text style={styles.buttonText}>View Basket &#8226; {basketDishes.length}</Text>
          </Pressable>
        )} 
    </View>
  );
};

export default RestaurantDetailsScreen;