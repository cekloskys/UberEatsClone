import { createContext, useContext, useState, useEffect } from "react";
import { DataStore } from "aws-amplify";
import { Order, OrderDish, Basket, Restaurant, BasketDish, Dish } from '../models';
import { useAuthContect } from "./AuthContext";
import { useBasketContext } from "./BasketContext";

const OrderContext = createContext({});

const OrderContextProvider = ({children}) => {
    const {dbUser} = useAuthContect();
    const {restaurant, totalPrice, finalBasketDishes, basket} = useBasketContext();

    const [orders, setOrders] = useState([]);
    const [finalOrders, setFinalOrders] = useState([]);
    const [finalOrderDishes, setFinalOrderDishes] = useState([]);

    useEffect(() => {
        DataStore.query(Order, o => o.userID.eq(dbUser.id)).then(setOrders);
    }, [dbUser]);

    useEffect(() => {
        // query all dishes
        const fetchRestaurants = async () => {                      
            const restaurants = await DataStore.query(Restaurant);

            // assign the products to the cart items
            setFinalOrders( 
                orders.map(order => ({
                ...order, 
                Restaurant: restaurants.find(r => r.id == order.orderRestaurantId),
            }))
            ); 
        };        
        fetchRestaurants();          
    }, [orders]);

    const createOrder = async () => {
        // create the order
        const newOrder = await DataStore.save(new Order({
            userID: dbUser.id,
            Restaurant: restaurant,
            status: 'NEW',
            total: totalPrice,
        }));
        // add all basketdishes to the order
        await Promise.all(finalBasketDishes.map(basketDish => 
            DataStore.save(new OrderDish({
                quantity: basketDish.quantity,
                orderID: newOrder.id,
                Dish: basketDish.Dish,
            })
        )));

        // delete the basket
        await DataStore.delete(BasketDish, bd => bd.basketID.eq(basket.id));
        await DataStore.delete(Basket, b => b.id.eq(basket.id));

        // PROBLEM - dishes are getting deleted to when basket dishes 
        // are deleted

        setOrders([...orders, newOrder]);
    };

    const getOrder = async (id) => {
        const order = await DataStore.query(Order, id);
        const orderDishes = await DataStore.query(OrderDish, (od) =>
            od.orderID.eq(id));
        const dishes = await DataStore.query(Dish);

        setFinalOrderDishes( 
            orderDishes.map(orderDish => ({
                ...orderDish, 
                Dish: dishes.find(d => d.id == orderDish.orderDishDishId),
            }))
        ); 
        const orderRestaurant = await DataStore.query(Restaurant, (r) =>
            r.id.eq(order.orderRestaurantId));
        return {...order, dishes: finalOrderDishes, Restaurant: orderRestaurant};
    };

    return (
        <OrderContext.Provider value={{createOrder, orders, finalOrders, getOrder}}>
            {children}
        </OrderContext.Provider>
    );
};

export default OrderContextProvider;

export const useOrderContext = () => useContext(OrderContext);