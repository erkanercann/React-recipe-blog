import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import useRecipes from '../hooks/use-recipes';

function CarouselItem({ category, isShow }) {
    const items = useRecipes(category);

    const renderedItems = items.map((item, index) => {
        if (index === 1) {
            return (
                <Fragment key={item.id}>
                    <Link
                        to={`${category}/${item.id}`}
                        className="carousel-item__image-wrapper"
                    >
                        <img src={item.thumb} alt="recipe-img" />
                        <div className="carousel-item__title">{item.title}</div>
                    </Link>
                </Fragment>
            );
        } else return null;
    });

    return (
        <div className={`carousel-item ${isShow === category ? 'active' : ''}`}>
            {renderedItems}
        </div>
    );
}

export default CarouselItem;
