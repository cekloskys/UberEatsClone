import React from 'react';
import { View, Text, Image } from 'react-native';
import styles from './styles';

const Header = ({restaurant}) => {

  return (
    <View style={styles.page}>
        <Image 
            source={{uri: restaurant.image}} 
            style={styles.image} />
        <View style={styles.container}>
            <Text style={styles.title}>{restaurant.name}</Text>
            <Text style={styles.subtitle}>
                $ {restaurant.deliveryFee} &#8226; {restaurant.minDeliveryTime}-{restaurant.maxDeliveryTime} minutes
            </Text>
            <Text style={styles.menu}>Menu</Text>
        </View> 
    </View>
  );
};

export default Header;