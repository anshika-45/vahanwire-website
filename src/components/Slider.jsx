import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { S3_IMAGES } from "../constants/images";
const slides = [
  {
    id: 7,
    title: "AMC Plan",
    desc: "Annual Maintenance Contract.",
    img: S3_IMAGES.POST_3,
  },

  {
    id: 9,
    title: "Battery Jumpstart",
    desc: "Quick and safe power boost.",
    img: S3_IMAGES.POST_2,
  },
  {
    id: 10,
    title: "Flat Tyre Fix",
    desc: "On-the-spot repair and inflation.",
    img: S3_IMAGES.MECHANIC_SERVICE_SLIDER,
  },
  {
    id: 11,
    title: "Mechanic Service",
    desc: "Instant roadside assistance.",
    img: S3_IMAGES.MECHANIC_SLIDER,
  },
  {
    id: 12,
    title: "AMC Plan",
    desc: "Annual Maintenance Contract.",
    img: S3_IMAGES.POST_2,
  },

  {
    id: 13,
    title: "Battery Jumpstart",
    desc: "Quick and safe power boost.",
    img: S3_IMAGES.POST_4,
  },
  {
    id: 17,
    title: "Mechanic Service",
    desc: "Instant roadside assistance.",
    img: S3_IMAGES.AMC_SLIDER,
  },
  {
    id: 18,
    title: "AMC Plan",
    desc: "Annual Maintenance Contract.",
    img: S3_IMAGES.POST_3,
  },
  {
    id: 20,
    title: "Flat Tyre Fix",
    desc: "On-the-spot repair and inflation.",
    img: S3_IMAGES.MECHANIC_SERVICE_SLIDER,
  },
  {
    id: 21,
    title: "Mechanic Service",
    desc: "Instant roadside assistance.",
    img: S3_IMAGES.MECHANIC_SLIDER,
  },
  {
    id: 22,
    title: "AMC Plan",
    desc: "Annual Maintenance Contract.",
    img: S3_IMAGES.POST_2,
  },
  {
    id: 23,
    title: "Battery Jumpstart",
    desc: "Quick and safe power boost.",
    img: S3_IMAGES.POST_4,
  },
];

export default function Slider() {
  return (
    <div className="homeSlider max-w-screen relative lg:mb-8 mb-1">
      <div>
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 1500,
            disableOnInteraction: false,
          }}
          loop={true}
          breakpoints={{
            480: {
              slidesPerView: 1,
              spaceBetween: 10,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 15,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4,
              spaceBetween: 25,
            },
            1280: {
              slidesPerView: 4,
              spaceBetween: 20,
            },
            2560: {
              slidesPerView: 6,
              spaceBetween: 30,
            },
          }}
          pagination={{
            clickable: true,
          }}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper"
        >
          {slides.map((s, index) => {
            return (
              <SwiperSlide key={s.id}>
                <div className=" w-full lg:h-[270px] h-[240px] md:p-0 p-3">
                  <img
                    className="object-contain w-full h-full rounded-2xl"
                    src={s.img}
                    alt=""
                  />
                </div>
              </SwiperSlide>
            );
          })} 
          <div slot="container-start" className="swiper-button-prev hidden lg:block">
            <img src={S3_IMAGES.LEFT_ARROW} alt="Prev" />
          </div>
          <div slot="container-start" className="swiper-button-next hidden lg:block">
            <img src={S3_IMAGES.RIGHT_ARROW} alt="Next" />
          </div>
        </Swiper>
      </div>
      
    </div>

  );
}
