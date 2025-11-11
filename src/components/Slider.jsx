import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import mechanic from "../assets/oMechanic-Service.webp";
import amc from "../assets/oAMC.webp";
import towtruck from "../assets/oTow-Truck-Service.webp";
import leftIcon from "../assets/leftarrow.webp";
import rightIcon from "../assets/rightarrow.webp";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
const slides = [
  {
    id: 1,
    title: "Mechanic Service",
    desc: "Instant roadside assistance.",
    img: mechanic,
  },
  { id: 2, title: "AMC Plan", desc: "Annual Maintenance Contract.", img: amc },
  {
    id: 3,
    title: "Tow Truck Service",
    desc: "Fast, Reliable Towing.",
    img: towtruck,
  },
  {
    id: 4,
    title: "Battery Jumpstart",
    desc: "Quick and safe power boost.",
    img: mechanic,
  },
  {
    id: 5,
    title: "Flat Tyre Fix",
    desc: "On-the-spot repair and inflation.",
    img: towtruck,
  },
  {
    id: 6,
    title: "Mechanic Service",
    desc: "Instant roadside assistance.",
    img: mechanic,
  },
  { id: 7, title: "AMC Plan", desc: "Annual Maintenance Contract.", img: amc },
  {
    id: 8,
    title: "Tow Truck Service",
    desc: "Fast, Reliable Towing.",
    img: towtruck,
  },
  {
    id: 9,
    title: "Battery Jumpstart",
    desc: "Quick and safe power boost.",
    img: mechanic,
  },
  {
    id: 10,
    title: "Flat Tyre Fix",
    desc: "On-the-spot repair and inflation.",
    img: towtruck,
  },
];
export default function Slider() {
  return (
    <div className="homeSlider max-w-screen relative pt-5 mt-3">
      <div className="md:block hidden absolute w-[10vw] bg-white left-0 top-0 bottom-0 z-30"></div>
      <div className="md:max-w-screen max-w-[1300px] px-3 md:px-0">
        <Swiper
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
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
            
              slidesPerView: 3,
              spaceBetween: 25,
            },
            1280: {
             
              slidesPerView: 4,
              spaceBetween: 20,
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
                <div className=" w-full h-[230px]">
                  <img
                    className="object-contain rounded-2xl"
                    src={s.img}
                    alt=""
                  />
                </div>
              </SwiperSlide>
            );
          })}
          <div class="swiper-button-prev">
            <img src={leftIcon} alt="Prev" />
          </div>
          <div class="swiper-button-next">
            <img src={rightIcon} alt="Next" />
          </div>
        </Swiper>
      </div>
    </div>
  );
}
