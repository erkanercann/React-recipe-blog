import { useReducer, useState } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
import Dropdown from './Dropdown';
import database from '../firebase/firebaseConfig';

const reducer = (state, action) => {
    switch (action.type) {
        case 'thumb':
            return {
                ...state,
                thumb: action.value,
            };
        case 'title':
            return {
                ...state,
                title: action.value,
            };
        case 'category':
            return {
                ...state,
                category: action.value,
            };
        case 'area':
            return {
                ...state,
                area: action.value,
            };
        case 'ingredients':
            return {
                ...state,
                ingredients: action.value
                    .split('.')
                    .map((ingredient) => ingredient.trim())
                    .filter((ingredient) => ingredient.trim() !== ''),
            };
        case 'instructions':
            return {
                ...state,
                instructions: action.value,
            };
        case 'youtube':
            return {
                ...state,
                youtube: action.value,
            };
        case 'form':
            return {
                thumb: '',
                title: '',
                category: '',
                area: '',
                ingredients: [],
                instructions: '',
                youtube: '',
            };
        default:
            return state;
    }
};

function Form() {
    const [state, dispatch] = useReducer(reducer, {
        area: '',
        category: '',
        ingredients: [],
        instructions: '',
        thumb: '',
        title: '',
        youtube: '',
    });
    const [alert, setAlert] = useState('');
    const [selection, setSelection] = useState('Select');

    const handleSelection = (category) => {
        setSelection(category);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (
            state.area === '' ||
            state.category === '' ||
            state.ingredients.length === 0 ||
            state.instructions === '' ||
            state.thumb === '' ||
            state.title === '' ||
            state.youtube === ''
        ) {
            setAlert('error');
            setTimeout(() => {
                setAlert(false);
            }, 1500);
            return;
        }

        database.ref(`recipes/${state.category}`).push({
            ...state,
            date: new Date().toLocaleString(undefined, {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
            }),
        });

        dispatch({
            type: 'form',
        });

        setAlert('success');
        setSelection('Select');
        setTimeout(() => {
            setAlert(false);
        }, 1500);
    };

    const alertDiv = (text, className = '') => {
        return <div className={`alert ${className}`}>{text}</div>;
    };

    const handleChange = (e) => {
        const inputName = e.target.name;

        if (inputName === 'title') {
            dispatch({
                type: inputName,
                value: e.target.value,
            });
        } else if (inputName === 'thumb') {
            if (e.target.files.length) {
                const file = e.target.files[0];
                const reader = new FileReader();

                reader.addEventListener('load', () => {
                    dispatch({
                        type: inputName,
                        value: reader.result,
                    });
                });
                reader.readAsDataURL(file);
            }
        } else if (inputName === 'area') {
            dispatch({
                type: inputName,
                value: e.target.value,
            });
        } else if (inputName === 'ingredients') {
            dispatch({
                type: inputName,
                value: e.target.value,
            });
        } else if (inputName === 'instructions') {
            dispatch({
                type: inputName,
                value: e.target.value,
            });
        } else if (inputName === 'youtube') {
            dispatch({
                type: inputName,
                value: e.target.value,
            });
        }
    };
    const handleCategoryChange = (category) => {
        dispatch({
            type: 'category',
            value: category,
        });
    };

    return (
        <div className="new-post">
            {alert === 'error'
                ? alertDiv('Please complete all the required fields.')
                : alert === 'success'
                ? alertDiv('Submitted successfully!', 'success')
                : null}
            <form onSubmit={handleSubmit} className="post-form">
                {/* Thumb */}
                <label className="post__image-label" htmlFor="fileInput">
                    {state.thumb && (
                        <img src={state.thumb} alt="post-img" className="post-image" />
                    )}
                    <div className="icon">
                        <MdOutlineFileUpload /> Upload Image
                    </div>
                    <input
                        name="thumb"
                        onChange={handleChange}
                        type="file"
                        id="fileInput"
                    />
                </label>
                {/* Title */}
                <label>
                    <span>Title :</span>
                    <input
                        onChange={handleChange}
                        value={state.title}
                        name="title"
                        type="text"
                        placeholder="Title"
                    />
                </label>

                {/* Category */}
                <label>
                    <span>Category :</span>
                    <Dropdown
                        selection={selection}
                        onSelect={handleSelection}
                        onChange={handleCategoryChange}
                    />
                </label>
                <label>
                    {/* Cuisine */}
                    <span>Cuisine:</span>
                    <input
                        autoComplete="off"
                        value={state.area}
                        onChange={handleChange}
                        name="area"
                        type="text"
                        placeholder="Cuisine"
                    />
                </label>
                {/* Ingredients */}
                <label>
                    <span>Ingredients :</span>
                    <textarea
                        spellCheck={false}
                        onChange={handleChange}
                        name="ingredients"
                        placeholder="Ingredients"
                    />
                </label>
                <label>
                    <span>Instructions :</span>
                    <textarea
                        spellCheck={false}
                        value={state.instructions}
                        onChange={handleChange}
                        name="instructions"
                        placeholder="Instructions"
                    />
                </label>
                <label>
                    <span>Youtube Link :</span>
                    <input
                        type="text"
                        value={state.youtube}
                        onChange={handleChange}
                        name="youtube"
                        placeholder="Youtube Link"
                    />
                </label>

                <button type="submit" className="post__button">
                    Send
                </button>
            </form>
        </div>
    );
}
export default Form;
