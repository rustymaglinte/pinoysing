import React from "react";
import Slider from "react-slick";
import "./Credits.css"


const Credits = () => {
    let settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        arrows: false
    };
    return (
        <div className="credit-container">
            <h3>Credit to:</h3>
            <hr />
            <Slider {...settings}>
                <div>
                    {/* <img
                        src="../media/pinoysing/youtube.webp"
                        alt="Youtube Logo"
                    /> */}
                    <h5>Youtube</h5>
                </div>
                <div>
                    {/* <img
                        src="../media/pinoysing/PinoyTambayan.webp"
                        alt="KaraokeyTV Logo"
                    /> */}
                    <h5>Pinoy Videoke Tambayan</h5>
                </div>
                <div>
                    {/* <img
                        src="../media/pinoysing/CoversPH.webp"
                        alt="CoversPH Logo"
                    /> */}
                    <h5>CoversPH</h5>
                </div>
                <div>
                    {/* <img
                        src="../media/pinoysing/KaraokeyTV.webp"
                        alt="KaraokeyTV Logo"
                    /> */}
                    <h5>KaraokeyTV</h5>
                </div>
                             
            </Slider>
            <hr />
        </div>
    );
}

export default Credits;