import { useContext, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom';
import recipesContext from '../context/recipes';

function LightBox() {
    const { image, handleChangeImage } = useContext(recipesContext);

    const divEl = useRef();
    useEffect(() => {
        const handler = (e) => {
            if (e.target === divEl.current) {
                handleChangeImage(null);
            }
        };
        document.body.addEventListener('click', handler);
        return () => {
            document.body.removeEventListener('click', handler);
        };
    });

    return ReactDOM.createPortal(
        image && (
            <div ref={divEl} className="lightbox-background">
                <div className="lightbox-image-wrapper">
                    <img src={image} alt="lightbox-img" />;
                </div>
            </div>
        ),
        document.querySelector(`.lightbox`)
    );
}
export default LightBox;
