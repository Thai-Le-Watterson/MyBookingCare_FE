import React from "react";
import * as acitions from "../../store/actions/index";
import { connect } from "react-redux";
import {
    getDoctorDetail,
    createDoctorInfor,
    updateDoctorInfor,
} from "../../services/userService";
import { CRUD, languages } from "../../utils/constant";
import _ from "lodash";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { FormattedMessage } from "react-intl";
import Select from "react-select";
import TableUser from "./TableUser";

import "./DoctorManage.scss";
import "react-markdown-editor-lite/lib/index.css";

class DoctorManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectDoctor: null,
            contents: {
                contentHTML: "",
                contentMarkDown: "",
                description: "",
            },
            doctors: [],
            action: CRUD.CREATE,

            requireDoctorInfor: {},
            payment: "",
            price: "",
            province: "",
            clinic: "",
            specialty: "",
            addressClinic: "",
            nameClinic: "",
            note: "",
            acitionDrInfor: CRUD.CREATE,
        };
    }

    componentDidMount = async () => {
        this.props.getAllDoctor();
        await this.props.getRequireDoctorInfor();
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.doctors !== this.props.doctors) {
            this.setState({
                doctors: this.props.doctors,
            });
        }
        if (prevProps.requireDoctorInfor !== this.props.requireDoctorInfor) {
            this.setState({
                requireDoctorInfor: this.props.requireDoctorInfor,
            });
        }
    };

    handleEditorChange = ({ html, text }) => {
        const copyState = { ...this.state };
        copyState.contents.contentHTML = html;
        copyState.contents.contentMarkDown = text;

        this.setState({
            ...copyState,
        });
    };

    handleOnChangeDescription = (e) => {
        const copyState = { ...this.state };
        copyState.contents.description = e.target.value;
        this.setState({
            ...copyState,
        });
    };

    handleOnChangeText = (e, type) => {
        const copyState = { ...this.state };
        copyState[type] = e.target.value;
        this.setState({
            ...copyState,
        });
    };

    handleOnChangeSelectDoctor = async (selectDoctor) => {
        const doctor = await getDoctorDetail(selectDoctor.value);
        console.log(doctor);
        const isNotMarkdown = this.checkValueData(doctor.MarkdownData);
        const copyState = { ...this.state };

        copyState.selectDoctor = selectDoctor;
        copyState.action = isNotMarkdown ? CRUD.CREATE : CRUD.UPDATE;
        copyState.contents = {
            contentHTML: doctor.MarkdownData.contentHTML || "",
            contentMarkDown: doctor.MarkdownData.contentMarkDown || "",
            description: doctor.MarkdownData.description || "",
        };

        const {
            paymentId,
            priceId,
            provinceId,
            addressClinic,
            nameClinic,
            note,
            specialtyData,
            paymentData,
            priceData,
            provinceData,
        } = doctor.doctorInforData;
        const isNotExistDoctorInforData = this.checkValueData({
            paymentId,
            priceId,
            provinceId,
            addressClinic,
            nameClinic,
        });
        copyState.acitionDrInfor = isNotExistDoctorInforData
            ? CRUD.CREATE
            : CRUD.UPDATE;

        let payment = this.buildOptionSelect(
            paymentData,
            "keyMap",
            this.props.language === languages.VI ? "valueVi" : "valueEn"
        );
        let price = this.buildOptionSelect(
            priceData,
            "keyMap",
            this.props.language === languages.VI ? "valueVi" : "valueEn"
        );
        let province = this.buildOptionSelect(
            provinceData,
            "keyMap",
            this.props.language === languages.VI ? "valueVi" : "valueEn"
        );
        let specialty = this.buildOptionSelect(specialtyData, "id", "name");

        copyState.payment = payment || {};
        copyState.price = price || {};
        copyState.province = province || {};
        copyState.specialty = specialty || {};
        copyState.addressClinic = addressClinic || "";
        copyState.nameClinic = nameClinic || "";
        copyState.note = note || "";

        this.setState({
            ...copyState,
        });
    };

    handleOnChangeSelect = async (value, actionMeta) => {
        const stringAttr = actionMeta.name;
        this.setState({
            [stringAttr]: value,
        });
    };

    handleSaveMarkdown = () => {
        const isNotValid = this.checkValueData(this.state.contents);
        if (!isNotValid) {
            const dataRequest = {
                contentHTML: this.state.contents.contentHTML,
                contentMarkDown: this.state.contents.contentMarkDown,
                description: this.state.contents.description,
                selectDoctorId: this.state.selectDoctor.value,
            };
            this.props.createMarkdown(dataRequest);
        }
    };

    handleUpdateMarkdown = () => {
        const isNotValid = this.checkValueData(this.state.contents);

        if (!isNotValid) {
            const dataRequest = {
                contentHTML: this.state.contents.contentHTML,
                contentMarkDown: this.state.contents.contentMarkDown,
                description: this.state.contents.description,
                selectDoctorId: this.state.selectDoctor.value,
            };
            this.props.updateMarkdown(dataRequest);
        }
    };

    handleSaveDoctorInfor = async () => {
        const dataRequest = this.buildRequestDataDoctorInfor(this.state);
        const isNotValid = this.checkValueData(dataRequest);
        console.log("check dataRequest: ", dataRequest);
        console.log("check isNotValid: ", isNotValid);
        if (
            !isNotValid ||
            isNotValid === "note" ||
            isNotValid === "specialtyId" ||
            isNotValid === "clinicId"
        ) {
            if (this.state.acitionDrInfor === CRUD.CREATE) {
                const res = await createDoctorInfor(dataRequest);
            } else if (this.state.acitionDrInfor === CRUD.UPDATE) {
                const res = await updateDoctorInfor(dataRequest);
            }
        }
    };

    checkValueData = (obj) => {
        return Object.keys(obj).find((item) => {
            return !obj[item];
        });
    };

    buildRequestDataDoctorInfor = (obj) => {
        return {
            doctorId: this.state.selectDoctor.value,
            priceId: obj.price.value,
            provinceId: obj.province.value,
            paymentId: obj.payment.value,
            specialtyId: obj.specialty.value,
            clinicId: obj.clinic.value,
            addressClinic: obj.addressClinic,
            nameClinic: obj.nameClinic,
            note: obj.note,
        };
    };

    buildOptionSelect = (obj, value, label) => {
        if (Array.isArray(obj)) {
            if (obj && obj.length > 0)
                return obj.map((item) => {
                    if (item[value] && item[label])
                        return {
                            value: item[value],
                            label: item[label],
                        };
                });
        } else {
            if (!_.isEmpty(obj)) {
                return {
                    value: obj[value],
                    label: obj[label],
                };
            }
        }
    };

    render() {
        const mdParser = new MarkdownIt();

        return (
            <>
                <div className="doctor-manage_container">
                    <div className="title">
                        <FormattedMessage id="manage-doctor-detail.title" />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-4">
                                <label className="form-label">
                                    <FormattedMessage id="manage-doctor-detail.choose-doctor" />
                                </label>
                                <Select
                                    value={this.state.doctorId}
                                    options={this.buildOptionSelect(
                                        this.state.doctors,
                                        "id",
                                        "fullName"
                                    )}
                                    onChange={this.handleOnChangeSelectDoctor}
                                    placeholder={
                                        <FormattedMessage id="manage-doctor-detail.select" />
                                    }
                                />
                            </div>
                            <div className="col-8">
                                <label className="form-label">
                                    <FormattedMessage id="manage-doctor-detail.description" />
                                </label>
                                <textarea
                                    className="detail-doctor"
                                    value={this.state.contents.description}
                                    rows={4}
                                    onChange={(e) =>
                                        this.handleOnChangeDescription(e)
                                    }
                                ></textarea>
                            </div>
                        </div>
                    </div>
                    <div className="doctor-infor_container container">
                        <div className="row">
                            <div className="col-4 my-2">
                                <label className="form-label">
                                    <FormattedMessage id="manage-doctor-detail.extra-infor.choose-payment" />
                                </label>
                                <Select
                                    name="payment"
                                    value={this.state.payment}
                                    options={this.buildOptionSelect(
                                        this.state.requireDoctorInfor &&
                                            this.state.requireDoctorInfor
                                                .data_payment,
                                        "keyMap",
                                        this.props.language === languages.Vi
                                            ? "valueVi"
                                            : "valueEn"
                                    )}
                                    onChange={this.handleOnChangeSelect}
                                    placeholder={
                                        <FormattedMessage id="manage-doctor-detail.select" />
                                    }
                                />
                            </div>
                            <div className="col-4 my-2">
                                <label className="form-label">
                                    <FormattedMessage id="manage-doctor-detail.extra-infor.choose-price" />
                                </label>
                                <Select
                                    value={this.state.price}
                                    name="price"
                                    options={this.buildOptionSelect(
                                        this.state.requireDoctorInfor &&
                                            this.state.requireDoctorInfor
                                                .data_price,
                                        "keyMap",
                                        this.props.language === languages.Vi
                                            ? "valueVi"
                                            : "valueEn"
                                    )}
                                    onChange={this.handleOnChangeSelect}
                                    placeholder={
                                        <FormattedMessage id="manage-doctor-detail.select" />
                                    }
                                />
                            </div>
                            <div className="col-4 my-2">
                                <label className="form-label">
                                    <FormattedMessage id="manage-doctor-detail.extra-infor.choose-province" />
                                </label>
                                <Select
                                    value={this.state.province}
                                    name="province"
                                    options={this.buildOptionSelect(
                                        this.state.requireDoctorInfor &&
                                            this.state.requireDoctorInfor
                                                .data_province,
                                        "keyMap",
                                        this.props.language === languages.Vi
                                            ? "valueVi"
                                            : "valueEn"
                                    )}
                                    onChange={this.handleOnChangeSelect}
                                    placeholder={
                                        <FormattedMessage id="manage-doctor-detail.select" />
                                    }
                                />
                            </div>
                            <div className="col-4 my-2">
                                <label className="form-label">
                                    <FormattedMessage id="manage-doctor-detail.extra-infor.name-clinic" />
                                </label>
                                <input
                                    value={this.state.nameClinic}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) =>
                                        this.handleOnChangeText(e, "nameClinic")
                                    }
                                />
                            </div>
                            <div className="col-4 my-2">
                                <label className="form-label">
                                    <FormattedMessage id="manage-doctor-detail.extra-infor.address-clinic" />
                                </label>
                                <input
                                    value={this.state.addressClinic}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) =>
                                        this.handleOnChangeText(
                                            e,
                                            "addressClinic"
                                        )
                                    }
                                />
                            </div>
                            <div className="col-4 my-2">
                                <label className="form-label">
                                    <FormattedMessage id="manage-doctor-detail.extra-infor.note" />
                                </label>
                                <input
                                    value={this.state.note}
                                    type="text"
                                    className="form-control"
                                    onChange={(e) =>
                                        this.handleOnChangeText(e, "note")
                                    }
                                />
                            </div>
                            <div className="col-4 my-2">
                                <label className="form-label">
                                    <FormattedMessage id="manage-doctor-detail.extra-infor.choose-specialty" />
                                </label>
                                <Select
                                    value={this.state.specialty}
                                    name="specialty"
                                    options={this.buildOptionSelect(
                                        this.state.requireDoctorInfor &&
                                            this.state.requireDoctorInfor
                                                .data_specialties,
                                        "id",
                                        "name"
                                    )}
                                    onChange={this.handleOnChangeSelect}
                                    placeholder={
                                        <FormattedMessage id="manage-doctor-detail.select" />
                                    }
                                />
                            </div>
                            <div className="col-4 my-2">
                                <label className="form-label">
                                    <FormattedMessage id="manage-doctor-detail.extra-infor.choose-clinic" />
                                </label>
                                <Select
                                    value={this.state.clinic}
                                    name="clinic"
                                    options={this.buildOptionSelect(
                                        this.state.requireDoctorInfor &&
                                            this.state.requireDoctorInfor
                                                .data_clinic,
                                        "id",
                                        "name"
                                    )}
                                    onChange={this.handleOnChangeSelect}
                                    placeholder={
                                        <FormattedMessage id="manage-doctor-detail.select" />
                                    }
                                />
                            </div>
                        </div>
                    </div>
                    <div className="markdown-container container">
                        <MdEditor
                            value={this.state.contents.contentMarkDown}
                            style={{ height: "400px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                        />
                        <button
                            className={`btn ${
                                this.state.action === CRUD.CREATE
                                    ? "btn-primary"
                                    : "btn-warning"
                            }`}
                            onClick={() => {
                                this.state.action === CRUD.CREATE
                                    ? this.handleSaveMarkdown()
                                    : this.handleUpdateMarkdown();
                                this.handleSaveDoctorInfor();
                            }}
                        >
                            <FormattedMessage id="manage-doctor-detail.save" />
                        </button>
                    </div>
                    <TableUser isEdit={false} users={this.state.doctors} />
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        doctors: state.admin.allDoctors,
        requireDoctorInfor: state.admin.requireDoctorInfor,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctor: () => dispatch(acitions.fetchAllDoctorStart()),
        createMarkdown: (data) => dispatch(acitions.createMarkdownStart(data)),
        updateMarkdown: (data) => dispatch(acitions.updateMarkdownStart(data)),
        getRequireDoctorInfor: () =>
            dispatch(acitions.fetchRequireDoctorInforStart()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
