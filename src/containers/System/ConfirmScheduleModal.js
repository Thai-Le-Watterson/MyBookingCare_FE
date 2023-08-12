import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import React from "react";
import { CommonUtils } from "../../utils";

import "./ConfirmScheduleModal.scss";

class ConfirmScheduleModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: "",
        };
    }

    componentDidMount = () => {};

    componentDidUpdate = async (prevProps) => {};

    handleOnChangeInp = (name, value) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [name]: value,
            },
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

    handleConfirmSchedule = async () => {
        await this.props.handleConfirmSchedule(this.state.image);
        this.props.toggle();
    };

    render() {
        return (
            <>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={this.props.toggle}
                    className="modal-confirm-schedule"
                >
                    <ModalHeader toggle={this.props.toggle}>
                        Confirm and send email
                    </ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <div className="row">
                                <div className="col-6">
                                    <label className="form-label">
                                        Patient email
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue={
                                            this.props.booking.patientEmail
                                        }
                                        className="form-control"
                                    />
                                </div>
                                <div className="col-6">
                                    <label className="form-label">
                                        Bill image
                                    </label>
                                    <input
                                        type="file"
                                        className="form-control-file"
                                        onChange={(e) =>
                                            this.handleOnnchangeImg(
                                                e.target.files[0]
                                            )
                                        }
                                    />
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={(e) => this.handleConfirmSchedule()}
                        >
                            Save
                        </Button>
                        <Button color="secondary" onClick={this.props.toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default ConfirmScheduleModal;
