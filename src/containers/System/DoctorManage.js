import React from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Select from "react-select";
import * as acitions from "../../store/actions/index";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import TableUser from "./TableUser";
import { getDoctorDetail } from "../../services/userService";
import { CRUD, languages } from "../../utils/constant";

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
            addressClinic: "",
            nameClinic: "",
            note: "",
        };
    }

    componentDidMount = async () => {
        this.props.getAllDoctor();
        await this.props.getRequireDoctorInfor();
        console.log(this.state);
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

    handleOnChangeSelectDoctor = async (selectDoctor) => {
        const doctor = await getDoctorDetail(selectDoctor.value);
        const isNotMarkdown = this.checkValueData(doctor.MarkdownData);
        const copyState = { ...this.state };

        copyState.selectDoctor = selectDoctor;
        copyState.action = isNotMarkdown ? CRUD.CREATE : CRUD.UPDATE;
        copyState.contents = {
            contentHTML: doctor.MarkdownData.contentHTML || "",
            contentMarkDown: doctor.MarkdownData.contentMarkDown || "",
            description: doctor.MarkdownData.description || "",
        };

        copyState.payment = doctor.doctorInforData.payment || {};
        copyState.price = doctor.doctorInforData.price || {};
        copyState.province = doctor.doctorInforData.province || {};
        copyState.addressClinic = doctor.doctorInforData.addressClinic || "";
        copyState.nameClinic = doctor.doctorInforData.nameClinic || "";
        copyState.note = doctor.doctorInforData.note || "";

        this.setState(
            {
                ...copyState,
            },
            () => console.log(this.state)
        );
    };

    handleOnChangeSelect = async (value, actionMeta) => {
        const stringAttr = actionMeta.name;
        this.setState(
            {
                [stringAttr]: value,
            },
            () => console.log(this.state)
        );
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

    checkValueData = (obj) => {
        return Object.keys(obj).find((item) => {
            return !obj[item];
        });
    };

    buildOptionSelect = (obj, value, label) => {
        if (obj && obj.length > 0)
            return obj.map((item) => {
                if (item[value] && item[label])
                    return {
                        value: item[value],
                        label: item[label],
                    };
            });
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
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-4 my-2">
                                <label className="form-label">
                                    <FormattedMessage id="manage-doctor-detail.extra-infor.address-clinic" />
                                </label>
                                <input type="text" className="form-control" />
                            </div>
                            <div className="col-4 my-2">
                                <label className="form-label">
                                    <FormattedMessage id="manage-doctor-detail.extra-infor.note" />
                                </label>
                                <input type="text" className="form-control" />
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
