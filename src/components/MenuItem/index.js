import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, Pressable } from 'react-native';
import styles from './styles';

const MenuItem = ({dish}) => {

  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('Menu Item', {id: dish.id})
  };

  return (
    <Pressable style={styles.container} onPress={onPress}>
        <View style={{flex: 1,}}>
            <Text style={styles.name}>{dish.name}</Text>
            <Text style={styles.description} numberOfLines={2}>{dish.description}</Text>
            <Text style={styles.price}>$ {dish.price}</Text>
        </View>  
        {dish.image && (<Image source={{uri: dish.image}} style={styles.image} />)}      
    </Pressable>
  );
};

export default MenuItem;