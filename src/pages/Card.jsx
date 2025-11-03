import PropTypes from "prop-types";
import React from "react";
export const PremiumCare = ({
  className,
  vector = "vector-2-2.svg",
  img = "vector-1.svg",
  vector1 = "vector-3-2.svg",
  vector2 = "vector-4-2.svg",
  frame = "frame-2147223694.svg",
  line = "line-52.svg",
  vectorClassName,
  vector3 = "vector.svg",
  vectorClassNameOverride,
  vector4 = "image.svg",
  imgClassName,
  vector5 = "vector-2.svg",
  imgClassNameOverride,
  vector6 = "vector-3.svg",
  vectorClassName1,
  vector7 = "vector-4.svg",
  vectorClassName2,
  vector8 = "vector-5.svg",
}) => {
  return (
    <div
      className={`flex flex-col w-[220px] items-start gap-5 pt-2.5 pb-5 px-0 relative top-12 left-[69px] rounded-lg overflow-hidden bg-[linear-gradient(180deg,rgba(143,101,33,1)_0%,rgba(163,118,45,1)_100%)] ${className}`}
    >
      <div className="absolute w-[56.74%] h-[19.44%] top-0 left-[43.26%] aspect-[1.65]">
        <img
          className="absolute w-[15.25%] h-[73.45%] top-[6.57%] left-[36.92%]"
          alt="Vector"
          loading="lazy"
          src={vector}
        />

        <img
          className="absolute w-[48.07%] h-full top-[6.57%] left-0"
          alt="Vector"
          loading="lazy"
          src={img}
        />

        <img
          className="absolute w-[28.97%] h-full top-[6.57%] left-[41.47%]"
          alt="Vector"
          loading="lazy"
          src={vector1}
        />

        <img
          className="absolute w-[38.49%] h-full top-[6.57%] left-[61.51%]"
          alt="Vector"
          loading="lazy"
          src={vector2}
        />
      </div>

      <img
        className="relative self-stretch w-full flex-[0_0_auto]"
        alt="Frame"
        loading="lazy"
        src={frame}
      />

      <div className="flex flex-col items-start gap-3.5 px-4 py-0 relative self-stretch w-full flex-[0_0_auto]">
        <div className="relative self-stretch mt-[-1.00px] font-heading-h4 font-[number:var(--heading-h4-font-weight)] text-white text-[length:var(--heading-h4-font-size)] tracking-[var(--heading-h4-letter-spacing)] leading-[var(--heading-h4-line-height)] [font-style:var(--heading-h4-font-style)]">
          Premium Care
        </div>

        <div className="flex items-center gap-[18px] relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex flex-col items-start gap-1 relative flex-1 grow">
            <div className="mt-[-1.00px] font-caption-micro font-[number:var(--caption-micro-font-weight)] text-[length:var(--caption-micro-font-size)] leading-[var(--caption-micro-line-height)] relative self-stretch text-white tracking-[var(--caption-micro-letter-spacing)] [font-style:var(--caption-micro-font-style)]">
              Vehicle Number
            </div>

            <div className="font-label-button font-[number:var(--label-button-font-weight)] text-[length:var(--label-button-font-size)] leading-[var(--label-button-line-height)] relative self-stretch text-white tracking-[var(--label-button-letter-spacing)] [font-style:var(--label-button-font-style)]">
              00-00
            </div>
          </div>

          <div className="flex flex-col items-start gap-1 relative flex-1 grow">
            <div className="mt-[-1.00px] font-caption-micro font-[number:var(--caption-micro-font-weight)] text-[length:var(--caption-micro-font-size)] leading-[var(--caption-micro-line-height)] relative self-stretch text-white tracking-[var(--caption-micro-letter-spacing)] [font-style:var(--caption-micro-font-style)]">
              Valid For
            </div>

            <div className="font-label-button font-[number:var(--label-button-font-weight)] text-[length:var(--label-button-font-size)] leading-[var(--label-button-line-height)] relative self-stretch text-white tracking-[var(--label-button-letter-spacing)] [font-style:var(--label-button-font-style)]">
              12 Months
            </div>
          </div>
        </div>

        <img
          className="relative self-stretch w-full h-px object-cover"
          alt="Line"
          loading="lazy"
          src={line}
        />

        <div className="flex flex-col items-start gap-3.5 relative self-stretch w-full flex-[0_0_auto]">
          <div className="flex items-center gap-[15px] relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex flex-col items-start justify-center gap-3 relative flex-1 grow">
              <div className="inline-flex items-center gap-4 relative flex-[0_0_auto]">
                <p className="relative flex items-center justify-center w-fit mt-[-1.00px] [font-family:'Roboto-Bold',Helvetica] font-normal text-transparent text-lg tracking-[0] leading-[18px]">
                  <span className="font-[number:var(--heading-h4-font-weight)] text-white leading-[var(--heading-h4-line-height)] font-heading-h4 [font-style:var(--heading-h4-font-style)] tracking-[var(--heading-h4-letter-spacing)] text-[length:var(--heading-h4-font-size)]">
                    ₹ 3,499
                    <br />
                  </span>

                  <span className="font-caption-micro text-[#ffe5bb] text-[length:var(--caption-micro-font-size)] leading-[var(--caption-micro-line-height)] line-through [font-style:var(--caption-micro-font-style)] font-[number:var(--caption-micro-font-weight)] tracking-[var(--caption-micro-letter-spacing)]">
                    ₹4,999
                  </span>

                  <span className="font-caption-micro text-black text-[length:var(--caption-micro-font-size)] leading-[var(--caption-micro-line-height)] [font-style:var(--caption-micro-font-style)] font-[number:var(--caption-micro-font-weight)] tracking-[var(--caption-micro-letter-spacing)]">
                    &nbsp;
                  </span>

                  <span className="font-caption-micro text-white text-[length:var(--caption-micro-font-size)] leading-[var(--caption-micro-line-height)] [font-style:var(--caption-micro-font-style)] font-[number:var(--caption-micro-font-weight)] tracking-[var(--caption-micro-letter-spacing)]">
                    30% Off
                  </span>
                </p>

                <div className="absolute top-[21px] left-[83px] h-[17px] flex items-center justify-center font-caption-micro font-[number:var(--caption-micro-font-weight)] text-white text-[length:var(--caption-micro-font-size)] tracking-[var(--caption-micro-letter-spacing)] leading-[var(--caption-micro-line-height)] whitespace-nowrap [font-style:var(--caption-micro-font-style)]">
                  /per year
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
          <div className="inline-flex items-center justify-center gap-2.5 relative flex-[0_0_auto]">
            <div className="relative w-fit mt-[-1.00px] font-label-button font-[number:var(--label-button-font-weight)] text-white text-[length:var(--label-button-font-size)] tracking-[var(--label-button-letter-spacing)] leading-[var(--label-button-line-height)] whitespace-nowrap [font-style:var(--label-button-font-style)]">
              Plan Featues
            </div>
          </div>

          <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
            <div className="flex items-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-4 h-4 aspect-[1]">
                <img
                  className={`absolute w-[83.33%] h-[83.33%] top-[8.33%] left-[8.35%] ${vectorClassName}`}
                  alt="Vector"
                  src={vector3}
                  loading="lazy"
                />

                <img
                  className={`absolute w-[29.17%] h-[20.83%] top-[34.89%] left-[30.71%] ${vectorClassNameOverride}`}
                  alt="Vector"
                  src={vector4}
                  loading="lazy"
                />
              </div>

              <div className="relative flex-1 grow h-4">
                <p className="absolute top-0 left-0 h-[17px] flex items-center justify-center font-caption-micro font-[number:var(--caption-micro-font-weight)] text-white text-[length:var(--caption-micro-font-size)] tracking-[var(--caption-micro-letter-spacing)] leading-[var(--caption-micro-line-height)] whitespace-nowrap [font-style:var(--caption-micro-font-style)]">
                  Plan Start After 72 Hours
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-4 h-4 aspect-[1]">
                <img
                  className={`absolute w-[83.33%] h-[83.33%] top-[8.33%] left-[8.35%] ${imgClassName}`}
                  alt="Vector"
                  src={vector5}
                  loading="lazy"
                />

                <img
                  className={`absolute w-[29.17%] h-[20.83%] top-[34.89%] left-[30.71%] ${imgClassNameOverride}`}
                  alt="Vector"
                  src={vector6}
                  loading="lazy"
                />
              </div>

              <div className="relative flex-1 grow h-4">
                <div className="absolute top-0 left-0 h-[17px] flex items-center justify-center font-caption-micro font-[number:var(--caption-micro-font-weight)] text-white text-[length:var(--caption-micro-font-size)] tracking-[var(--caption-micro-letter-spacing)] leading-[var(--caption-micro-line-height)] whitespace-nowrap [font-style:var(--caption-micro-font-style)]">
                  Validity 365 Days
                </div>
              </div>
            </div>

            <div className="flex items-center gap-1 relative self-stretch w-full flex-[0_0_auto]">
              <div className="relative w-4 h-4 aspect-[1]">
                <img
                  className={`absolute w-[83.33%] h-[83.33%] top-[8.33%] left-[8.35%] ${vectorClassName1}`}
                  alt="Vector"
                  src={vector7}
                  loading="lazy"
                />

                <img
                  className={`absolute w-[29.17%] h-[20.83%] top-[34.89%] left-[30.71%] ${vectorClassName2}`}
                  alt="Vector"
                  src={vector8}
                  loading="lazy"
                />
              </div>

              <div className="relative flex-1 grow h-4">
                <div className="absolute top-0 left-0 h-[17px] flex items-center justify-center font-caption-micro font-[number:var(--caption-micro-font-weight)] text-white text-[length:var(--caption-micro-font-size)] tracking-[var(--caption-micro-letter-spacing)] leading-[var(--caption-micro-line-height)] whitespace-nowrap [font-style:var(--caption-micro-font-style)]">
                  Unlimited Services
                </div>
              </div>
            </div>
          </div>
        </div>

        <button className="all-[unset] box-border flex h-12 items-center justify-center gap-2.5 px-5 py-4 relative self-stretch w-full bg-white rounded-lg">
          <div className="relative flex items-center justify-center w-fit mt-[-4.50px] mb-[-2.50px] [font-family:'Roboto-Medium',Helvetica] font-medium text-vahanwire-color-palateprimary-blueprimary-blue-500 text-lg text-center tracking-[0] leading-[23px] whitespace-nowrap">
            Buy Now
          </div>
        </button>
      </div>
    </div>
  );
};

PremiumCare.propTypes = {
  vector: PropTypes.string,
  img: PropTypes.string,
  vector1: PropTypes.string,
  vector2: PropTypes.string,
  frame: PropTypes.string,
  line: PropTypes.string,
  vector3: PropTypes.string,
  vector4: PropTypes.string,
  vector5: PropTypes.string,
  vector6: PropTypes.string,
  vector7: PropTypes.string,
  vector8: PropTypes.string,
};
