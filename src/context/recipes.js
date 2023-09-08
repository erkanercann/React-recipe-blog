import { createContext, useEffect, useState } from 'react';
import database from '../firebase/firebaseConfig';

const recipesContext = createContext();

function RecipesProvider({ children }) {
    const [image, setImage] = useState(null);
    const [login, setLogin] = useState(false);
    const [users, setUsers] = useState([]);

    useEffect(() => {
        database.ref('recipes/login').on('value', (snapshot) => {
            const data = [];
            snapshot.forEach((user) => {
                data.push({
                    id: user.key,
                    ...user.val(),
                });
            });
            setUsers(data);
        });
    }, []);

    const handleChangeImage = (newImage) => {
        setImage(newImage);
    };

    const links = [
        { label: 'Starter', category: 'Starter' },
        { label: 'Vegan', category: 'Vegan' },
        { label: 'Breakfast', category: 'Breakfast' },
        { label: 'Beef', category: 'Beef' },
        { label: 'Vegetarian', category: 'Vegetarian' },
        { label: 'Chicken', category: 'Chicken' },
        { label: 'Seafood', category: 'Seafood' },
        { label: 'Side', category: 'Side' },
        { label: 'Lamb', category: 'Lamb' },
        { label: 'Dessert', category: 'Dessert' },
        { label: 'Miscellaneous', category: 'Miscellaneous' },
    ];

    const valueToShare = {
        links,
        image,
        handleChangeImage,
        users,
        login,
        setLogin,
    };

    return (
        <recipesContext.Provider value={valueToShare}>{children}</recipesContext.Provider>
    );
}

export default recipesContext;
export { RecipesProvider };
