import React from 'react';
import { View, FlatList } from 'react-native';
import styles from './styles';
import Order from '../../components/Order';
import { useOrderContext } from '../../contexts/OrderContext';

const OrdersScreen = () => {

  const {finalOrders} = useOrderContext();

  return (
    <View style={{flex: 1, width: '100%'}}>
        <FlatList 
          data={finalOrders}
          renderItem={({item}) => <Order order={item} />}
        />
    </View>
  );
};

export default OrdersScreen;