import React from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../utils";
import { toast } from "react-toastify";
import * as userService from "../../services/userService";

import "./SpecialtyManage.scss";
class SpecialtyManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            image: "",
            contentHTML: "",
            contentMarkDown: "",
        };
    }

    handleEditorChange = ({ html, text }) => {
        const copyState = { ...this.state };
        copyState.contentHTML = html;
        copyState.contentMarkDown = text;

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
        const emptyData = this.checkValueData(this.state);

        if (!emptyData) {
            // console.log("check state: ", this.state);
            const res = await userService.createSpecialty(this.state);

            this.setState({
                name: "",
                image: "",
                contentHTML: "",
                contentMarkDown: "",
            });

            if (res.errCode === 0) toast.success(res.message);
            else toast.error(res.message);
        } else {
            toast.error(emptyData + " is empty");
        }
    };

    checkValueData = (obj) => {
        return Object.keys(obj).find((item) => {
            return !obj[item];
        });
    };

    render() {
        const mdParser = new MarkdownIt();
        return (
            <>
                <div className="specialty-manage_container container">
                    <div className="specialty-manage_title text-center mb-4">
                        Manage Speciatly
                    </div>
                    <div className="row mb-4">
                        <div className="col-6">
                            <label className="form-label">
                                Tên chuyên khoa
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
                        <div className="col-6">
                            <label className="form-label">
                                Ảnh chuyên khoa
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
                    <div className="mb-4">
                        <MdEditor
                            value={this.state.contentMarkDown}
                            style={{ height: "400px" }}
                            renderHTML={(text) => mdParser.render(text)}
                            onChange={this.handleEditorChange}
                        />
                    </div>
                    <button
                        className="btn btn-primary"
                        onClick={() => this.handleSaveSpecialty()}
                    >
                        Lưu thông tin
                    </button>
                </div>
            </>
        );
    }
}

export default SpecialtyManage;
