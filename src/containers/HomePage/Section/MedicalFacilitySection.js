import React from "react";
import Slider from "react-slick";
// import { connect } from "react-redux";
import * as userService from "../../../services/userService";
import { FormattedMessage } from "react-intl";
import _ from "lodash";
import { history } from "../../../redux";
import { path } from "../../../utils";

import ContentLoader from "react-content-loader";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class MedicalFacilitySection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clinics: [],
            isLoadContent: false,
        };
    }

    componentDidMount = async () => {
        this.setState({
            isLoadContent: true,
        });

        const clinics = await userService.getAllClinic();

        if (clinics && !_.isEmpty(clinics))
            this.setState({
                clinics,
            });

        this.setState({
            isLoadContent: false,
        });
    };

    redirectToClinicDetail = (id, nameClinic) => {
        nameClinic = nameClinic.replaceAll(" ", "-");
        history.push(`/clinic/${id}/${nameClinic}`);
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
        // console.log("check clinics: ", this.state);
        const { clinics, isLoadContent } = this.state;
        return (
            <>
                <div className="section-overlay section-bg">
                    <div className="section-container">
                        <div className="section-title">
                            <h1 className="title">
                                <FormattedMessage id="homepage.clinic" />
                            </h1>
                            <button
                                className="button"
                                onClick={() => history.push(path.CLINIC_PAGE)}
                            >
                                <FormattedMessage id="homepage.search" />
                            </button>
                        </div>

                        <Slider {...this.props.settings}>
                            {isLoadContent ? (
                                this.contentLoader(
                                    this.props.settings?.slidesToShow
                                )
                            ) : clinics?.length > 0 ? (
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
                                                    clinic.id,
                                                    clinic.name
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
                                })
                            ) : (
                                <h3 className="text-center my-4">
                                    <FormattedMessage id="homepage.no-clinic" />
                                </h3>
                            )}
                        </Slider>
                    </div>
                </div>
            </>
        );
    }
}

export default MedicalFacilitySection;
