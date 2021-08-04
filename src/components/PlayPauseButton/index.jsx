import React from 'react';
import { withTheme } from '../HOCs';
import classNames from 'classnames';
import configs from './../../configs';
import styles from './../Slides/Slides.module.scss';

/**
 * 
 * @param {object} props 
 * @returns JSX.Element
 */
function PlayPauseButton(props) {

    const play = configs.PLAY_BUTTON;

    const pause = configs.PAUSE_BUTTON;

    const { theme, isGoing, clickHandler, } = props;

    const isGoingButton = theme === 'forest' ? 
    classNames(styles.buttonForest, styles.runningButton) : 
    classNames(styles.buttonSky, styles.runningButton);

    return <input 
    className={ isGoing ? isGoingButton : theme === 'forest' ? styles.buttonForest : styles.buttonSky } type="image" src={isGoing ? pause : play} onClick={clickHandler} 
    alt="PlayPauseButton" />
                 
}

export default withTheme(PlayPauseButton)
