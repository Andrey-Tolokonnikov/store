import styles from './Recommends.module.css'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft, faArrowRight } from '@fortawesome/free-solid-svg-icons'

import { useSelector } from 'react-redux'
import {Component, createRef} from 'react'
import Item from './../../MainPage/Catalogue/Item/Item'
export default class Recommends extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.slider = createRef();
        this.index = 0;
    }
    rotateForward() {
        if (this.index + 4 < this.props.favItems.length) {
            this.index++;
            this.slider.current.style.transform = `translateX(calc(${-this.index * 23}% - ${20 * this.index}px - 10px))`
        } else {

        }
    }
    rotateBackward() {
        if (this.index > 0) {
            this.index--;
            this.slider.current.style.transform = `translateX(calc(${-this.index * 23}% - ${20 * this.index}px - 10px))`
        }
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.sliderText}>
                    <div>Может заинтересовать</div>
                    <div className={styles.arrows}>
                        <FontAwesomeIcon icon={faArrowLeft} onClick={this.rotateBackward.bind(this)} />
                        <FontAwesomeIcon icon={faArrowRight} onClick={this.rotateForward.bind(this)} />
                    </div>
                </div>
                <div  className={styles.slider}>
                    <div ref={this.slider} className={styles.wrapper}>
                        {this.props.favItems.map(item => <Item key={item.id} good={item} />)}
                    </div>
                </div>
            </div>
        );
    }
}
