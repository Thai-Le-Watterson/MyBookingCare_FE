import React from "react";
import { connect } from "react-redux";
import * as userService from "../../../../services/userService";
import avatar from "../../../../assets/avatar/avatar_default.jpg";
import { languages } from "../../../../utils";

import HomeHeader from "../../HomeHeader";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";
import ProfileDoctor from "./ProfileDoctor";

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
                <div className="container">
                    <ProfileDoctor doctorId={doctor.id} />
                </div>
                <div className="schedule-infor_container container">
                    <div className="row">
                        <div className="col">
                            <DoctorSchedule
                                doctorId={doctor.id}
                                handleOpenModal={this.toggleModal}
                            />
                        </div>
                        <div className="col">
                            <DoctorExtraInfor doctorId={doctor.id} />
                        </div>
                    </div>
                </div>
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorDetail);
