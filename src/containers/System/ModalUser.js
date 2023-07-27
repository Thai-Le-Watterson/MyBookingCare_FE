import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import React from "react";

class ModalUser extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                email: "",
                fullName: "",
                address: "",
                phonenumber: "",
                gender: "1",
                roleId: "R1",
            },
            prevUserId: "",
        };
    }

    componentDidMount = () => {
        this.props.modalState === "Edit" && this.handleShowFieldEdit();
    };

    componentDidUpdate = async (prevProps) => {
        if (this.props.userEditting !== prevProps.userEditting) {
            // console.log("prev UserId: ", this.state.prevUserId);
            await this.handleShowFieldEdit();
            // console.log("current UserId: ", this.state.prevUserId);
        }
    };

    handleShowFieldEdit = async () => {
        if (this.props.userEditting && this.props.modalState === "Edit") {
            // console.log(">>> into if");

            const user = await this.props.getUsers(this.props.userEditting);
            // console.log(">>> user:", user);

            this.setState({
                user,
                prevUserId: this.props.userEditting,
            });

            // console.log(">>> state user:", this.state.user);
        } else {
            console.log(">>> into else");
            this.setState({
                user: {
                    email: "",
                    fullName: "",
                    address: "",
                    phonenumber: "",
                    gender: "1",
                    roleId: "R1",
                },
                prevUserId: "",
            });
        }
    };

    handleOnChangeInp = (name, value) => {
        this.setState({
            ...this.state,
            user: {
                ...this.state.user,
                [name]: value,
            },
        });
    };

    handleCreateUserModal = async () => {
        await this.props.handleCreateUser(this.state.user);
        this.setState({
            user: {
                email: "",
                password: "",
                fullName: "",
                address: "",
                phonenumber: "",
                gender: "1",
                roleId: "R1",
            },
        });
    };

    handleUpdateUserModal = async () => {
        await this.props.handleUpdateUser(this.state.user);
        this.setState({
            user: {
                email: "",
                password: "",
                fullName: "",
                address: "",
                phonenumber: "",
                gender: "1",
                roleId: "R1",
            },
        });
    };

    render() {
        return (
            <>
                <Modal
                    isOpen={this.props.isOpen}
                    toggle={this.props.toggle}
                    className="modal-add-user"
                >
                    <ModalHeader toggle={this.props.toggle}>
                        {this.props.modalState === "Add"
                            ? "Add New User"
                            : "Edit User"}
                    </ModalHeader>
                    <ModalBody>
                        <div className="container">
                            <div className="row">
                                <div className="form-group">
                                    <label htmlFor="fullName">FullName:</label>
                                    <input
                                        type="text"
                                        name="fullName"
                                        className="form-control"
                                        defaultValue={this.state.user.fullName}
                                        onChange={(e) =>
                                            this.handleOnChangeInp(
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="form-row">
                                    {this.props.modalState === "Add" && (
                                        <div className="form-group col-md">
                                            <label htmlFor="email">
                                                Email:
                                            </label>
                                            <input
                                                type="text"
                                                name="email"
                                                className="form-control"
                                                defaultValue={
                                                    this.state.user.email
                                                }
                                                onChange={(e) =>
                                                    this.handleOnChangeInp(
                                                        e.target.name,
                                                        e.target.value
                                                    )
                                                }
                                            />
                                        </div>
                                    )}
                                    <div className="form-group col-md">
                                        <label htmlFor="phonenumber">
                                            Phonenumber:
                                        </label>
                                        <input
                                            type="text"
                                            name="phonenumber"
                                            className="form-control"
                                            defaultValue={
                                                this.state.user.phonenumber
                                            }
                                            onChange={(e) =>
                                                this.handleOnChangeInp(
                                                    e.target.name,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                                {this.props.modalState === "Add" && (
                                    <div className="form-group">
                                        <label htmlFor="password">
                                            Password:
                                        </label>
                                        <input
                                            type="password"
                                            name="password"
                                            className="form-control"
                                            defaultValue={
                                                this.state.user.password
                                            }
                                            onChange={(e) =>
                                                this.handleOnChangeInp(
                                                    e.target.name,
                                                    e.target.value
                                                )
                                            }
                                        />
                                    </div>
                                )}

                                <div className="form-group">
                                    <label htmlFor="address">Address:</label>
                                    <input
                                        type="text"
                                        name="address"
                                        className="form-control"
                                        defaultValue={this.state.user.address}
                                        onChange={(e) =>
                                            this.handleOnChangeInp(
                                                e.target.name,
                                                e.target.value
                                            )
                                        }
                                    />
                                </div>
                                <div className="form-row">
                                    <div
                                        className={
                                            this.props.modalState === "Add"
                                                ? "form-group col-md-6"
                                                : '"form-group col-md-12"'
                                        }
                                    >
                                        <label htmlFor="gender">Gender:</label>
                                        <select
                                            name="gender"
                                            className="form-control"
                                            id="gender"
                                            value={this.state.user.gender}
                                            onChange={(e) =>
                                                this.handleOnChangeInp(
                                                    e.target.name,
                                                    e.target.value
                                                )
                                            }
                                        >
                                            <option value="1">Male</option>
                                            <option value="0">Female</option>
                                        </select>
                                    </div>
                                    {this.props.modalState === "Add" && (
                                        <div className="form-group col-md-6">
                                            <label htmlFor="roleId">
                                                RoleId:
                                            </label>
                                            <select
                                                name="roleId"
                                                className="form-control"
                                                id="roleId"
                                                style={{ height: "auto" }}
                                                onChange={(e) =>
                                                    this.handleOnChangeInp(
                                                        e.target.name,
                                                        e.target.value
                                                    )
                                                }
                                            >
                                                <option value="R1">
                                                    Admin
                                                </option>
                                                <option value="R2">
                                                    Doctor
                                                </option>
                                                <option value="R3">
                                                    Patient
                                                </option>
                                            </select>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="primary"
                            onClick={(e) =>
                                this.props.modalState === "Add"
                                    ? this.handleCreateUserModal()
                                    : this.handleUpdateUserModal()
                            }
                        >
                            {this.props.modalState === "Add" ? "Add" : "Save"}
                        </Button>{" "}
                        <Button color="secondary" onClick={this.props.toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </>
        );
    }
}

export default ModalUser;
