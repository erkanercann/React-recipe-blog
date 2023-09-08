import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import database from '../firebase/firebaseConfig';
import { GoChevronRight } from 'react-icons/go';

function DetailPage() {
    const [data, setData] = useState({});

    const { category, id } = useParams();

    useEffect(() => {
        database
            .ref(`recipes/${category}/${id}`)
            .once('value')
            .then((snapshot) => {
                setData(snapshot.val());
            });
    }, [category, id]);

    const renderIngredients = () => {
        if (data.ingredients && data.ingredients.length > 0) {
            return (
                <ul>
                    {data.ingredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            );
        }
        return null;
    };

    const content = category && (
        <div className="recipe">
            <div className="recipe-date">{data.date}</div>
            <img src={data.thumb} className="recipe-image" alt="recipe-img" />
            <div className="recipe-body">
                <h2 className="recipe-body__title">{data.title}</h2>
                <div>{data.area}</div>
                <p className="recipe-body__category">Category : {data.category}</p>
                <div className="recipe-body__ingredients">
                    <span>Ingredients</span>
                    <div>
                        {renderIngredients()}
                        <iframe
                            src={data.youtube}
                            title={data.title}
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                    </div>
                </div>
                <div className="recipe-body__instructions">
                    <h3>Instructions</h3>
                    {data.instructions}
                </div>
            </div>
        </div>
    );

    return (
        <div className="recipe-details">
            <div className="recipe-details__actions">
                <Link to="/" className="go-to-homepage">
                    Homepage
                </Link>
                <Link to={`/${category}`} className="go-to-category">
                    {category}
                    <GoChevronRight />
                </Link>
            </div>
            {content}
        </div>
    );
}
export default DetailPage;
