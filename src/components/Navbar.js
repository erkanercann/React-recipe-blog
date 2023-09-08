import { NavLink } from 'react-router-dom';
import { RiLoginCircleLine } from 'react-icons/ri';
import DynamicSection from './DynamicSection';
import { GoChevronDown } from 'react-icons/go';
import { ImExit } from 'react-icons/im';
import { useContext, useEffect, useRef, useState } from 'react';
import recipesContext from '../context/recipes';

function Navbar({ isOpen, setIsOpen }) {
    const [openSection, setOpenSection] = useState({});

    const [isShow, setIsShow] = useState('show');
    const { links, login, setLogin } = useContext(recipesContext);

    const navRef = useRef();

    useEffect(() => {
        const handleScroll = (e) => {
            if (window.scrollY < 300) {
                setIsShow('show');
                setIsOpen('');
            } else {
                setIsShow('');
            }
        };

        document.addEventListener('scroll', handleScroll);

        return () => {
            document.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const handleMouseOver = (category) => {
        setOpenSection((prevState) => ({
            ...prevState,
            [category]: 'active',
        }));
    };

    const handleMouseOut = (category) => {
        setOpenSection((prevState) => ({
            ...prevState,
            [category]: '',
        }));
    };

    const renderedLinks = links.map((link) => {
        return (
            <li key={link.label} className="nav-item">
                <NavLink
                    to={link.category}
                    onMouseOver={() => handleMouseOver(link.category)}
                    onMouseOut={() => handleMouseOut(link.category)}
                    className="nav-link"
                >
                    {link.label}
                    <GoChevronDown />
                </NavLink>
                <DynamicSection
                    onMouseOver={handleMouseOver}
                    onMouseOut={handleMouseOut}
                    category={link.category}
                    isOpen={openSection[link.category]}
                />
            </li>
        );
    });
    return (
        <nav ref={navRef} className={`navbar ${isShow} ${isOpen}`}>
            <div className="container">
                <ul className="nav">
                    <li className="nav-item home">
                        <NavLink to="/" className="nav-link home">
                            Home
                        </NavLink>
                    </li>
                    {renderedLinks}
                    {login ? (
                        <>
                            <li className="nav-item admin">
                                <NavLink to="/management" className="nav-link">
                                    Post Management
                                </NavLink>
                            </li>
                            <li className="nav-item exit">
                                <NavLink to="/" className="nav-link">
                                    <ImExit onClick={() => setLogin(false)} />
                                </NavLink>
                            </li>
                        </>
                    ) : (
                        <li className="nav-item login">
                            <NavLink to="/login" className="nav-link ">
                                <RiLoginCircleLine />
                            </NavLink>
                        </li>
                    )}
                </ul>
            </div>
        </nav>
    );
}
export default Navbar;
