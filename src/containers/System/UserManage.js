import React, { Component } from "react";
// import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { userService } from "../../services/index";
import "./UserManage.scss";
import ModalUser from "./ModalUser";

class UserManage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
            isOpenModal: false,
            modalState: "",
            userEditting: "",
        };
    }

    async componentDidMount() {
        await this.getUsers("ALL");
    }

    getUsers = async (id) => {
        const users = await userService.handleGetUsers(id);
        id === "ALL" &&
            this.setState({
                users,
            });
        return users;
    };

    toggle = () => {
        this.setState({
            isOpenModal: false,
        });
    };

    handleShowModal = (modalState, userEditting = "") => {
        // console.log("user id: ", userEditting);
        this.setState({
            isOpenModal: true,
            modalState,
            userEditting,
        });
    };

    checkEmptyFiled = (data) => {
        let isEmptyFiled = false;
        const arrFiled = [
            "email",
            "password",
            "fullName",
            "address",
            "phonenumber",
            "gender",
            "roleId",
        ];

        for (const field of arrFiled) {
            if (!data[field]) {
                isEmptyFiled = true;
                break;
            }
        }

        return isEmptyFiled;
    };

    handleCreateUser = async (data) => {
        const isEmptyFiled = this.checkEmptyFiled(data);

        if (!isEmptyFiled) {
            const result = await userService.createUser(data);

            if (result && result.data) {
                if (result.data.errCode === 0) {
                    this.toggle();
                    await this.getUsers("ALL");
                } else {
                    alert(result.data.message);
                }
            }
        } else {
            alert("Empty value");
        }
    };

    handleUpdateUser = async (data) => {
        const isEmptyFiled = this.checkEmptyFiled(data);

        if (!isEmptyFiled) {
            const result = await userService.updateUser(data);

            if (result && result.data) {
                if (result.data.errCode === 0) {
                    this.toggle();
                    await this.getUsers("ALL");
                } else {
                    alert(result.data.message);
                }
            }
        } else {
            alert("Empty value");
        }
    };

    handleDeleteUser = async (id) => {
        const result = await userService.deleteUser(id);

        if (result && result.data) {
            if (result.data.errCode === 0) {
                await this.getUsers("ALL");
            } else {
                alert(result.data.message);
            }
        }
    };

    render() {
        return (
            <>
                <ModalUser
                    toggle={this.toggle}
                    isOpen={this.state.isOpenModal}
                    getUsers={this.getUsers}
                    handleCreateUser={this.handleCreateUser}
                    handleUpdateUser={this.handleUpdateUser}
                    modalState={this.state.modalState}
                    userEditting={this.state.userEditting}
                />
                <div className="title text-center mb-4">Manage users</div>
                <button
                    className="btn btn-primary btn-add-user"
                    onClick={() => this.handleShowModal("Add")}
                >
                    Add User
                </button>
                <div className="users-container mx-4">
                    <table>
                        <tbody>
                            <tr>
                                <th>Email</th>
                                <th>FullName</th>
                                <th>Address</th>
                                <th>Phone Number</th>
                                <th>Update</th>
                            </tr>
                            {this.state.users &&
                                this.state.users.map((user) => {
                                    return (
                                        <tr key={user.id}>
                                            <td>{user.email}</td>
                                            <td>{user.fullName}</td>
                                            <td>{user.address}</td>
                                            <td>{user.phonenumber}</td>
                                            <td>
                                                <button
                                                    className="btn_edit"
                                                    onClick={(e) =>
                                                        this.handleShowModal(
                                                            "Edit",
                                                            user.id
                                                        )
                                                    }
                                                >
                                                    <i className="fa-solid fa-pencil"></i>
                                                </button>
                                                <button
                                                    className="btn_delete"
                                                    onClick={(e) => {
                                                        this.handleDeleteUser(
                                                            user.id
                                                        );
                                                    }}
                                                >
                                                    <i className="fa-solid fa-trash"></i>
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })}
                        </tbody>
                    </table>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
