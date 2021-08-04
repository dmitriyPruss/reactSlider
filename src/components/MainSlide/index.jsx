import React, { Component } from 'react';
import { withTheme } from './../HOCs';
import styles from './../Slides/Slides.module.scss';

class MainSlide extends Component {

    componentDidMount() {
        const { slide: { name, price, image, }, strRender, } = this.props;
        strRender(name, price, image);
    }

    /**
     * 
     * @param {object} prevProps 
     * @param {object} prevState 
     */
    componentDidUpdate(prevProps, prevState) {
        if(this.props.slide.name !== prevProps.slide.name) {
            const { slide: { name, price, image, }, strRender, } = this.props;
            strRender(name, price, image);
        }
    }

    /**
     * 
     * @returns JSX.Element
     */
    render() {

        const { 
            theme, 
            index, 
            slide : {
                image, 
            }, 
            info: {
                mainImage, 
                mainName, 
                mainPrice,
                isFullscreen 
            }, 
            clickHandler, 
        } = this.props;

        return (
            <>
                <li className={
                    theme === 'forest' ? 
                    styles.mainSliderItemForest : 
                    styles.mainSliderItemSky
                }>
                    <img onClick={clickHandler}
                    className={isFullscreen ? styles.fullScreen : styles.mainImg} src={mainImage} alt={`Img ${index+1}`} />
                    <p>{mainName}</p>
                    <p>{mainPrice}</p>
                </li>
            </>
        )
    }
}

export default withTheme(MainSlide);
