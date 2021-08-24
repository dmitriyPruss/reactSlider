import React, { Component } from 'react';
import SlideItem from './../SlideItem';
import { Buttons } from './../Buttons';
import { withTheme } from '../HOCs';
import { loadInfo } from '../../api';
import { showNext, showPrev, runCarousel } from '../../buttonFuncs';
import styles from './Slides.module.scss';

class Slides extends Component {
  constructor (props) {
    super(props);

    this.state = {
      slides: [],
      currentSlides: [0, 1, 2, 3, 4],
      error: null,
      isGoing: false,
      timer: null,
    };
  }

  /**
   *
   * @param {object} slide
   * @param {number} index
   * @returns JSX.Element
   */
  showSlides = (slide, index) => (
    <SlideItem
      key={slide.id}
      index={index}
      slide={slide}
      stopCarousel={this.stopCarousel}
      info={this.state}
    />
  );

  /**
   *
   * @param {import('react').BaseSyntheticEvent} e - SyntheticBaseEvent
   */
  stopCarousel = e => {
    if (this.state.timer) {
      clearInterval(this.state.timer);
    }
    this.setState({ timer: null });
    this.setState({ isGoing: false });
  };

  /**
   *
   *  @param {import('react').BaseSyntheticEvent} e - SyntheticBaseEvent
   */
  showNextSlide = e => showNext.apply(this);

  /**
   *
   * @param {import('react').BaseSyntheticEvent} e - SyntheticBaseEvent
   */
  showPrevSlide = e => showPrev.apply(this);

  /**
   *
   * @param {import('react').BaseSyntheticEvent} e - SyntheticBaseEvent
   */
  slideCarousel = e => runCarousel.apply(this);

  loadSlides = () => {
    const {
      info: { path },
    } = this.props;

    loadInfo(path)
      .then(data => this.setState({ slides: data }))
      .then(() => this.stopCarousel())
      .catch(err => this.setState({ error: err }));
  };

  componentDidMount () {
    this.loadSlides();
  }

  /**
   *
   * @param {object} prevProps
   * @param {object} prevState
   */
  componentDidUpdate (prevProps, prevState) {
    const {
      info: { path },
    } = this.props;

    if (path !== prevProps.info.path) {
      this.loadSlides();
    }
  }

  componentWillUnmount () {
    this.stopCarousel();
  }

  render () {
    const { slides, isGoing, isFullscreen } = this.state;

    return (
      <div
        className={
          this.props.theme === 'forest' ? styles.mainForest : styles.mainSky
        }
      >
        <h1 className={styles.header}>{this.props.info.header}</h1>
        <ul className={styles.sliderContainer}>
          {slides.map(this.showSlides)}
        </ul>
        <Buttons
          stopCarousel={this.stopCarousel}
          showNextSlide={this.showNextSlide}
          showPrevSlide={this.showPrevSlide}
          slideCarousel={this.slideCarousel}
          rangeValue={this.props.rangeValue}
          timer={this.timer}
          self={this}
          props={this.state}
        />
      </div>
    );
  }
}

export default withTheme(Slides);
