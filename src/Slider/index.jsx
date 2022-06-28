import { Splide, SplideSlide, SplideTrack } from '@splidejs/react-splide';

import '@splidejs/react-splide/css';
import styles from './Slider.module.scss'



const Slider = () => {
    return (
        <div className={styles.slider}>
          <Splide hasTrack={ false } options={{
            pagination: false,
            type: 'loop',
            gap: 20
            
          }}>
            <div className="custom-wrapper">
              <SplideTrack>
                <SplideSlide>
                  <div className={styles.sliderItem}>
                    <div className={styles.sliderContent}>
                      <h1>Добро пожаловать в <span>ccc</span> магазин.</h1>
                      <p>Здесь вы можете мгновенно купить товар и вам его привезут буквально за минуту</p>
                    </div>
                    <div className={styles.sliderPicture}>
                      <div className={styles.sliderPicture__about}>
                        <span>Пицца сезонная</span>
                        <p>от 399 рублей</p>
                      </div>
                    </div>
                </div>
                </SplideSlide>
                <SplideSlide>
                    <div className={styles.sliderItem}>
                        <div className={styles.sliderContent}>
                        <h1>Добро пожаловать в <span>ccc</span> магазин.</h1>
                        <p>Здесь вы можете мгновенно купить товар и вам его привезут буквально за минуту</p>
                        </div>
                        <div className={styles.sliderPicture}>
                        <div className={styles.sliderPicture__about}>
                            <span>Пицца сезонная</span>
                            <p>от 399 рублей</p>
                        </div>
                        </div>
                    </div>
                </SplideSlide>
              </SplideTrack>

              <div className="splide__arrows">
                <button style={{
                  display: 'none'
                }} className="splide__arrow splide__arrow--prev">
                </button>
                <button className={`splide__arrow splide__arrow--next ${styles.arrow}`}>
                  <img src="img/arrow-right.svg" alt="Стрелка вправо" />
                </button>
              </div>
            </div>
          </Splide>
        </div>
    );
}

export default Slider;
