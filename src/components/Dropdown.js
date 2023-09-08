import { useContext, useEffect, useRef, useState } from 'react';
import recipesContext from '../context/recipes';
import { GoChevronDown } from 'react-icons/go';

function Dropdown({ onChange, selection, onSelect }) {
    const { links } = useContext(recipesContext);
    const [isOpen, setIsOpen] = useState(false);
    const divEl = useRef();
    useEffect(() => {
        const handler = (e) => {
            if (!divEl.current.contains(e.target)) {
                setIsOpen(false);
            }
        };
        document.body.addEventListener('click', handler);

        return () => {
            document.body.removeEventListener('click', handler);
        };
    });

    const renderedItems = links.map((link) => {
        return (
            <div key={link.label} onClick={() => handleSelectionChange(link.category)}>
                {link.category}
            </div>
        );
    });

    const handleSelectionChange = (category) => {
        onChange(category);
        onSelect(category);
        setIsOpen(false);
    };

    const handleClick = () => {
        setIsOpen((currentIsOpen) => {
            return !currentIsOpen;
        });
    };
    return (
        <div className="dropdown">
            <div ref={divEl} onClick={handleClick} className="dropdown-title">
                {selection}
                <GoChevronDown />
            </div>
            {isOpen && <div className="dropdown-menu">{renderedItems}</div>}
        </div>
    );
}
export default Dropdown;
