import React from "react";
import { connect } from "react-redux";
import * as userService from "../../../../services/userService";
import avatar from "../../../../assets/avatar/avatar_default.jpg";
import { languages } from "../../../../utils";

import HomeHeader from "../../HomeHeader";
import DoctorSchedule from "./DoctorSchedule";

import "./DoctorDetail.scss";

class DoctorDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            doctor: {},
        };
    }

    componentDidMount = async () => {
        const doctor = await userService.getDoctorDetail(
            this.props.match.params.id
        );

        this.setState({
            doctor,
        });

        document.querySelector(".doctor-content .text-content").innerHTML =
            this.state.doctor.MarkdownData?.contentHTML;
    };

    render() {
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
                <HomeHeader />
                <div className="doctor-intro">
                    <div className="container">
                        <div
                            className="doctor-avatar"
                            style={{ backgroundImage: `url(${image})` }}
                        ></div>
                        <div className="intro-content">
                            <h3 className="doctor-name">{`${position} || ${doctor.fullName}`}</h3>
                            <span className="description">
                                {`${doctor.MarkdownData?.description}`}
                            </span>
                        </div>
                    </div>
                </div>
                <DoctorSchedule />
                <div className="doctor-content">
                    <div className="container">
                        <p className="text-content">
                            {doctor.MarkdownData?.contentHTML}
                        </p>
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
    return {
        // getDoctorDetail: () => dispatch(),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);
