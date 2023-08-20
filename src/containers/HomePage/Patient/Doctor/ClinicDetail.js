import React from "react";
import { connect } from "react-redux";
import * as userService from "../../../../services/userService";
import { languages } from "../../../../utils/constant";
import _ from "lodash";

import HomeHeader from "../../HomeHeader";
import HomeFooter from "../../HomeFooter";
import ProfileDoctor from "./ProfileDoctor";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtraInfor from "./DoctorExtraInfor";

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
                const listDoctorId = await userService.getDoctorInforByClinic(
                    clinicId
                );
                this.setState({
                    listDoctorId,
                });
            }
        );
    };

    componentDidUpdate = (prevProps, prevState) => {};

    render() {
        console.log("Check state: ", this.state);
        const { listDoctorId } = this.state;
        const {
            name,
            address,
            image,
            introduceHTML,
            professionalHTML,
            equipmentHTML,
            locationHTML,
            procedureHTML,
        } = this.state.clinic;
        const { language } = this.props;
        const imagePreview = image && Buffer.from(image).toString();

        return (
            <>
                <HomeHeader />
                <div className="clinic-detail_overlay ">
                    <div className="clinic-intro container">
                        <div
                            className="clinic-img"
                            style={{ backgroundImage: `url(${imagePreview})` }}
                        ></div>
                        <div className="clinic-describe">
                            <h2 className="clinic-name">{name}</h2>
                            <p className="clinic-address">{address}</p>
                        </div>
                    </div>
                    <div className="navigate-clinic-page container">
                        {listDoctorId && listDoctorId.length > 0 && (
                            <a className="item" href="#list-doctor-title">
                                Bác sĩ
                            </a>
                        )}
                        {introduceHTML && (
                            <a className="item" href="#introduce">
                                GIỚI THIỆU
                            </a>
                        )}
                        {professionalHTML && (
                            <a className="item" href="#professional">
                                THẾ MẠNH CHUYÊN MÔN
                            </a>
                        )}
                        {equipmentHTML && (
                            <a className="item" href="#equipment">
                                TRANG THIẾT BỊ
                            </a>
                        )}
                        {locationHTML && (
                            <a className="item" href="#location">
                                VỊ TRÍ
                            </a>
                        )}
                        {procedureHTML && (
                            <a className="item" href="#procedure">
                                QUY TRÌNH ĐI KHÁM
                            </a>
                        )}
                    </div>
                    <div className="list-doctor_container container">
                        <p className="list-doctor-title" id="list-doctor-title">
                            Bác sĩ
                        </p>
                        <div className="list-doctor">
                            {(listDoctorId &&
                                !_.isEmpty(listDoctorId) &&
                                listDoctorId.map((doctor, index) => {
                                    return (
                                        <div
                                            key={index}
                                            className="item-doctor row"
                                        >
                                            <div className="col-12 col-sm-12 col-md-6">
                                                <ProfileDoctor
                                                    doctorId={doctor.doctorId}
                                                    isShowMore={true}
                                                />
                                            </div>
                                            <div className="col-12 col-sm-12 col-md-6">
                                                <DoctorSchedule
                                                    doctorId={doctor.doctorId}
                                                    handleOpenModal={
                                                        this.toggleModal
                                                    }
                                                />
                                                <DoctorExtraInfor
                                                    doctorId={doctor.doctorId}
                                                />
                                            </div>
                                        </div>
                                    );
                                })) || (
                                <h1 className="no-doctor">
                                    Không tìm thấy bác sĩ thuộc khu phòng khám
                                    này!
                                </h1>
                            )}
                        </div>
                    </div>
                    <div className="content-container container">
                        {introduceHTML && (
                            <div className="content-item">
                                <p className="title text-left" id="introduce">
                                    Giới thiệu
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
                                <p
                                    className="title text-left"
                                    id="professional"
                                >
                                    Thế mạnh chuyên môn
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
                                    Trang thiết bị
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
                                    Vị trí
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
                                    Qyu trình đi khám
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
