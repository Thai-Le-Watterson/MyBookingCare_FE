import React from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Select from "react-select";
import * as acitions from "../../store/actions/index";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import TableUser from "./TableUser";
import { getDoctorDetail } from "../../services/userService";
import { CRUD } from "../../utils/constant";

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
        };
    }

    componentDidMount = () => {
        this.props.getAllDoctor();
    };

    componentDidUpdate = (prevProps, prevState) => {
        if (prevProps.doctors !== this.props.doctors) {
            this.setState({
                doctors: this.props.doctors,
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

    handleOnChangeSelect = async (selectDoctor) => {
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
        this.setState({
            ...copyState,
        });
        console.log(this.state);
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

    render() {
        const mdParser = new MarkdownIt();
        const options = this.state.doctors.map((doctor) => {
            return { value: doctor.id, label: doctor.fullName };
        });

        return (
            <>
                <div className="doctor-manage_container">
                    <div className="title">
                        <FormattedMessage id="manage-doctor-detail.title" />
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col">
                                <label className="form-label">
                                    <FormattedMessage id="manage-doctor-detail.choose-doctor" />
                                </label>
                                <Select
                                    value={this.state.doctorId}
                                    options={options}
                                    onChange={this.handleOnChangeSelect}
                                />
                            </div>
                            <div className="col">
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
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctor: () => dispatch(acitions.fetchAllDoctorStart()),
        createMarkdown: (data) => dispatch(acitions.createMarkdownStart(data)),
        updateMarkdown: (data) => dispatch(acitions.updateMarkdownStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
