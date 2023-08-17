import React from "react";
import Slider from "react-slick";
import * as userService from "../../../services/userService";
import _ from "lodash";
import { history } from "../../../redux";

import { FormattedMessage } from "react-intl";
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

    redirectToSpecialtyDetail = (specialtyId, nameSpecialty) => {
        nameSpecialty = nameSpecialty.replaceAll(" ", "-");
        history.push(`/detail-specialty/${specialtyId}/${nameSpecialty}`);
    };

    contentLoader = (quantity) => {
        const result = [];

        if (Number.isInteger(quantity) && quantity > 0)
            for (let i = 1; i <= quantity; i++) {
                result.push(
                    <ContentLoader
                        key={i}
                        width={300}
                        height={200}
                        viewBox="0 0 450 400"
                        backgroundColor="#ededed"
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
                            <h1 className="title">
                                <FormattedMessage id="homepage.specialty" />
                            </h1>
                            <button className="button">
                                <FormattedMessage id="homepage.more" />
                            </button>
                        </div>
                        <Slider {...this.props.settings}>
                            {this.state.isLoadContent ? (
                                this.contentLoader(
                                    this.props.settings?.slidesToShow
                                )
                            ) : this.state?.specialties?.length > 0 ? (
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
                                                        specialty.id,
                                                        specialty.name
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
                                )
                            ) : (
                                <h3 className="text-center my-4">
                                    <FormattedMessage id="homepage.no-specialty" />
                                </h3>
                            )}
                        </Slider>
                    </div>
                </div>
            </>
        );
    }
}

export default Speciallty;
