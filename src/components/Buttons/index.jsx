import React, { Component } from 'react';
import NextSlideButton from '../NextSlideButton';
import PrevSlideButton from '../PrevSlideButton';
import PlayPauseButton from '../PlayPauseButton';
import styles from './../Slides/Slides.module.scss';

export class Buttons extends Component {
  constructor (props) {
    super(props);

    this.state = {};
  }

  render () {
    const {
      props: { isGoing },
      showNextSlide,
      showPrevSlide,
      slideCarousel,
    } = this.props;

    return (
      <div className={styles.buttonContainer}>
        <PrevSlideButton clickHandler={showPrevSlide} />
        <PlayPauseButton isGoing={isGoing} clickHandler={slideCarousel} />
        <NextSlideButton clickHandler={showNextSlide} />
      </div>
    );
  }
}

export default Buttons;
