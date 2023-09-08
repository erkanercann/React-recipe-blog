import { useState, useEffect } from 'react';
import database from '../firebase/firebaseConfig';

function useRecipes(category) {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        database.ref(`recipes/${category}`).on('value', (snapshot) => {
            const data = [];
            snapshot.forEach((recipe) => {
                data.push({
                    id: recipe.key,
                    ...recipe.val(),
                });
            });
            setRecipes(data);
        });
    }, [category]);

    return recipes;
}

export default useRecipes;
