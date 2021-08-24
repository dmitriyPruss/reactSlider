/**
 *
 * @param {import('react').BaseSyntheticEvent} e - SyntheticBaseEvent
 */
export function showNext () {
  const { currentSlides, slides } = this.state;
  if (slides.length - 1 > currentSlides[currentSlides.length - 1]) {
    this.stopCarousel();

    const newCurrentSlides = [...currentSlides];
    for (let i = 0; i < newCurrentSlides.length; i++) {
      newCurrentSlides[i]++;
    }

    this.setState({ currentSlides: newCurrentSlides });
  } else {
    return;
  }
}

/**
 *
 * @param {import('react').BaseSyntheticEvent} e - SyntheticBaseEvent
 */
export function showPrev () {
  if (this.state.currentSlides[0] > 0) {
    this.stopCarousel();
    const newCurrentSlides = [...this.state.currentSlides];

    for (let i = newCurrentSlides.length - 1; i >= 0; i--) {
      newCurrentSlides[i]--;
    }

    this.setState({ currentSlides: newCurrentSlides });
  } else {
    return;
  }
}

/**
 *
 * @param {import('react').BaseSyntheticEvent} e - SyntheticBaseEvent
 */
export function runCarousel () {
  const { rangeValue } = this.props;

  const newSlides = [...this.state.slides];

  const goingPromise = new Promise(resolve => {
    this.setState(state => ({
      isGoing: !state.isGoing,
    }));

    setTimeout(() => resolve(true));
  });

  goingPromise.then(() => {
    const { isGoing, timer } = this.state;

    isGoing
      ? this.setState({
          timer: setInterval(() => {
            const { currentSlides, slides } = this.state;
            if (slides.length - 1 > currentSlides[currentSlides.length - 1]) {
              const newCurrentSlides = [...currentSlides];
              for (let i = 0; i < newCurrentSlides.length; i++) {
                newCurrentSlides[i]++;
              }

              this.setState({ currentSlides: newCurrentSlides });
            } else {
              this.setState({ isGoing: !isGoing });
              return;
            }
          }, rangeValue * 1000),
        })
      : this.stopCarousel();
  });
}
