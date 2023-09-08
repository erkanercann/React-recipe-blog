import React, { Fragment, useContext, useReducer, useState } from 'react';
import useRecipes from '../hooks/use-recipes';
import recipesContext from '../context/recipes';
import { Link } from 'react-router-dom';
import { LuChefHat } from 'react-icons/lu';
import { BsSearch, BsLink45Deg } from 'react-icons/bs';
import { GoChevronLeft, GoChevronRight } from 'react-icons/go';

const reducer = (state, action) => {
    switch (action.page) {
        case 1:
            return {
                ...state,
                start: 0,
                end: 3,
            };
        case 2:
            return {
                ...state,
                start: 3,
                end: 6,
            };
        case 3:
            return {
                ...state,
                start: 6,
                end: 9,
            };
        case 4:
            return {
                ...state,
                start: 9,
                end: 12,
            };
        case 5:
            return {
                ...state,
                start: 12,
                end: 15,
            };
        default:
            return state;
    }
};

export default function RecipeList() {
    const [category, setCategory] = useState('Starter');
    const recipes = useRecipes(category);
    const { links, handleChangeImage } = useContext(recipesContext);

    const itemsPerPage = 3;
    const totalPages = Math.ceil(recipes.length / itemsPerPage);
    const [currentPage, setCurrentPage] = useState(1);
    const [state, dispatch] = useReducer(reducer, {
        start: 0,
        end: 3,
    });

    const handleClick = (category) => {
        setCategory(category);
        dispatch({
            page: 1,
        });
        setCurrentPage(1);
    };

    const renderedLinks = links.map((link) => {
        return (
            <Fragment key={link.label}>
                <button
                    className={`recipes-aside__button ${
                        category === link.label ? 'active' : ''
                    }`}
                    onClick={() => handleClick(link.category)}
                >
                    {link.label}
                    {category === link.label && <LuChefHat />}
                </button>
            </Fragment>
        );
    });

    const handlePaginationButtons = (page) => {
        dispatch({
            page,
        });
        setCurrentPage(page);
    };

    const renderedPaginationButtons = () => {
        const buttons = [];

        for (let i = 1; i <= totalPages; i++) {
            buttons.push(
                <Fragment key={i}>
                    <button
                        className={`pagination-button ${
                            currentPage === i ? 'active' : ''
                        }`}
                        onClick={() => handlePaginationButtons(i)}
                    >
                        {i}
                    </button>
                </Fragment>
            );
        }
        return buttons;
    };

    const renderedRecipes = recipes.map((recipe, index) => {
        if (state.start <= index && index < state.end) {
            return (
                <div key={recipe.id} className="recipe">
                    <Link to={`${category}/${recipe.id}`}>
                        <img
                            className="recipe__image"
                            src={recipe.thumb}
                            alt="recipe-img"
                        />
                    </Link>
                    <div className="recipe-action">
                        <BsSearch
                            onClick={() => handleChangeImage(recipe.thumb)}
                            className="search"
                        />

                        <Link to={`${category}/${recipe.id}`}>
                            <BsLink45Deg />
                        </Link>
                    </div>
                    <div className="recipe__title">{recipe.title.slice(0, 20)}..</div>
                </div>
            );
        } else return null;
    });

    return (
        <div id="recipes">
            <div className="recipes container">
                <span>
                    <GoChevronLeft />
                    Recipes
                    <GoChevronRight />
                </span>
                <aside className="recipes-aside">
                    <p className="recipes-aside__title">Categories</p>
                    {renderedLinks}
                </aside>
                <div className="recipes-show">{renderedRecipes}</div>
                <div className="pagination">{renderedPaginationButtons()}</div>
            </div>
        </div>
    );
}
