import { Link } from 'react-router-dom';
import useRecipes from '../hooks/use-recipes';

function DynamicSection({ category, isOpen, onMouseOver, onMouseOut }) {
    const recipes = useRecipes(category);

    const renderedRecipes = recipes.map((recipe, index) => {
        if (index < 4) {
            return (
                <div key={recipe.id} className="recipe">
                    <Link to={`${category}/${recipe.id}`}>
                        <img
                            className="recipe__image"
                            src={recipe.thumb}
                            alt="recipe-img"
                        />
                    </Link>
                    <div className="recipe__title">{recipe.title.slice(0, 30)}..</div>
                </div>
            );
        } else return null;
    });

    return (
        <div
            onMouseOut={() => onMouseOut(category)}
            onMouseOver={() => onMouseOver(category)}
            className={`content-categories ${isOpen}`}
        >
            {renderedRecipes}
        </div>
    );
}

export default DynamicSection;
