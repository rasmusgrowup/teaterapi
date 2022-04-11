import scss from '../styles/citat.module.scss'
import Slider from "react-slick";

export default function Citater({ overskrift, children }) {

  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 20000,
    slidesToShow: 1,
    slidesToScroll: 1
  };

  return (
    <>
      <section className={scss.wrapper}>
        <h2>{overskrift}</h2>
        <div className={scss.inner}>
        <Slider {...settings}>
          {children}
        </Slider>
        </div>
      </section>
    </>
  )
}
