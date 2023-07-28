import React from "react";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import Select from "react-select";
import * as acitions from "../../store/actions/index";
import { connect } from "react-redux";
import TableUser from "./TableUser";

import "./DoctorManage.scss";
import "react-markdown-editor-lite/lib/index.css";

class DoctorManage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            contentHTML: "",
            contentMarkDown: "",
            doctors: [],
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

    handleEditorChange({ html, text }) {
        this.setState({
            contentHTML: html,
            contentMarkDown: text,
        });
    }

    render() {
        const mdParser = new MarkdownIt();
        const options = this.state.doctors.map((doctor) => {
            return { value: doctor.id, label: doctor.fullName };
        });

        return (
            <>
                <div className="title">Manage Doctors</div>
                <div className="container">
                    <div className="row">
                        <div className="col">
                            <label className="form-label">Chọn bác sĩ</label>
                            <Select options={options} />
                        </div>
                        <div className="col">
                            <label className="form-label">
                                Thông tin chi tiết
                            </label>
                            <textarea
                                className="detail-doctor"
                                rows={4}
                            ></textarea>
                        </div>
                    </div>
                </div>
                <div className="markdown-container container">
                    <MdEditor
                        style={{ height: "400px" }}
                        renderHTML={(text) => mdParser.render(text)}
                        onChange={this.handleEditorChange}
                    />
                    <button className="btn btn-primary">Save</button>
                </div>
                <TableUser isEdit={false} users={this.state.doctors} />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        doctors: state.admin.topDoctors,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getAllDoctor: (limit) => dispatch(acitions.fetchTopDoctorStart(limit)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(DoctorManage);
