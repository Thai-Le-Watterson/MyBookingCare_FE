import React from "react";
import Slider from "react-slick";
import { connect } from "react-redux";
import { languages } from "../../../utils";
import { FormattedMessage } from "react-intl";
import { history } from "../../../redux";
import * as actions from "../../../store/actions/index";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

class OutstandingDoctor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            topDoctors: [],
        };
    }

    componentDidMount() {
        this.props.getTopDoctors("");
    }

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.topDoctors !== this.props.topDoctors) {
            this.setState({
                topDoctors: this.props.topDoctors,
            });
        }
    };

    handleRedirect = (id) => {
        history.push(`/detail-doctor/${id}`);
    };

    render() {
        let language = this.props.language;
        let topDoctors = this.state.topDoctors &&
            this.state.topDoctors.length > 0 && [...this.state.topDoctors];
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
                            {topDoctors &&
                                topDoctors.length > 0 &&
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
                                                    topDoctor.id
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
                                })}
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
