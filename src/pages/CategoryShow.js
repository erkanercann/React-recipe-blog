import { Link, useParams } from 'react-router-dom';
import useRecipes from '../hooks/use-recipes';
import { useState } from 'react';
import { LuChefHat } from 'react-icons/lu';

function CategoryShow() {
    const { category } = useParams();

    const categories = [
        'Starter',
        'Vegan',
        'Breakfast',
        'Beef',
        'Vegetarian',
        'Chicken',
        'Seafood',
        'Side',
        'Lamb',
        'Dessert',
        'Miscellaneous',
    ];

    let recipes = useRecipes(category);

    const [currentPage, setCurrentPage] = useState(category); // currentPage

    const [currentPageIndex, setCurrentPageIndex] = useState(
        categories.indexOf(currentPage) //index
    );
    const [prevPage, setPrevPage] = useState(
        categories[(currentPageIndex - 1 + categories.length) % categories.length] //prevpage string
    );
    const [nextPage, setNextPage] = useState(
        categories[(currentPageIndex + 1) % categories.length] // next page string
    );

    const handleClick = (direction) => {
        if (direction === 'next') {
            const nextIndex = (currentPageIndex + 1) % categories.length;
            setCurrentPageIndex(nextIndex);
            setCurrentPage(categories[nextIndex]);
            setPrevPage(currentPage);
            setNextPage(categories[(nextIndex + 1) % categories.length]);
        } else if (direction === 'prev') {
            const prevIndex =
                (currentPageIndex - 1 + categories.length) % categories.length;
            setCurrentPageIndex(prevIndex);
            setCurrentPage(categories[prevIndex]);
            setPrevPage(
                categories[(prevIndex - 1 + categories.length) % categories.length]
            );
            setNextPage(currentPage);
        }
    };

    const renderedRecipes = recipes.map((recipe) => {
        return (
            <div key={recipe.id} className="recipe">
                <Link to={`/${recipe.category}/${recipe.id}`}>
                    <img src={recipe.thumb} alt="recipe-img" className="recipe-image" />
                    <div className="recipe-title">{recipe.title}</div>
                </Link>
            </div>
        );
    });

    return (
        <div className="category-show">
            <Link to="/" className="go-to-homepage">
                Homepage
            </Link>
            <h1 className="category-show__title">
                {currentPage}
                <div>
                    <LuChefHat />
                </div>
            </h1>

            <div className="pagination">
                <Link
                    to={`/${prevPage}`}
                    className="pagination__button"
                    onClick={() => handleClick('prev')}
                >
                    {prevPage}
                </Link>
                <Link
                    to={`/${nextPage}`}
                    className="pagination__button"
                    onClick={() => handleClick('next')}
                >
                    {nextPage}
                </Link>
            </div>
            <div className="recipes">{renderedRecipes}</div>
        </div>
    );
}
export default CategoryShow;
