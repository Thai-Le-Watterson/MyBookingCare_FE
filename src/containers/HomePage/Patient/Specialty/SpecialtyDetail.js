import React from "react";
import { connect } from "react-redux";
import * as userService from "../../../../services/userService";
import { languages } from "../../../../utils/constant";
import _ from "lodash";

import { FormattedMessage } from "react-intl";
import { PuffLoader, BeatLoader } from "react-spinners";
import HomeHeader from "../../HomeHeader";
import HomeFooter from "../../HomeFooter";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfor from "../Doctor/DoctorExtraInfor";

import "./SpecialtyDetail.scss";

class SpecialtyDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            specialty: {},
            provinces: [],
            listDoctorId: [],
            isOverflow: false,
            isLoadListDoctor: false,
            isLoadContent: false,
            isShowFullDescribe: false,
            provinceSelected: "ALL",
        };
    }

    componentDidMount = async () => {
        this.setState({
            isLoadListDoctor: true,
            isLoadContent: true,
        });
        const specialtyId = this.props.match?.params?.id;
        const specialty = await userService.getSpecialty(specialtyId);
        const provinces = await userService.handleGetAllCode("province");
        provinces.unshift({
            keyMap: "ALL",
            valueVi: "Tất cả",
            valueEn: "All",
        });

        this.setState(
            {
                specialty,
                provinces,
                isLoadContent: false,
            },
            async () => {
                const listDoctorId =
                    await userService.getDoctorInforBySpecialty(specialtyId);

                this.setState({
                    listDoctorId:
                        listDoctorId && !_.isEmpty(listDoctorId)
                            ? listDoctorId
                            : [],
                    isLoadListDoctor: false,
                });
            }
        );
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (this.state.specialty != prevState.specialty) {
            const describeElement = document.querySelector(
                ".specialty-describe_container"
            );
            const isOverflow =
                describeElement?.scrollHeight > describeElement?.clientHeight;

            this.setState({
                isOverflow,
            });
        }
    };

    handleShowSpecialtyDescribe = () => {
        this.setState({
            isShowFullDescribe: !this.state.isShowFullDescribe,
        });
    };

    handleSelectedProvince = async (e) => {
        const listDoctorId = await userService.getDoctorInforBySpecialty(
            this.state.specialty.id,
            e.target.value
        );
        this.setState({
            provinceSelected: e.target.value,
            listDoctorId,
        });
    };

    render() {
        console.log("Check state: ", this.state);
        const {
            isOverflow,
            isLoadListDoctor,
            isLoadContent,
            isShowFullDescribe,
            provinces,
            provinceSelected,
            listDoctorId,
        } = this.state;
        const { name, contentHTML, contentMarkDown } = this.state.specialty;
        const { language } = this.props;

        return (
            <>
                <HomeHeader />
                <div className="specialty-detail_overlay">
                    {isLoadContent ? (
                        <div className="loading-container bg-white py-5">
                            <BeatLoader
                                color={"#00fff1"}
                                loading={isLoadListDoctor}
                                size={20}
                            />
                        </div>
                    ) : (
                        <>
                            <div
                                className={`specialty-describe_container ${
                                    isShowFullDescribe ? "" : "height-200"
                                }`}
                            >
                                <div className="container">
                                    <h2 className="specialty-name">{name}</h2>
                                    <p
                                        className="specialty-describe"
                                        dangerouslySetInnerHTML={{
                                            __html: contentHTML,
                                        }}
                                    ></p>
                                </div>
                            </div>
                            <div className="specialty-describe_bottom">
                                <div className="container">
                                    {isOverflow && (
                                        <span
                                            className="read-more"
                                            onClick={() =>
                                                this.handleShowSpecialtyDescribe()
                                            }
                                        >
                                            {isShowFullDescribe ? (
                                                <FormattedMessage id="doctor-specialty.hide" />
                                            ) : (
                                                <FormattedMessage id="doctor-specialty.more" />
                                            )}
                                        </span>
                                    )}
                                </div>
                            </div>
                        </>
                    )}
                    <div className="list-doctor_container container">
                        {isLoadListDoctor ? (
                            <div className="row mt-5 loading-container">
                                <h3 className="text-center loading-title">
                                    The list of doctors is loading
                                </h3>
                                <PuffLoader
                                    color={"#00fff1"}
                                    loading={isLoadListDoctor}
                                    size={150}
                                />
                            </div>
                        ) : listDoctorId && !_.isEmpty(listDoctorId) ? (
                            <>
                                <div className="row">
                                    <select
                                        className="select-province"
                                        onChange={(e) =>
                                            this.handleSelectedProvince(e)
                                        }
                                        defaultValue={provinceSelected}
                                    >
                                        {provinces &&
                                            provinces.length > 0 &&
                                            provinces.map((province, index) => {
                                                return (
                                                    <option
                                                        value={province.keyMap}
                                                    >
                                                        {
                                                            province[
                                                                language ===
                                                                languages.VI
                                                                    ? "valueVi"
                                                                    : "valueEn"
                                                            ]
                                                        }
                                                    </option>
                                                );
                                            })}
                                    </select>
                                </div>
                                <div className="list-doctor">
                                    {listDoctorId.map((doctor, index) => {
                                        return (
                                            <div
                                                key={index}
                                                className="item-doctor row"
                                            >
                                                <div className="col-12 col-sm-12 col-md-6">
                                                    <ProfileDoctor
                                                        doctorId={
                                                            doctor.doctorId
                                                        }
                                                        isShowMore={true}
                                                    />
                                                </div>
                                                <div className="col-12 col-sm-12 col-md-6">
                                                    <DoctorSchedule
                                                        doctorId={
                                                            doctor.doctorId
                                                        }
                                                        handleOpenModal={
                                                            this.toggleModal
                                                        }
                                                    />
                                                    <DoctorExtraInfor
                                                        doctorId={
                                                            doctor.doctorId
                                                        }
                                                    />
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </>
                        ) : (
                            <h1 className="no-doctor">
                                <FormattedMessage id="doctor-specialty.no-specialty" />
                            </h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(SpecialtyDetail);
