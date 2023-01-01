import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, Pressable } from 'react-native';
import styles from './styles';

const DEFAULT_IMAGE = 'https://notjustdev-dummy.s3.us-east-2.amazonaws.com/uber-eats/restaurant4.jpeg';

const RestaurantItem = ({restaurant}) => {

  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('Restaurant', {id: restaurant.id})
  };

  return (
    <Pressable style={styles.restaurantContainer} onPress={onPress}>
        <Image 
          source={{uri: restaurant.image.startsWith('http') ? restaurant.image : DEFAULT_IMAGE}} 
          style={styles.image} />
        <View style={styles.row}>
            <View>
                <Text style={styles.title}>{restaurant.name}</Text>
                <Text style={styles.subtitle}>
                $ {restaurant.deliveryFee.toFixed(1)} &#8226; {restaurant.minDeliveryTime}-{restaurant.maxDeliveryTime} minutes
                </Text>
            </View>
            <View style={styles.rating}>
                <Text>{restaurant.rating.toFixed(1)}</Text>
            </View>
        </View>           
    </Pressable>
  );
};

export default RestaurantItem;