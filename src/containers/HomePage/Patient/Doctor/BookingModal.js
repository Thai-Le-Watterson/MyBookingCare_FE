import React from "react";
import { connect } from "react-redux";

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

import "./BookingModal.scss";

class BookingModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount = () => {};

    componentDidUpdate = (prevProps) => {};

    closeBtn = () => {
        return (
            <button className="close-btn close" onClick={this.props.toggle}>
                &times;
            </button>
        );
    };

    render() {
        console.log(this.props.doctor);
        return (
            <div className="booking-modal_container">
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={this.props.toggle}
                    fullscreen="lg"
                    size="lg"
                    centered
                >
                    <ModalHeader
                        toggle={this.props.toggle}
                        close={this.closeBtn()}
                        className="booking-modal_header"
                    >
                        Thông tin đặt lịch khám bệnh
                    </ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <div className="row">
                                <div className="col-4">
                                    Giá khám: 500.000 VND
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-6 my-2">
                                    <label className="form-label">Họ tên</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-6 my-2">
                                    <label className="form-label">
                                        Số điện thoại
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-6 my-2">
                                    <label className="form-label">
                                        Địa chỉ email
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-6 my-2">
                                    <label className="form-label">
                                        Địa chỉ liên hệ
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-12 my-2">
                                    <label className="form-label">
                                        Lý do khám
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-6 my-2">
                                    <label className="form-label">
                                        Đặt cho ai
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-6 my-2">
                                    <label className="form-label">
                                        Giới tính
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                    />
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.props.toggle}>
                            Book
                        </Button>{" "}
                        <Button color="secondary" onClick={this.props.toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.app.language,
});

export default connect(mapStateToProps)(BookingModal);
