import { useEffect, useRef, useState } from 'react';
import Navbar from './Navbar';
import contentVideo from '../assets/app-video.mp4';
import { HiBars3BottomRight } from 'react-icons/hi2';
function Header() {
    const [title, setTitle] = useState('Welcome to Flavor Haven');
    const [isOpen, setIsOpen] = useState('');

    const spanRef = useRef();

    useEffect(() => {
        const interval = setInterval(() => {
            const newTitle =
                title === 'Welcome to Flavor Haven'
                    ? 'Now…who’s hungry?'
                    : 'Welcome to Flavor Haven';
            setTitle(newTitle);
        }, 4000);

        const handler = (e) => {
            if (!spanRef.current.contains(e.target)) {
                setIsOpen('');
            }
        };

        document.body.addEventListener('click', handler);

        return () => {
            clearInterval(interval);
            document.body.removeEventListener('click', handler);
        };
    }, [isOpen, title]);

    const handleClick = () => {
        if (isOpen === 'open') {
            setIsOpen('');
        } else {
            setIsOpen('open');
        }
    };

    return (
        <div className="header-main">
            <div className="bars-icon">
                <span ref={spanRef} onClick={handleClick}>
                    <HiBars3BottomRight />
                </span>
            </div>
            <Navbar isOpen={isOpen} setIsOpen={setIsOpen} />
            <div className="content-video">
                <video autoPlay muted loop>
                    <source src={contentVideo} type="video/mp4" />
                </video>
                <div className="content-video__title">{title}</div>
            </div>
        </div>
    );
}
export default Header;
