import React from 'react';
import MainSlide from './../MainSlide';
import styles from './../Slides/Slides.module.scss';

/**
 * 
 * @param {object} props 
 * @returns JSX.Element || null
 */
function SlideItem(props) {

    const { index, slide: {image, }, } = props;

    switch(index) {
        case 0:
        case 4:
            return (
                <li className={styles.littleSliderItem}>
                    <img
                    className={styles.littleImg} src={image} alt={`Img ${index+1}`} />
                </li>
            );
            break;
        case 1:
        case 3:
            return (
                <li className={styles.sliderItem}>
                    <img 
                    className={styles.commonImg} src={image} alt={`Img ${index+1}`} />
                </li>
            );
            break;
        case 2:
            return <MainSlide {...props} />;
            break;
        default:
            return null;         
    }
}

export default SlideItem
