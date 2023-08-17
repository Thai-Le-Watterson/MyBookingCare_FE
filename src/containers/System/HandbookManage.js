import React from "react";
import { connect } from "react-redux";
import MarkdownIt from "markdown-it";
import { CommonUtils } from "../../utils";
import moment from "moment";
import { dateFormat } from "../../utils";
import { languages } from "../../utils";
import { ToastContainer, toast } from "react-toastify";
import _ from "lodash";
import avatar from "../../assets/avatar/avatar_default.jpg";
import * as userService from "../../services/userService";
import * as actions from "../../store/actions/appActions";

import Select from "react-select";
import Lightbox from "react-image-lightbox";
import { FormattedMessage } from "react-intl";
import MdEditor from "react-markdown-editor-lite";
import DatePicker from "../../components/Input/DatePicker";
import { PulseLoader } from "react-spinners";

import "./HandbookManage.scss";

class HandbookManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            image: "",
            contentHTML: "",
            contentMarkDown: "",
            isOpen: false,
            category: "",
            doctor: "",
            allCategory: [],
            allDoctor: [],
            date: moment(new Date()).format(dateFormat.SEND_TO_SERVER),
            updateDate: moment(new Date()).format(dateFormat.SEND_TO_SERVER),
        };
    }

    componentDidMount = async () => {
        const allCategory = await userService.getAllCategoryHandbook("-1", "0");
        const allDoctor = await userService.getAllDoctors();

        if (allCategory && !_.isEmpty(allCategory)) {
            this.setState({
                allCategory,
            });
        }
        if (allDoctor && !_.isEmpty(allDoctor)) {
            this.setState({
                allDoctor,
            });
        }
    };

    componentDidUpdate = (prevProps, prevState) => {};

    handleEditorChange = ({ html, text }) => {
        this.setState({
            contentHTML: html,
            contentMarkDown: text,
        });
    };

    handleOnChangeInput = (e, key) => {
        this.setState({
            [key]: e.target.value,
        });
    };

    handleOnnchangeImg = async (file) => {
        if (file) {
            const base64 = await CommonUtils.toBase64(file);

            const copState = { ...this.state };
            copState.image = base64;

            this.setState({
                ...copState,
            });
        }
    };

    handleOpenLightBox = () => {
        this.setState({
            isOpen: true,
        });
    };

    handleChangeDatePicker = (arg, name) => {
        // console.log(moment(arg[0]).format(dateFormat.SEND_TO_SERVER));

        this.setState({
            [name]: moment(arg[0]).format(dateFormat.SEND_TO_SERVER),
        });

        console.log("check date: ", this.state.date);
        console.log("check updateDate: ", this.state.updateDate);
    };

    handleOnChangeSelect = async (value, actionMeta) => {
        const stringAttr = actionMeta.name;
        this.setState({
            [stringAttr]: value,
        });
        // console.log(actionMeta);
    };

    handleSaveHandbook = async () => {
        const dataRequest = this.buildDataRequest();
        const emptyData = this.checkValueData(dataRequest);
        // console.log("check dataRequest: ", dataRequest);

        if (!emptyData) {
            this.props.setLoadingStatePage(true);

            const res = await userService.createHandbook(dataRequest);

            this.props.setLoadingStatePage(false);

            if (res.errCode === 0) toast.success(res.message);
            else toast.error(res.message);
        } else {
            toast.error(`${emptyData} is empty`);
        }
    };

    buildDataRequest = () => {
        return {
            name: this.state.name,
            categoryId: this.state.category.value,
            doctorId: this.state.doctor.value,
            publicationDate: this.state.date,
            updateDate: this.state.updateDate,
            image: this.state.image,
            contentHTML: this.state.contentHTML,
            contentMarkDown: this.state.contentMarkDown,
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

    checkValueData = (obj) => {
        if (obj) {
            return Object.keys(obj).find((item) => {
                return !obj[item];
            });
        }
    };

    render() {
        // console.log("check state: ", this.state);
        const mdParser = MarkdownIt();
        const {
            contentMarkDown,
            date,
            updateDate,
            image,
            isOpen,
            name,
            category,
            allCategory,
            doctor,
            allDoctor,
        } = this.state;

        return (
            <>
                {isOpen && (
                    <Lightbox
                        mainSrc={image || avatar}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
                <div className="handbook-manage_container container">
                    <div className="handbook-manage_title text-center mb-4">
                        <FormattedMessage id="manage-handbook.title" />
                    </div>
                    <div className="row mb-4">
                        <div className="col-8 row">
                            <div className="col-12 mb-4">
                                <label className="form-label">
                                    <FormattedMessage id="manage-handbook.name" />
                                </label>
                                <input
                                    type="text"
                                    className="form-control"
                                    value={name}
                                    onChange={(e) =>
                                        this.handleOnChangeInput(e, "name")
                                    }
                                />
                            </div>
                            <div className="col-6 mb-4">
                                <label className="form-label">
                                    <FormattedMessage id="manage-handbook.doctor" />
                                </label>
                                <Select
                                    value={doctor}
                                    name="doctor"
                                    options={
                                        allDoctor && allDoctor.length > 0
                                            ? this.buildOptionSelect(
                                                  allDoctor,
                                                  "id",
                                                  "fullName"
                                              )
                                            : [
                                                  {
                                                      value: "",
                                                      label: "Loading data...",
                                                  },
                                              ]
                                    }
                                    onChange={this.handleOnChangeSelect}
                                    placeholder={
                                        <FormattedMessage id="manage-doctor-detail.select" />
                                    }
                                />
                            </div>
                            <div className="col-6 mb-4">
                                <label className="form-label">
                                    <FormattedMessage id="manage-handbook.category" />
                                </label>
                                <Select
                                    value={category}
                                    name="category"
                                    options={
                                        allCategory && allCategory.length > 0
                                            ? this.buildOptionSelect(
                                                  allCategory,
                                                  "id",
                                                  "name"
                                              )
                                            : [
                                                  {
                                                      value: "",
                                                      label: "Loading data...",
                                                  },
                                              ]
                                    }
                                    onChange={this.handleOnChangeSelect}
                                    placeholder={
                                        <FormattedMessage id="manage-doctor-detail.select" />
                                    }
                                />
                            </div>
                            <div className="col-6 mb-4 date-picker_container">
                                <label className="form-label">
                                    <FormattedMessage id="manage-handbook.publication-date" />
                                </label>
                                <DatePicker
                                    value={date}
                                    onChange={(arg) =>
                                        this.handleChangeDatePicker(arg, "date")
                                    }
                                    className="form-control"
                                />
                            </div>
                            <div className="col-6 mb-4 date-picker_container">
                                <label className="form-label">
                                    <FormattedMessage id="manage-handbook.update-day" />
                                </label>
                                <DatePicker
                                    value={updateDate}
                                    onChange={(arg) =>
                                        this.handleChangeDatePicker(
                                            arg,
                                            "updateDate"
                                        )
                                    }
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="col-4">
                            <p className="form-label text-center">
                                <FormattedMessage id="manage-handbook.image" />
                            </p>
                            <div className="image-container">
                                <label
                                    className="img-label"
                                    htmlFor="avatar"
                                    style={{
                                        backgroundImage: `url(${
                                            (image && image) || avatar
                                        })`,
                                    }}
                                ></label>
                                <i
                                    className="fa-solid fa-expand icon-fullsize"
                                    onClick={() => this.handleOpenLightBox()}
                                ></i>
                            </div>
                            <input
                                type="file"
                                className="form-control"
                                name="avatar"
                                id="avatar"
                                hidden
                                accept="image/*"
                                onChange={(e) =>
                                    this.handleOnnchangeImg(e.target.files[0])
                                }
                            />
                        </div>
                    </div>
                    <div className="row mb-4">
                        <div className="col-12">
                            <label className="form-label">
                                <FormattedMessage id="manage-handbook.content" />
                            </label>
                            <MdEditor
                                value={contentMarkDown}
                                style={{ height: "400px" }}
                                renderHTML={(text) => mdParser.render(text)}
                                onChange={({ html, text }) =>
                                    this.handleEditorChange({ html, text })
                                }
                            />
                        </div>
                    </div>
                    <button
                        className="btn btn-primary mb-5"
                        onClick={() => this.handleSaveHandbook()}
                    >
                        <FormattedMessage id="manage-handbook.save" />
                    </button>
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
        setLoadingStatePage: (isLoading) =>
            dispatch(actions.setLoadingStatePage(isLoading)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(HandbookManage);
