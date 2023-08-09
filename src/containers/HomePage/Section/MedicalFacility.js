import React from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import * as userService from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import { history } from "../../../redux";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class MedicalFacility extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clinics: [],
        };
    }

    componentDidMount = async () => {
        const clinics = await userService.getAllClinic();
        this.setState({
            clinics,
        });
    };

    redirectToClinicDetail = (id) => {
        history.push(`/detail-clinic/${id}`);
    };

    render() {
        console.log("check clinics: ", this.state);
        const { clinics } = this.state;
        return (
            <>
                <div className="section-overlay section-bg">
                    <div className="section-container">
                        <div className="section-title">
                            <h1 className="title">Cơ sở y tế nổi bật</h1>
                            <button className="button">Tìm Kiếm</button>
                        </div>
                        <Slider {...this.props.settings}>
                            {clinics &&
                                clinics.map((clinic, index) => {
                                    const image = Buffer.from(
                                        clinic.image
                                    ).toString();
                                    return (
                                        <div
                                            className="section-item"
                                            key={index}
                                            onClick={() =>
                                                this.redirectToClinicDetail(
                                                    clinic.id
                                                )
                                            }
                                        >
                                            <div
                                                className="img"
                                                style={{
                                                    backgroundImage: `url(${image})`,
                                                    backgroundSize: "contain",
                                                }}
                                            ></div>
                                            <span className="title">
                                                {clinic.name}
                                            </span>
                                        </div>
                                    );
                                })}
                        </Slider>
                    </div>
                </div>
            </>
        );
    }
}

export default MedicalFacility;
