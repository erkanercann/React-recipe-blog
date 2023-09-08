import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import recipesContext from '../context/recipes';
import database from '../firebase/firebaseConfig';
import { GoChevronDown, GoChevronUp } from 'react-icons/go';
import Table from '../components/Table';
import Form from '../components/Form';

function Management() {
    const [section, setSection] = useState('posts');
    const [recipes, setRecipes] = useState([]);
    const { links, handleChangeImage } = useContext(recipesContext);

    // Table
    const [sortBy, setSortBy] = useState(null);
    const [sortOrder, setSortOrder] = useState(null);

    useEffect(() => {
        const data = [];
        links.forEach((link) => {
            database.ref(`recipes/${link.category}`).on('value', (snp) => {
                snp.forEach((category) => {
                    if (category.key !== 'login') {
                        data.push(category.val());
                    }
                });
            });
            setRecipes(data);
        });
    }, [links]);

    const handleSortClick = (label) => {
        if (sortBy && sortBy !== label) {
            setSortOrder('asc');
            setSortBy(label);
            return;
        }

        if (sortOrder === null) {
            setSortOrder('asc');
            setSortBy(label);
        } else if (sortOrder === 'asc') {
            setSortOrder('dec');
            setSortBy(label);
        } else if (sortOrder === 'dec') {
            setSortOrder(null);
            setSortBy(null);
        }
    };

    let sortData = recipes;

    if (sortBy && sortOrder) {
        sortData = [...recipes].sort((a, b) => {
            const valueA = a[sortBy];
            const valueB = b[sortBy];

            const reverseOrder = sortOrder === 'asc' ? 1 : -1;
            return valueA.localeCompare(valueB) * reverseOrder;
        });
    }

    const posts = sortData.map((recipe) => {
        return (
            <tr key={recipe.title}>
                <td className="post-image">
                    <img
                        onClick={() => handleChangeImage(recipe.thumb)}
                        src={recipe.thumb}
                        alt="recipe-img"
                    />
                </td>
                <td className="post-title"> {recipe.title}</td>
                <td className="post-category"> {recipe.category}</td>
                <td className="post-date"> {recipe.date}</td>
            </tr>
        );
    });

    const icons = (label) => {
        if (sortBy === null || sortBy !== label) {
            return (
                <div>
                    <GoChevronUp />
                    <GoChevronDown />
                </div>
            );
        } else if (sortOrder === 'asc') {
            return (
                <div>
                    <GoChevronUp />
                </div>
            );
        } else if (sortOrder === 'dec') {
            return (
                <div>
                    <GoChevronDown />
                </div>
            );
        }
    };

    const content =
        section === 'posts' ? (
            <Table onClick={handleSortClick} icons={icons} posts={posts} />
        ) : (
            <Form />
        );
    const handleClick = (section) => {
        setSection(section);
    };

    return (
        <div className="management">
            <Link to="/" className="go-to-homepage">
                Homepage
            </Link>
            <div className="posts">
                <aside>
                    <button
                        className={`${section === 'new-post' ? 'active' : ''}`}
                        onClick={() => handleClick('new-post')}
                    >
                        New Post
                    </button>
                    <button
                        className={`${section === 'posts' ? 'active' : ''}`}
                        onClick={() => handleClick('posts')}
                    >
                        Posts
                    </button>
                </aside>
                {content}
            </div>
        </div>
    );
}

export default Management;
