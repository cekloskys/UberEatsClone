import { createStackNavigator } from "@react-navigation/stack";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from '../screens/HomeScreen';
import RestaurantDetailsScreen from '../screens/RestaurantDetails';
import MenuItemDetailsScreen from '../screens/MenuItemDetails';
import BasketScreen from '../screens/BasketScreen';
import OrdersScreen from '../screens/OrdersScreen';
import OrderDetailsScreen from '../screens/OrderDetailsScreen';
import { Foundation, FontAwesome5, MaterialIcons } from '@expo/vector-icons';

const Stack = createStackNavigator();

const RootNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false,
        }}>
            <Stack.Screen name="HomeTabs" component={HomeTabs}/>
        </Stack.Navigator>
    );
};

const Tab = createMaterialBottomTabNavigator();

const HomeTabs = () => {

    return (
        <Tab.Navigator barStyle={{backgroundColor: 'white'}}>
            <Tab.Screen 
                name="Home" 
                component={HomeStackNavigator} 
                options={{
                    tabBarIcon: ({color}) => <Foundation name="home" size={24} color={color} />,
                }}
            />
            <Tab.Screen 
                name="Your Orders" 
                component={OrdersStackNavigator} 
                options={{
                    tabBarIcon: ({color}) => <MaterialIcons name="list-alt" size={24} color={color} />,
                }}
            />
            <Tab.Screen 
                name="Profile" 
                component={OrdersScreen} 
                options={{
                    tabBarIcon: ({color}) => <FontAwesome5 name="user-alt" size={24} color={color} />,
                }}
            />
        </Tab.Navigator>
    );
};

const HomeStack = createStackNavigator();

const HomeStackNavigator = () => {
    return (
        <HomeStack.Navigator>
            <HomeStack.Screen name="Restaurants" component={HomeScreen} />
            <HomeStack.Screen name="Restaurant" component={RestaurantDetailsScreen} />
            <HomeStack.Screen name="Menu Item" component={MenuItemDetailsScreen} />
            <HomeStack.Screen name="Basket" component={BasketScreen} />
        </HomeStack.Navigator>   
    );
};

const OrdersStack = createStackNavigator();

const OrdersStackNavigator = () => {
    return (
        <OrdersStack.Navigator>
            <OrdersStack.Screen name="Orders" component={OrdersScreen} />
            <OrdersStack.Screen name="Order" component={OrderDetailsScreen} />
        </OrdersStack.Navigator>   
    );
};

export default RootNavigator;