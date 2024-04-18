import styles from "./Slider.module.css"
import {createRef, Component } from "react"
import pict1 from "./img/1.jpg"
import pict2 from "./img/2.webp"
import pict3 from "./img/3.jpg"
import pict4 from "./img/4.jpg"
import pict5 from "./img/5.webp"
export default class Slider extends Component {
    constructor(props) {
        super(props)
        this.wrapper = createRef()
        this.images = [pict1, pict2, pict3, pict4, pict5]
        this.currentIndex = 0
        this.throttleFlag = false
    }

    rotateForward() {
        if (!this.throttleFlag) {
            this.wrapper.current.style.transition = ".5s"
            this.currentIndex = (this.currentIndex + 1) % this.images.length
            const translateValue = "translateX(calc(-44% - 40px - 665px))"
            this.wrapper.current.style.transform = translateValue
            this.throttleFlag = true

            setTimeout(() => {
                this.wrapper.current.appendChild(this.wrapper.current.firstElementChild)
                this.wrapper.current.style.transition = "0s"
                this.wrapper.current.style.transform = "translateX( -665px)"
            }, 500)
            setTimeout(() => { this.throttleFlag = false }, 500)
        }
    }
    render() {
        return (<div className={styles.container}>
            <div ref={this.wrapper} className={styles.wrapper} onClick={()=>this.rotateForward()}>
                <img src={pict1} />
                <img src={pict2} />
                <img src={pict3} />
                <img src={pict4} />
                <img src={pict5} />
            </div>
        </div>)
    }
}
