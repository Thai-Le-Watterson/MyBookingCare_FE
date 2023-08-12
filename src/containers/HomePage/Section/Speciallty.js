import React from "react";
import Slider from "react-slick";
import * as userService from "../../../services/userService";
import _ from "lodash";
import { history } from "../../../redux";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Speciallty.scss";

class Speciallty extends React.Component {
    constructor(props) {
        super(props);
        this.state = { specialties: [] };
    }

    componentDidMount = async () => {
        const specialties = await userService.getAllSpecialties();
        // console.log("check specialties: ", specialties);
        if (specialties && !_.isEmpty(specialties)) {
            this.setState({
                specialties,
            });
        }
    };

    redirectToSpecialtyDetail = (specialtyId) => {
        history.push(`/detail-specialty/${specialtyId}`);
    };

    render() {
        return (
            <>
                <div className="section-overlay">
                    <div className="section-container">
                        <div className="section-title">
                            <h1 className="title">Chuyên khoa phổ biến</h1>
                            <button className="button">Xem Thêm</button>
                        </div>
                        <Slider {...this.props.settings}>
                            {this.state?.specialties &&
                                this.state.specialties.map(
                                    (specialty, index) => {
                                        const image =
                                            specialty.image &&
                                            Buffer.from(
                                                specialty.image
                                            ).toString();
                                        return (
                                            <div
                                                className="section-item"
                                                key={index}
                                                onClick={() =>
                                                    this.redirectToSpecialtyDetail(
                                                        specialty.id
                                                    )
                                                }
                                            >
                                                <div
                                                    className="img"
                                                    style={{
                                                        backgroundImage: `url(${image})`,
                                                    }}
                                                ></div>
                                                <span className="title">
                                                    {specialty.name}
                                                </span>
                                            </div>
                                        );
                                    }
                                )}
                        </Slider>
                    </div>
                </div>
            </>
        );
    }
}

export default Speciallty;
