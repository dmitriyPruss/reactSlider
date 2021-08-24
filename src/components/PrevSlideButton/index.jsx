import React from 'react';
import { withTheme } from '../HOCs';
import constants from './../../constants';
import styles from './../Slides/Slides.module.scss';

/**
 *
 * @param {object} props
 * @returns JSX.Element
 */
function PrevSlideButton (props) {
  const { theme, clickHandler } = props;

  const prevButton = constants.PREVIOUS_BUTTON;

  return (
    <input
      onClick={clickHandler}
      className={theme === 'forest' ? styles.buttonForest : styles.buttonSky}
      type='image'
      src={prevButton}
      alt='PrevButton'
    />
  );
}

export default withTheme(PrevSlideButton);
