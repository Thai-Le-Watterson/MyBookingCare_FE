import React from "react";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class MedicalFacility extends React.Component {
    render() {
        return (
            <>
                <div className="section-overlay section-bg">
                    <div className="section-container">
                        <div className="section-title">
                            <h1 className="title">Cơ sở y tế nổi bật</h1>
                            <button className="button">Tìm Kiếm</button>
                        </div>
                        <Slider {...this.props.settings}>
                            <div className="section-item">
                                <div className="img img1"></div>
                                <span className="title">Cơ xương khớp</span>
                            </div>
                            <div className="section-item">
                                <div className="img img2"></div>
                                <span className="title">Tim mạch</span>
                            </div>
                            <div className="section-item">
                                <div className="img img3"></div>
                                <span className="title">Cột sống</span>
                            </div>
                            <div className="section-item">
                                <div className="img img4"></div>
                                <span className="title">Thần kinh</span>
                            </div>
                            <div className="section-item">
                                <div className="img img5"></div>
                                <span className="title">Bệnh viêm gan</span>
                            </div>
                            <div className="section-item">
                                <div className="img img6"></div>
                                <span className="title">Châm cứu</span>
                            </div>
                        </Slider>
                    </div>
                </div>
            </>
        );
    }
}

export default MedicalFacility;
