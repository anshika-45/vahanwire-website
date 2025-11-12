import React from "react";
import FacebookIcon from "../assets/FacebookIcon.svg";
import InstaIcon from "../assets/InstagramIcon.svg";
import XIcon from "../assets/XIcon.svg";
import LinkedInIcon from "../assets/LinkedInIcon.svg"
const IconCircle = ({ src, alt, link }) => {
    return (
        <a href={link}>
            <div className="bg-white w-8 sm:w-10 h-8 sm:h-10 rounded-full flex items-center justify-center hover:bg-gray-200 transition">
                <img loading="lazy" src={src} alt={alt} className="w-4 sm:w-5 h-4 sm:h-5 object-contain" />
            </div>
        </a>
    );
};
const FooterIcons = () => {
    const socialData = [
        { src: InstaIcon, alt: "Instagram", link: "https://www.instagram.com/vahanwireofficial/#" },
        { src: LinkedInIcon, alt: "X", link: "https://in.linkedin.com/company/vahanwire" },
        { src: FacebookIcon, alt: "Facebook", link: "https://www.facebook.com/vahanwire/" },
        { src: XIcon, alt: "X", link: "https://x.com/vahanwire" },
    ];
    return (
        <div className="flex space-x-2 sm:space-x-3 mt-2">
            {socialData.map((item, idx) => (
                <IconCircle key={idx} src={item.src} alt={item.alt} link={item.link} />
            ))}
        </div>
    );
};
export default FooterIcons;