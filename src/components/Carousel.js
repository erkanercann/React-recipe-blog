import { useEffect, useState } from 'react';
import CarouselItem from './CarouselItem';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';
import { LuChefHat } from 'react-icons/lu';

function Carousel() {
    const [showImage, setShowImage] = useState('Dessert');

    const categories = ['Pasta', 'Chicken', 'Dessert', 'Vegetarian', 'Breakfast'];

    useEffect(() => {
        if (window.innerWidth <= 1095) {
            setShowImage('Chicken');
        }

        const handler = () => {
            if (window.innerWidth <= 1095) {
                setShowImage('Chicken');
            } else {
                setShowImage('Dessert');
            }
        };

        window.addEventListener('resize', handler);

        return () => {
            window.removeEventListener('resize', handler);
        };
    }, []);

    const handleClick = (direction) => {
        const currentIndex = categories.indexOf(showImage);
        let newIndex;
        if (direction === 'up') {
            newIndex = (currentIndex - 1 + categories.length) % categories.length;
        } else if (direction === 'down') {
            newIndex = (currentIndex + 1) % categories.length;
        }
        setShowImage(categories[newIndex]);
    };

    const renderedItems = categories.map((category) => {
        return <CarouselItem key={category} isShow={showImage} category={category} />;
    });

    return (
        <div className="carousel">
            <h1 className="carousel-title">Popular Recipes</h1>
            <div className="carousel-separator">
                <div>
                    <LuChefHat />
                </div>
            </div>
            <div className="container">
                {renderedItems}

                <div className="carousel-controls">
                    <GoChevronUp onClick={() => handleClick('up')}></GoChevronUp>
                    <GoChevronDown onClick={() => handleClick('down')}></GoChevronDown>
                </div>
            </div>
        </div>
    );
}

export default Carousel;
