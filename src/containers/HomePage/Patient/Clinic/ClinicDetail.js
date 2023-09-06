import React from "react";
import { connect } from "react-redux";
import * as userService from "../../../../services/userService";
import { languages } from "../../../../utils/constant";
import _ from "lodash";

import HomeHeader from "../../HomeHeader";
import HomeFooter from "../../HomeFooter";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";
import { FormattedMessage } from "react-intl";

import "./ClinicDetail.scss";

class ClinicDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clinic: {},
            listDoctorId: [],
        };
    }

    componentDidMount = async () => {
        const clinicId = this.props.match?.params?.id;
        const clinic = await userService.getClinic(clinicId);

        this.setState(
            {
                clinic,
            },
            async () => {
                const listDoctorId = await userService.getDoctorInforByClinic(clinicId);
                this.setState({
                    listDoctorId,
                });
            }
        );
    };

    handleScrollToElement = (id) => {
        const element = document.getElementById(id).parentElement;

        console.log({ element });

        document.body.scroll({
            left: 0,
            top: element?.offsetTop - 120 || 0,
            behavior: "smooth",
        });
    };

    render() {
        // console.log("Check state: ", this.state);
        const { listDoctorId } = this.state;
        const { name, address, image, introduceHTML, professionalHTML, equipmentHTML, locationHTML, procedureHTML } =
            this.state.clinic;
        const { language } = this.props;
        const imagePreview = image && Buffer.from(image).toString();

        return (
            <>
                <HomeHeader />
                <div className="clinic-detail_overlay ">
                    <div className="clinic-intro container">
                        <div className="clinic-img" style={{ backgroundImage: `url(${imagePreview})` }}></div>
                        <div className="clinic-describe">
                            <h2 className="clinic-name">{name}</h2>
                            <p className="clinic-address">{address}</p>
                        </div>
                    </div>
                    <div className="navigate-clinic-page container">
                        {listDoctorId && listDoctorId.length > 0 && (
                            <a
                                className="item"
                                // href="#list-doctor-title"
                                onClick={() => this.handleScrollToElement("list-doctor-title")}
                            >
                                <FormattedMessage id="clinic-detail.doctor" />
                            </a>
                        )}
                        {introduceHTML && (
                            <a
                                className="item"
                                // href="#introduce"
                                onClick={() => this.handleScrollToElement("introduce")}
                            >
                                <FormattedMessage id="clinic-detail.introduce" />
                            </a>
                        )}
                        {professionalHTML && (
                            <a
                                className="item"
                                // href="#professional"
                                onClick={() => this.handleScrollToElement("professional")}
                            >
                                <FormattedMessage id="clinic-detail.professional" />
                            </a>
                        )}
                        {equipmentHTML && (
                            <a
                                className="item"
                                // href="#equipment"
                                onClick={() => this.handleScrollToElement("equipment")}
                            >
                                <FormattedMessage id="clinic-detail.equipment" />
                            </a>
                        )}
                        {locationHTML && (
                            <a
                                className="item"
                                // href="#location"
                                onClick={() => this.handleScrollToElement("location")}
                            >
                                <FormattedMessage id="clinic-detail.location" />
                            </a>
                        )}
                        {procedureHTML && (
                            <a
                                className="item"
                                // href="#procedure"
                                onClick={() => this.handleScrollToElement("procedure")}
                            >
                                <FormattedMessage id="clinic-detail.procedure" />
                            </a>
                        )}
                    </div>
                    <div className="list-doctor_container container">
                        <p className="list-doctor-title" id="list-doctor-title">
                            <FormattedMessage id="clinic-detail.doctor" />
                        </p>
                        <div className="list-doctor">
                            {(listDoctorId &&
                                !_.isEmpty(listDoctorId) &&
                                listDoctorId.map((doctor, index) => {
                                    return (
                                        <div key={index} className="item-doctor row">
                                            <div className="col-12 col-sm-12 col-md-6">
                                                <ProfileDoctor doctorId={doctor.doctorId} isShowMore={true} />
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6">
                                                <DoctorSchedule
                                                    doctorId={doctor.doctorId}
                                                    handleOpenModal={this.toggleModal}
                                                />
                                                <DoctorExtraInfor doctorId={doctor.doctorId} />
                                            </div>
                                        </div>
                                    );
                                })) || (
                                <h1 className="no-doctor">
                                    <FormattedMessage id="clinic-detail.no-doctor" />
                                </h1>
                            )}
                        </div>
                    </div>
                    <div className="content-container container">
                        {introduceHTML && (
                            <div className="content-item">
                                <p className="title text-left" id="introduce">
                                    <FormattedMessage id="clinic-detail.introduce" />
                                </p>
                                <div
                                    className="introduce"
                                    dangerouslySetInnerHTML={{
                                        __html: introduceHTML,
                                    }}
                                ></div>
                            </div>
                        )}
                        {professionalHTML && (
                            <div className="content-item">
                                <p className="title text-left" id="professional">
                                    <FormattedMessage id="clinic-detail.professional" />
                                </p>
                                <div
                                    className="professional"
                                    dangerouslySetInnerHTML={{
                                        __html: professionalHTML,
                                    }}
                                ></div>
                            </div>
                        )}
                        {equipmentHTML && (
                            <div className="content-item">
                                <p className="title text-left" id="equipment">
                                    <FormattedMessage id="clinic-detail.equipment" />
                                </p>
                                <div
                                    className="equipment"
                                    dangerouslySetInnerHTML={{
                                        __html: equipmentHTML,
                                    }}
                                ></div>
                            </div>
                        )}
                        {locationHTML && (
                            <div className="content-item">
                                <p className="title text-left" id="location">
                                    <FormattedMessage id="clinic-detail.location" />
                                </p>
                                <div
                                    className="location"
                                    dangerouslySetInnerHTML={{
                                        __html: locationHTML,
                                    }}
                                ></div>
                            </div>
                        )}
                        {procedureHTML && (
                            <div className="content-item">
                                <p className="title text-left" id="procedure">
                                    <FormattedMessage id="clinic-detail.procedure" />
                                </p>
                                <div
                                    className="procedure"
                                    dangerouslySetInnerHTML={{
                                        __html: procedureHTML,
                                    }}
                                ></div>
                            </div>
                        )}
                    </div>
                </div>
                <HomeFooter />
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.app.language,
});

const mapDispatchToProps = (dispatch) => ({});

export default connect(mapStateToProps, mapDispatchToProps)(ClinicDetail);
