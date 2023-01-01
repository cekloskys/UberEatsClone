import { useState, useEffect } from 'react';
import { FlatList, View } from 'react-native';
import { DataStore } from 'aws-amplify';
import { Restaurant } from '../../models';
import RestaurantItem from '../../components/RestaurantItem';
import styles from './styles';

const HomeScreen = () => {
  const [restaurants, setRestaurants] = useState([]);

  /* const fetchRestaurants = async () => {
    const results = await DataStore.query(Restaurant);
    setRestaurants(results);
  };*/

  useEffect(() => {
    // fetchRestaurants();
    // DataStore.query(Restaurant).then((results) => setRestaurants(results));
    DataStore.query(Restaurant).then(setRestaurants);
  }, []);

  return (
    <View style={styles.page}>
      <FlatList 
        data={restaurants} 
        renderItem={({item}) => <RestaurantItem restaurant={item}/>} 
        showsVerticalScrollIndicator={false} />
    </View>
  );
}

export default HomeScreen;