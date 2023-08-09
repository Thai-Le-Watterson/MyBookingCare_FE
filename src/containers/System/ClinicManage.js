import React from "react";
import MarkdownIt from "markdown-it";
import { CommonUtils } from "../../utils";
import { toast } from "react-toastify";
import * as userService from "../../services/userService";
import { connect } from "react-redux";

import { FormattedMessage } from "react-intl";
import MdEditor from "react-markdown-editor-lite";
import Slider from "react-slick";

import "./ClinicManage.scss";

class SampleNextArrow extends React.Component {
    // { className, style, onClick } = this.props;
    render() {
        return (
            <div className={this.props.className} onClick={this.props.onClick}>
                <i className="fa-solid fa-angle-right"></i>
            </div>
        );
    }
}

class SamplePrevArrow extends React.Component {
    // { className, style, onClick } = this.props;
    render() {
        return (
            <div className={this.props.className} onClick={this.props.onClick}>
                <i className="fa-solid fa-angle-left"></i>
            </div>
        );
    }
}

class ClinicManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clinics: [],
            image: "",
            name: "",
            address: "",
            introduce: {
                contentHTML: "",
                contentMarkDown: "",
            },
            professional: {
                contentHTML: "",
                contentMarkDown: "",
            },
            equipment: {
                contentHTML: "",
                contentMarkDown: "",
            },
            location: {
                contentHTML: "",
                contentMarkDown: "",
            },
            procedure: {
                contentHTML: "",
                contentMarkDown: "",
            },
        };
    }

    handleEditorChange = ({ html, text }, name) => {
        const copyState = { ...this.state };
        copyState[name].contentHTML = html;
        copyState[name].contentMarkDown = text;

        this.setState({
            ...copyState,
        });
    };

    handleOnChangeInput = (e, type) => {
        const copyState = { ...this.state };
        copyState[type] = e.target.value;
        this.setState({
            ...copyState,
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

    handleSaveSpecialty = async () => {
        const dataResuest = this.bulidDataResuest(this.state);
        const emptyData = this.checkValueData(dataResuest);

        if (
            !emptyData ||
            emptyData == "procedureHTML" ||
            emptyData == "procedureMarkDown"
        ) {
            const res = await userService.createClinic(dataResuest);

            this.setState({
                image: "",
                name: "",
                address: "",
                introduce: {
                    contentHTML: "",
                    contentMarkDown: "",
                },
                professional: {
                    contentHTML: "",
                    contentMarkDown: "",
                },
                equipment: {
                    contentHTML: "",
                    contentMarkDown: "",
                },
                location: {
                    contentHTML: "",
                    contentMarkDown: "",
                },
                procedure: {
                    contentHTML: "",
                    contentMarkDown: "",
                },
            });

            if (res.errCode === 0) toast.success(res.message);
            else toast.error(res.message);
        } else {
            toast.error(emptyData + " is empty");
        }
    };

    bulidDataResuest = (state) => {
        const data = {
            name: state.name,
            address: state.address,
            image: state.image,
            introduceHTML: state.introduce.contentHTML,
            introduceMarkDown: state.introduce.contentMarkDown,
            professionalHTML: state.professional.contentHTML,
            professionalMarkDown: state.professional.contentMarkDown,
            equipmentHTML: state.equipment.contentHTML,
            equipmentMarkDown: state.equipment.contentMarkDown,
            locationHTML: state.location.contentHTML,
            locationMarkDown: state.location.contentMarkDown,
            procedureHTML: state.procedure.contentHTML,
            procedureMarkDown: state.procedure.contentMarkDown,
        };
        return data;
    };

    checkValueData = (obj) => {
        return Object.keys(obj).find((item) => {
            return !obj[item];
        });
    };

    render() {
        const mdParser = MarkdownIt();
        const settings = {
            dots: false,
            draggable: false,
            infinite: false,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: <SampleNextArrow />,
            prevArrow: <SamplePrevArrow />,
        };
        return (
            <>
                <div className="specialty-manage_container container">
                    <div className="specialty-manage_title text-center mb-4">
                        <FormattedMessage id="manage-clinic.title" />
                    </div>
                    <div className="row">
                        <div className="col-4 mb-4">
                            <label className="form-label">
                                <FormattedMessage id="manage-clinic.name" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.name}
                                onChange={(e) =>
                                    this.handleOnChangeInput(e, "name")
                                }
                            />
                        </div>
                        <div className="col-4 mb-4">
                            <label className="form-label">
                                <FormattedMessage id="manage-clinic.address" />
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.address}
                                onChange={(e) =>
                                    this.handleOnChangeInput(e, "address")
                                }
                            />
                        </div>
                        <div className="col-4 mb-4">
                            <label className="form-label">
                                <FormattedMessage id="manage-clinic.image" />
                            </label>
                            <input
                                type="file"
                                className="form-control"
                                onChange={(e) =>
                                    this.handleOnnchangeImg(e.target.files[0])
                                }
                            />
                        </div>
                    </div>
                    <div className="mb-4 content_container">
                        <Slider {...settings}>
                            <div className="section-item">
                                <label className="form-label">
                                    <FormattedMessage id="manage-clinic.introduce" />
                                </label>
                                <MdEditor
                                    value={this.state.introduce.contentMarkDown}
                                    style={{ height: "400px" }}
                                    renderHTML={(text) => mdParser.render(text)}
                                    onChange={({ html, text }) =>
                                        this.handleEditorChange(
                                            { html, text },
                                            "introduce"
                                        )
                                    }
                                />
                            </div>
                            <div className="section-item">
                                <label className="form-label">
                                    <FormattedMessage id="manage-clinic.professional" />
                                </label>
                                <MdEditor
                                    value={
                                        this.state.professional.contentMarkDown
                                    }
                                    style={{ height: "400px" }}
                                    renderHTML={(text) => mdParser.render(text)}
                                    onChange={({ html, text }) =>
                                        this.handleEditorChange(
                                            { html, text },
                                            "professional"
                                        )
                                    }
                                />
                            </div>
                            <div className="section-item">
                                <label className="form-label">
                                    <FormattedMessage id="manage-clinic.equipment" />
                                </label>
                                <MdEditor
                                    value={this.state.equipment.contentMarkDown}
                                    style={{ height: "400px" }}
                                    renderHTML={(text) => mdParser.render(text)}
                                    onChange={({ html, text }) =>
                                        this.handleEditorChange(
                                            { html, text },
                                            "equipment"
                                        )
                                    }
                                />
                            </div>
                            <div className="section-item">
                                <label className="form-label">
                                    <FormattedMessage id="manage-clinic.location" />
                                </label>
                                <MdEditor
                                    value={this.state.location.contentMarkDown}
                                    style={{ height: "400px" }}
                                    renderHTML={(text) => mdParser.render(text)}
                                    onChange={({ html, text }) =>
                                        this.handleEditorChange(
                                            { html, text },
                                            "location"
                                        )
                                    }
                                />
                            </div>
                            <div className="section-item">
                                <label className="form-label">
                                    <FormattedMessage id="manage-clinic.procedure" />
                                </label>
                                <MdEditor
                                    value={this.state.procedure.contentMarkDown}
                                    style={{ height: "400px" }}
                                    renderHTML={(text) => mdParser.render(text)}
                                    onChange={({ html, text }) =>
                                        this.handleEditorChange(
                                            { html, text },
                                            "procedure"
                                        )
                                    }
                                />
                            </div>
                        </Slider>
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={() => this.handleSaveSpecialty()}
                    >
                        <FormattedMessage id="manage-clinic.save" />
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
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ClinicManage);
