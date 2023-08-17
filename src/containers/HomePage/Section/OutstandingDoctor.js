import React from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import { languages } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { history } from "../../../redux";
import * as actions from "../../../store/actions/index";
import _ from "lodash";

import ContentLoader from "react-content-loader";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class OutstandingDoctor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topDoctors: [],
            isLoadContent: false,
        };
    }

    async componentDidMount() {
        this.setState({
            isLoadContent: true,
        });

        await this.props.getTopDoctors("");

        this.setState({
            isLoadContent: false,
        });
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                topDoctors: this.props.topDoctors,
            });
        }
    };

    handleRedirect = (id, nameDoctor) => {
        nameDoctor = nameDoctor.replaceAll(" ", "-");
        history.push(`/detail-doctor/${id}/${nameDoctor}`);
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
        let language = this.props.language;
        const { isLoadContent } = this.state;
        let topDoctors = this.state?.topDoctors?.length > 0 && [
            ...this.state.topDoctors,
        ];
        // if (topDoctors && topDoctors.length < 4 && topDoctors.length > 0)
        //     topDoctors = topDoctors?.concat(topDoctors)?.concat(topDoctors);
        return (
            <>
                <div className="section-overlay style-circle-img">
                    <div className="section-container">
                        <div className="section-title">
                            <h1 className="title">
                                <FormattedMessage id="homepage.outstanding-doctor" />
                            </h1>
                            <button className="button">
                                <FormattedMessage id="homepage.search" />
                            </button>
                        </div>

                        <Slider {...this.props.settings}>
                            {isLoadContent ? (
                                this.contentLoader(
                                    this.props.settings?.slidesToShow
                                )
                            ) : topDoctors?.length > 0 ? (
                                topDoctors.map((topDoctor, index) => {
                                    const image = topDoctor.image
                                        ? Buffer.from(
                                              topDoctor.image
                                          ).toString()
                                        : "";
                                    return (
                                        <div
                                            className="section-item"
                                            key={index}
                                            onClick={() =>
                                                this.handleRedirect(
                                                    topDoctor.id,
                                                    topDoctor.fullName
                                                )
                                            }
                                        >
                                            <div className="margin-box">
                                                <div
                                                    className="img"
                                                    style={{
                                                        backgroundImage: `url(${image})`,
                                                    }}
                                                ></div>
                                                <p className="name">{`${
                                                    language === languages.VI
                                                        ? topDoctor.positionData
                                                              .valueVi
                                                        : topDoctor.positionData
                                                              .valueEn
                                                }, ${topDoctor.fullName}`}</p>
                                                <span className="specialist">
                                                    Cơ xương khớp
                                                </span>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <h3 className="text-center my-4">
                                    Không có bác sĩ
                                </h3>
                            )}
                        </Slider>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        topDoctors: state.admin.topDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTopDoctors: (limit) => dispatch(actions.fetchTopDoctorStart(limit)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor);
