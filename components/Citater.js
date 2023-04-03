import scss from '../styles/citat.module.scss'
import Slider from "react-slick";
import Citat from "./Citat";

export default function Citater({ section }) {

  const settings = {
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
        <h2>{section.overskrift}</h2>
        <div className={scss.inner}>
        <Slider {...settings}>
          { section.testimonials && section.testimonials.map((citat, i) => (
              <Citat citat={citat.citat} navn={citat.navn} key={i}/>
          ))}
        </Slider>
        </div>
      </section>
    </>
  )
}
