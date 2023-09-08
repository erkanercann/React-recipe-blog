import React, { useContext, useReducer } from 'react';
// import database from '../firebase/firebaseConfig';
import { Link, useNavigate } from 'react-router-dom';
import recipesContext from '../context/recipes';

const reducer = (state, action) => {
    switch (action.type) {
        case 'email':
            return {
                ...state,
                email: action.value.toLowerCase(),
            };
        case 'password':
            return {
                ...state,
                password: action.value,
            };
        case 'showAlert':
            return {
                ...state,
                showAlert: action.value,
            };
        case 'form':
            return {
                ...state,
                email: '',
                password: '',
            };
        default:
            return state;
    }
};
function LoginPage() {
    // const [users, setUsers] = useState([]);
    const [state, dispatch] = useReducer(reducer, {
        email: '',
        password: '',
        showAlert: false,
    });

    const { setLogin, users } = useContext(recipesContext);

    const navigate = useNavigate();

    const handleChange = (e) => {
        dispatch({
            type: e.target.name,
            value: e.target.value,
        });
    };
    const handleSubmit = (e) => {
        e.preventDefault();

        users.forEach((user) => {
            if (state.email === user.email && state.password === user.password) {
                navigate('/management');
                setLogin(true);
            } else {
                dispatch({
                    type: 'showAlert',
                    value: true,
                });
                dispatch({
                    type: 'form',
                });

                setTimeout(() => {
                    dispatch({
                        type: 'showAlert',
                        value: false,
                    });
                }, 2000);
            }
        });
    };

    return (
        <div className="login-page">
            <Link to="/" className="go-to-homepage">
                Homepage
            </Link>
            {state.showAlert && (
                <div className={`login-alert ${state.showAlert ? 'show' : ''}`}>
                    You do not have permission.
                </div>
            )}
            <div className="container">
                <div className="login">
                    <form noValidate onSubmit={handleSubmit} className="login-form">
                        <input
                            // autoComplete="off"
                            name="email"
                            onChange={handleChange}
                            value={state.email}
                            type="email"
                            className="login-email"
                            placeholder="Email"
                        />
                        <input
                            name="password"
                            onChange={handleChange}
                            value={state.password}
                            type="password"
                            className="login-password"
                            placeholder="Password"
                        />
                        <button type="submit" className="login-button">
                            Login
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
export default LoginPage;
