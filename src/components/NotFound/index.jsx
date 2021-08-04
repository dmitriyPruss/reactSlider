import React, { Component } from 'react';
import configs from './../../configs';
import styles from './../../App.module.scss';


class NotFound extends Component {

    constructor(props) {
        super(props);
    
        this.state = {
             str: ''
        };
    }

    strRender = () => {

        const errorStr = configs.NOT_FOUND;
        const timeout = configs.NOT_FOUND_TIMEOUT;
        let renderingStr = '';
        let i = 0;

        const strPromise = new Promise( (resolve, reject) => {

            setTimeout( () => {
                renderingStr += errorStr.split(' ')[i];
                this.setState({ str: renderingStr });
                i++;
                resolve(true);
            }, timeout);
        });

        strPromise.then( result => {
            return new Promise( (resolve, reject) => {
                setTimeout( () => {
                    renderingStr += ` ${errorStr.split(' ')[i]}`;
                    this.setState({ str: renderingStr });
                    i++;
                    resolve(true);
                }, timeout);
            } )
        }).then( result => {
            return new Promise( (resolve, reject) => {
                setTimeout( () => {
                    renderingStr += ` ${errorStr.split(' ')[i]}`;
                    this.setState({ str: renderingStr });
                }, timeout);
            } )
        });
    }

    componentDidMount() {
        this.strRender();
    }

    /**
     * 
     * @returns React JSX.Element
     */
    render() {
        const { str } = this.state;
        const { history } = this.props;

        setTimeout( () => {
            history.push('/');
        }, 3500);

        return (
            <div className={styles.pageNotFound}>{str}</div>
        )
    }
}

export default NotFound;
