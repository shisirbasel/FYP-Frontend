import { Swiper, SwiperSlide} from 'swiper/react';
import {Autoplay} from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';

import './../css/swiper.css';

import Book1 from './../assets/images/book-1.png';
import Book2 from './../assets/images/book-2.png';
import Book3 from './../assets/images/book-3.png';
import Book4 from './../assets/images/book-4.png';
import Book5 from './../assets/images/book-5.png';
import Book6 from './../assets/images/book-6.png';
import Book7 from './../assets/images/book-7.png';
import Book8 from './../assets/images/book-8.png';
import Book9 from './../assets/images/book-9.png';
import Book10 from './../assets/images/book-10.png';

import Stand from './../assets/images/stand.png';

const SwiperComponent = () => {

  return (
    <section className='home' id='home'>
      <div className="row">
        <div className="content">
          <div className='text'>
            <h3> Unleashing a World of Stories, One Trade at a Time!</h3>
            <div className='button'>
              
              <p>Trade Your Books, Save the Planet.</p>
              <a href='/' className='explore'>Explore</a>
            </div>
            
          </div>
        </div>
       
        <div className='swiper books-slider'>
              <Swiper
              loop={true}
              centeredSlides={true}
              autoplay={{
                delay: 4000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              breakpoints={{
                300: {
                  slidesPerView: 2,
                },
                400: {
                  slidesPerView: 2,
                },
                640: {
                  slidesPerView: 3,
                },
                768: {
                  slidesPerView: 3,
                },
                850:{
                  slidesPerView: 3,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="mySwiper"
            >
              <SwiperSlide><img src={Book1} alt='' /></SwiperSlide>
              <SwiperSlide><img src={Book2} alt='' /></SwiperSlide>
              <SwiperSlide><img src={Book3} alt='' /></SwiperSlide>
              <SwiperSlide><img src={Book4} alt='' /></SwiperSlide>
              <SwiperSlide><img src={Book5} alt='' /></SwiperSlide>
              <SwiperSlide><img src={Book6} alt='' /></SwiperSlide>
              <SwiperSlide><img src={Book7} alt='' /></SwiperSlide>
              <SwiperSlide><img src={Book8} alt='' /></SwiperSlide>
              <SwiperSlide><img src={Book9} alt='' /></SwiperSlide>
              <SwiperSlide><img src={Book10} alt='' /></SwiperSlide>
            </Swiper>
          <img src={Stand} className="stand" alt='' />
        </div>
      </div>
    </section>
  );
};

export default SwiperComponent;
