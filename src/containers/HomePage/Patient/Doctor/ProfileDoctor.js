import React from "react";
import { connect } from "react-redux";
import * as userService from "../../../../services/userService";
import avatar from "../../../../assets/avatar/avatar_default.jpg";
import { languages } from "../../../../utils";
import { Link } from "react-router-dom";
import { FormattedMessage } from "react-intl";
import LikeShare from "../../SocialPlugin/LikeShare";

import "./ProfileDoctor.scss";

class ProfileDoctor extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctor: {},
        };
    }

    componentDidMount = async () => {
        const doctor = await userService.getDoctorDetail(this.props.doctorId);

        this.setState({
            doctor,
        });
    };

    componentDidUpdate = async (prevProps) => {
        if (this.props.doctorId !== prevProps.doctorId) {
            const doctor = await userService.getDoctorDetail(
                this.props.doctorId
            );

            this.setState({
                doctor,
            });
        }
    };

    render() {
        // console.log(this.state);
        const doctor = { ...this.state.doctor };
        const image = doctor.image
            ? Buffer.from(doctor.image).toString()
            : avatar;

        let position =
            this.props.language === languages.VI
                ? doctor.positionData?.valueVi
                : doctor?.positionData?.valueEn;
        return (
            <>
                <div className="doctor-intro">
                    <div className="left">
                        <div
                            className="doctor-avatar"
                            style={{ backgroundImage: `url(${image})` }}
                        ></div>
                        {this.props.isShowMore && (
                            <Link
                                to={`/detail-doctor/${doctor.id}`}
                                className="more-text"
                            >
                                <FormattedMessage id="profile-doctor.more" />
                            </Link>
                        )}
                    </div>
                    <div className="intro-content right">
                        <h3 className="doctor-name">{`${position} || ${doctor.fullName}`}</h3>
                        <span className="description mb-2">
                            {`${doctor.MarkdownData?.description}`}
                        </span>
                        {this.props.isShowLikeShare && (
                            <>
                                {/* <LikeShare href={this.props.currentHref} /> */}
                            </>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor);
