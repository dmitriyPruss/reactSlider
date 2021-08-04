import React from 'react';
import { withTheme } from '../HOCs';
import configs from './../../configs';
import styles from './../Slides/Slides.module.scss';

/**
 * 
 * @param {object} props 
 * @returns JSX.Element
 */
function NextSlideButton(props) {
    const {theme, clickHandler, } = props;

    const nextButton = configs.NEXT_BUTTON;

    return (
        <input onClick={clickHandler} className={ theme === 'forest' ? styles.buttonForest : styles.buttonSky } type="image" src={nextButton} alt="NextButton" /> 
    )
}

export default withTheme(NextSlideButton)
