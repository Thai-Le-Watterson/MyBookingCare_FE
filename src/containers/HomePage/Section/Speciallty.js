import React from "react";
import Slider from "react-slick";
import * as userService from "../../../services/userService";
import _ from "lodash";
import { history } from "../../../redux";

import ContentLoader from "react-content-loader";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Speciallty.scss";

class Speciallty extends React.Component {
    constructor(props) {
        super(props);
        this.state = { specialties: [], isLoadContent: false };
    }

    componentDidMount = async () => {
        this.setState({
            isLoadContent: true,
        });

        const specialties = await userService.getAllSpecialties();
        // console.log("check specialties: ", specialties);
        if (specialties && !_.isEmpty(specialties)) {
            this.setState({
                specialties,
            });
        }

        this.setState({
            isLoadContent: false,
        });
    };

    redirectToSpecialtyDetail = (specialtyId) => {
        history.push(`/detail-specialty/${specialtyId}`);
    };

    contentLoader = (quantity) => {
        const result = [];

        if (Number.isInteger(quantity) && quantity > 0)
            for (let i = 1; i <= quantity; i++) {
                result.push(
                    <ContentLoader
                        width={300}
                        height={200}
                        viewBox="0 0 450 400"
                        backgroundColor="#f0f0f0"
                        foregroundColor="#dedede"
                    >
                        <rect
                            x="43"
                            y="304"
                            rx="4"
                            ry="4"
                            width="271"
                            height="9"
                        />
                        <rect
                            x="44"
                            y="323"
                            rx="3"
                            ry="3"
                            width="119"
                            height="6"
                        />
                        <rect
                            x="42"
                            y="77"
                            rx="10"
                            ry="10"
                            width="388"
                            height="217"
                        />
                    </ContentLoader>
                    // <RingLoader
                    //     color={"#00fff1"}
                    //     loading={this.state.isLoading}
                    //     size={50}
                    // />
                );
            }

        return result;
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
                        {this.state.isLoadContent ? (
                            this.contentLoader(
                                this.props.settings?.slidesToShow
                            )
                        ) : this.state?.specialties?.length > 0 ? (
                            <Slider {...this.props.settings}>
                                {this.state.specialties.map(
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
                        ) : (
                            <h3 className="text-center my-4">
                                Không có chuyên khoa
                            </h3>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

export default Speciallty;
