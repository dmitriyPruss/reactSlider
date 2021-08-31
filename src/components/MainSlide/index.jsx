import React, { Component } from 'react';
import { withTheme } from './../HOCs';
import constants from '../../constants';
import { showMainItem } from '../../viewFuncs';
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
   * @param {object} obj
   */
  strRender (obj) {
    const { name, price, image } = obj;

    this.setState({
      mainName: '',
      mainPrice: '',
      mainImage: constants.MAIN_IMAGE,
    });

    const timeout = constants.DEFAULT_TIMEOUT;
    const showImg = showMainItem.bind(this, 'mainImage', image, timeout);
    const showName = showMainItem.bind(this, 'mainName', name, timeout / 2);
    const showPrice = showMainItem.bind(this, 'mainPrice', price, timeout / 2);

    const strPromise = async () => {
      const res = await showImg();
      return res;
    };

    strPromise()
      .then(async result => {
        const { mainName } = this.state;
        const res = await showName();
      })
      .then(async result => {
        const { mainPrice } = this.state;
        const res = await showPrice();
      });
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
    this.strRender(this.props.slide);
  }

  /**
   *
   * @param {object} prevProps
   * @param {object} prevState
   */
  componentDidUpdate (prevProps, prevState) {
    if (this.props.slide.name !== prevProps.slide.name) {
      this.strRender(this.props.slide);
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
