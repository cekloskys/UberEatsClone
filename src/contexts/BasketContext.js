import { createContext, useState, useEffect, useContext } from "react";
import { DataStore } from "aws-amplify";
import { Basket, BasketDish, Dish } from "../models";
import { useAuthContect } from "./AuthContext";

const BasketContext = createContext({});

const BasketContextProvider = ({children}) => {

    const {dbUser} = useAuthContect();
    const [restaurant, setRestaurant] = useState(null);
    const [basket, setBasket] = useState(null);
    const [basketDishes, setBasketDishes] = useState([]);
    const [finalBasketDishes, setFinalBasketDishes] = useState([]);

    const totalPrice = finalBasketDishes.reduce(
        (sum, finalBasketDish) => sum + finalBasketDish.quantity * finalBasketDish.Dish.price,
        restaurant?.deliveryFee
    );

    useEffect(() => {
        // query all dishes
        const fetchDishes = async () => {                      
            const dishes = await DataStore.query(Dish);

            // assign the products to the cart items
            setFinalBasketDishes( 
                basketDishes.map(basketDish => ({
                ...basketDish, 
                Dish: dishes.find(d => d.id == basketDish.basketDishDishId),
            }))
            ); 
        };        
        fetchDishes();          
    }, [basketDishes]);

    const getBasket = async () => {
        const results = await DataStore.query(Basket, 
            (b) => b.and(b => [
                b.restaurantID.eq(restaurant.id),
                b.userID.eq(dbUser.id)
            ]));
        setBasket(results[0]);
    }

    useEffect(() => {
        getBasket();
    }, [dbUser, restaurant]);

    useEffect(() => {
        if (basket) {
            DataStore.query(BasketDish, (bd) =>
                bd.basketID.eq(basket.id)).then(setBasketDishes);
        }
    }, [basket]);

    const addDishToBasket = async (dish, quantity) => {
        // get current basket or create a new basket
        let currentBasket = basket || (await createNewBasket());
        // save basket dish
        const newDish = await DataStore.save(new BasketDish({
            quantity,
            Dish: dish,
            basketID: currentBasket.id,
        }));
        setBasketDishes([...basketDishes, newDish]);
    };

    const createNewBasket = async () => {
        const newBasket = await DataStore.save(new Basket({
            userID: dbUser.id,
            restaurantID: restaurant.id
        }));
        setBasket(newBasket);
        return newBasket;
    };

    return (
        <BasketContext.Provider value={{addDishToBasket, setRestaurant, basket, basketDishes, restaurant, finalBasketDishes, totalPrice}}>
            {children}
        </BasketContext.Provider>
    );
};

export default BasketContextProvider;

export const useBasketContext = () => useContext(BasketContext);