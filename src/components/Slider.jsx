import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import mechanic from "../assets/oMechanic-Service.webp";
import amc from "../assets/oAMC.webp";
import towtruck from "../assets/oTow-Truck-Service.webp";
import mechanicNewImage from "../assets/mechanic.jpg";
import post2 from "../assets/Post2.jpg";
import post3 from "../assets/Post3.jpg";
import post4 from "../assets/Post4.jpg";
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
    id: 4,
    title: "Battery Jumpstart",
    desc: "Quick and safe power boost.",
    img: post4,
  },
  {
    id: 6,
    title: "Mechanic Service",
    desc: "Instant roadside assistance.",
    img: amc,
  },
  {
    id: 7,
    title: "AMC Plan",
    desc: "Annual Maintenance Contract.",
    img: post3,
  },

  {
    id: 9,
    title: "Battery Jumpstart",
    desc: "Quick and safe power boost.",
    img: post2,
  },
  {
    id: 10,
    title: "Flat Tyre Fix",
    desc: "On-the-spot repair and inflation.",
    img: mechanicNewImage,
  },
  {
    id: 11,
    title: "Mechanic Service",
    desc: "Instant roadside assistance.",
    img: mechanic,
  },
  {
    id: 12,
    title: "AMC Plan",
    desc: "Annual Maintenance Contract.",
    img: post2,
  },

  {
    id: 13,
    title: "Battery Jumpstart",
    desc: "Quick and safe power boost.",
    img: post4,
  },
  {
    id: 14,
    title: "Mechanic Service",
    desc: "Instant roadside assistance.",
    img: mechanic,
  },
  {
    id: 15,
    title: "AMC Plan",
    desc: "Annual Maintenance Contract.",
    img: amc,
  },
  {
    id: 16,
    title: "Battery Jumpstart",
    desc: "Quick and safe power boost.",
    img: post4,
  },
  {
    id: 17,
    title: "Mechanic Service",
    desc: "Instant roadside assistance.",
    img: amc,
  },
  {
    id: 18,
    title: "AMC Plan",
    desc: "Annual Maintenance Contract.",
    img: post3,
  },
  {
    id: 19,
    title: "Battery Jumpstart",
    desc: "Quick and safe power boost.",
    img: post2,
  },
  {
    id: 20,
    title: "Flat Tyre Fix",
    desc: "On-the-spot repair and inflation.",
    img: mechanicNewImage,
  },
  {
    id: 21,
    title: "Mechanic Service",
    desc: "Instant roadside assistance.",
    img: mechanic,
  },
  {
    id: 22,
    title: "AMC Plan",
    desc: "Annual Maintenance Contract.",
    img: post2,
  },
  {
    id: 23,
    title: "Battery Jumpstart",
    desc: "Quick and safe power boost.",
    img: post4,
  },
];

export default function Slider() {
  return (
    <div className="homeSlider max-w-screen relative pt-5 mt-3 lg:mb-6">
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
            2560:{
              slidesPerView:6,
              spaceBetween:30
            }
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
                <div className=" w-full lg:h-[270px] h-[240px]">
                  <img
                    className="object-contain h-full rounded-2xl"
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
