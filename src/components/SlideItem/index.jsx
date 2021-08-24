import React from 'react';
import MainSlide from './../MainSlide';
import styles from './../Slides/Slides.module.scss';

/**
 *
 * @param {object} props
 * @returns JSX.Element || null
 */
function SlideItem (props) {
  const {
    index,
    slide: { image, id },
    info: { currentSlides },
  } = props;

  switch (index) {
    case currentSlides[0]:
    case currentSlides[4]:
      if (id === -1 || id === 0 || id === 11 || id === 12) {
        return (
          <li style={{ opacity: 0.01 }} className={styles.littleSliderItem}>
            <img
              className={styles.littleImg}
              src={image}
              alt={`Img ${index + 1}`}
            />
          </li>
        );
      } else {
        return (
          <li className={styles.littleSliderItem}>
            <img
              className={styles.littleImg}
              src={image}
              alt={`Img ${index + 1}`}
            />
          </li>
        );
      }
      break;
    case currentSlides[1]:
    case currentSlides[3]:
      if (id === 0 || id === 11) {
        return (
          <li style={{ opacity: 0.02 }} className={styles.sliderItem}>
            <img
              className={styles.commonImg}
              src={image}
              alt={`Img ${index + 1}`}
            />
          </li>
        );
      } else {
        return (
          <li className={styles.sliderItem}>
            <img
              className={styles.commonImg}
              src={image}
              alt={`Img ${index + 1}`}
            />
          </li>
        );
      }
      break;
    case currentSlides[2]:
      return <MainSlide {...props} />;
      break;
    default:
      return null;
  }
}

export default SlideItem;
