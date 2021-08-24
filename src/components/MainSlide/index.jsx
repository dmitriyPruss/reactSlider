import React, { Component } from 'react';
import { withTheme } from './../HOCs';
import { strRender } from '../../viewFuncs';
import styles from './../Slides/Slides.module.scss';

class MainSlide extends Component {
  constructor (props) {
    super(props);

    this.state = {
      isFullscreen: false,
      mainImage: '',
      mainName: '',
      mainPrice: '',
    };
  }

  /**
   *
   * @param {import('react').BaseSyntheticEvent} e - SyntheticBaseEvent
   */
  makeFullscreen = e => {
    const { isFullscreen } = this.state;
    const { stopCarousel } = this.props;

    stopCarousel();

    this.setState({ isFullscreen: !isFullscreen });
  };

  componentDidMount () {
    strRender.call(this, this.props.slide);
  }

  /**
   *
   * @param {object} prevProps
   * @param {object} prevState
   */
  componentDidUpdate (prevProps, prevState) {
    if (this.props.slide.name !== prevProps.slide.name) {
      strRender.call(this, this.props.slide);
    }
  }

  render () {
    const { mainName, mainImage, mainPrice } = this.state;
    const { theme, index } = this.props;

    return (
      <>
        <li
          className={
            theme === 'forest'
              ? styles.mainSliderItemForest
              : styles.mainSliderItemSky
          }
        >
          <img
            onClick={this.makeFullscreen}
            className={
              this.state.isFullscreen ? styles.fullScreen : styles.mainImg
            }
            src={mainImage}
            alt={`Img ${index + 1}`}
          />
          <p>{mainName}</p>
          <p>{mainPrice}</p>
        </li>
      </>
    );
  }
}

export default withTheme(MainSlide);
