import React from "react";
import { connect } from "react-redux";
import * as userService from "../../../../services/userService";
import avatar from "../../../../assets/avatar/avatar_default.jpg";
import { languages } from "../../../../utils";

import HomeHeader from "../../HomeHeader";
import HomeFooter from "../../HomeFooter";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";
import ProfileDoctor from "./ProfileDoctor";
import Comment from "../../SocialPlugin/Comment";

import "./DoctorDetail.scss";
require("dotenv").config();

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

        // document.querySelector(".doctor-content .text-content").innerHTML =
        //     this.state.doctor.MarkdownData?.contentHTML;
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

        const currentHref =
            process.env.REACT_APP_IS_LOCALHOST === "0"
                ? window.location.href
                : "https://www.facebook.com/";
        // console.log(
        //     "currentHref: ",
        //     currentHref,
        //     "isLocal: ",
        //     process.env.REACT_APP_IS_LOCALHOST
        // );
        return (
            <>
                <HomeHeader />
                <div className="container">
                    <ProfileDoctor
                        doctorId={doctor.id}
                        isShowLikeShare={true}
                        currentHref={currentHref}
                        isShowDescription={true}
                    />
                </div>
                <div className="schedule-infor_container container">
                    <div className="row">
                        <div className="col-12 col-sm-6">
                            <DoctorSchedule
                                doctorId={doctor.id}
                                handleOpenModal={this.toggleModal}
                            />
                        </div>
                        <div className="col-12 col-sm-6">
                            <DoctorExtraInfor doctorId={doctor.id} />
                        </div>
                    </div>
                </div>
                <div className="doctor-content">
                    <div className="container">
                        <p
                            className="text-content"
                            dangerouslySetInnerHTML={{
                                __html: doctor.MarkdownData?.contentHTML,
                            }}
                        ></p>
                    </div>
                </div>
                {/* <Comment href={currentHref} /> */}
                <HomeFooter />
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
