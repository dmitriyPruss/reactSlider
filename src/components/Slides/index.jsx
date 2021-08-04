import React, { Component } from 'react';
import NextSlideButton from '../NextSlideButton';
import PrevSlideButton from '../PrevSlideButton';
import PlayPauseButton from '../PlayPauseButton';
import SlideItem from './../SlideItem'
import { withTheme } from '../HOCs';
import { loadInfo } from '../../api';
import styles from './Slides.module.scss';

class Slides extends Component {
    constructor(props) {
        super(props);
    
        this.state = {
            slides: [],
            error: null,
            isGoing: false,
            isFullscreen: false,
            mainImage: '',
            mainName: '',
            mainPrice: '',
        };

        this.timer = null;
    }

    /**
     * 
     * @param {object} slide 
     * @param {number} index 
     * @returns JSX.Element
     */
    showSlides = (slide, index) => (
        <SlideItem key={slide.id} index={index} slide={slide} clickHandler={this.makeFullscreen} strRender={this.strRender} info={this.state} />
    );
    
    /**
     * 
     * @param {object} e - SyntheticBaseEvent
     */
    showNextSlide = e => {
        this.stopCarousel();

        const { slides } = this.state;
        const newSlides = [...slides];
        const lastSlide = newSlides.pop();
        newSlides.unshift(lastSlide);

        this.setState({ slides: newSlides });
    }

    /**
     * 
     * @param {object} e - SyntheticBaseEvent
     */
    showPrevSlide = e => {
        this.stopCarousel();
        
        const { slides } = this.state;
        const newSlides = [...slides];
        const firstSlide = newSlides.shift();
        newSlides.push(firstSlide);

        this.setState({ slides: newSlides });
    }

    /**
     * 
     * @param {object} e - SyntheticBaseEvent
     */
    slideCarousel = e => {

        const { slides } = this.state;
        const { rangeValue } = this.props;
        const newSlides = [...slides];

        const goingPromise = new Promise( resolve => {
            this.setState( state => ({
                isGoing: !state.isGoing
            }) );

            setTimeout( () => resolve(true) );
        } )

        goingPromise
        .then( () => {
            const { isGoing } = this.state;

            isGoing ? 
            (                
                this.timer = setInterval( () => {
                    const lastSlide = newSlides.pop();
                    newSlides.unshift(lastSlide);
                
                    this.setState({slides: newSlides});
                }, rangeValue * 1000)
            ) : 
            this.stopCarousel();
        });
    }

    /**
     * 
     * @param {object} e - SyntheticBaseEvent
     */
    makeFullscreen = e => {
        
        const { isFullscreen } = this.state;

        this.stopCarousel();

        this.setState({isFullscreen: !isFullscreen});
    }

    /**
     * 
     * @param {object} e - SyntheticBaseEvent 
     */
    stopCarousel = e => {
        if (this.timer) {
            clearInterval(this.timer);
        };
        this.timer = null;

        this.setState( {
            isGoing: false
        } );
    }

    /**
     * 
     * @param {string} name 
     * @param {string} price 
     * @param {string} image 
     */
    strRender = (name, price, image) => {
        this.setState({ 
            mainName: '', 
            mainPrice: '', 
            mainImage: 'https://static.vecteezy.com/system/resources/previews/001/826/248/non_2x/progress-loading-bar-buffering-download-upload-and-loading-icon-vector.jpg' });

        const timeout = 100;

        const strPromise = new Promise( (resolve, reject) => {
            setTimeout( () => {
                this.setState({ mainImage: image });
                resolve(true);
            }, timeout);
        });

        strPromise.then( result => {
            return new Promise( (resolve, reject) => {
                setTimeout( () => {
                    this.setState({ mainName: name });
                    resolve(true);
                }, timeout / 2 );
            } )
        }).then( result => {
            return new Promise( (resolve, reject) => {
                setTimeout( () => {
                    this.setState({ mainPrice: price });
                    resolve(true);
                }, timeout / 2 );
            } )
        });
    };

    loadSlides = () => {
        const { info: { path } } = this.props;

        loadInfo(path)
            .then(data => this.setState({slides: data}))
            .then(() => this.stopCarousel())
            .catch( err => this.setState({error: err}) );
    }

    componentDidMount() {
        this.loadSlides();
    }

    /**
     * 
     * @param {object} prevProps 
     * @param {object} prevState 
     */
    componentDidUpdate(prevProps, prevState) {
        const { info: { path } } = this.props;

        if(path !==  prevProps.info.path) {
            this.loadSlides();
        }
    }
    
    componentWillUnmount() {
        this.stopCarousel();
    }

    /**
     * 
     * @returns JSX.Element
     */
    render() {

        const { slides, isGoing, isFullscreen, } = this.state;

        return (
            <div className={this.props.theme === 'forest' ? styles.mainForest : styles.mainSky}>
                <h1 className={styles.header}>{this.props.info.header}</h1>
                <ul className={styles.sliderContainer}>
                    {slides.map(this.showSlides)}
                </ul>
                <div className={styles.buttonContainer}>
                    <PrevSlideButton clickHandler={this.showPrevSlide} />
                    <PlayPauseButton isGoing={isGoing} clickHandler={this.slideCarousel} />
                    <NextSlideButton clickHandler={this.showNextSlide} />
                </div>
            </div>
        )
    }
}

export default withTheme(Slides)