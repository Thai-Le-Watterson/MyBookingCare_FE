import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";
import Lightbox from "react-image-lightbox";
import { FormattedMessage } from "react-intl";
import { CRUD } from "../../utils";
import CommonUtils from "../../utils/CommonUtils";
import TableUser from "./TableUser";

import avatar from "../../assets/avatar/avatar_default.jpg";

import "react-image-lightbox/style.css";
import "./UserReduxManager.scss";

class UserReduxManager extends Component {
    constructor(props) {
        super(props);
        this.state = {
            genders: [],
            roles: [],
            positions: [],
            avatarUser: avatar,
            isOpen: false,
            crud: CRUD.CREATE,
            userInfo: {
                id: "",
                email: "",
                password: "",
                fullName: "",
                address: "",
                phonenumber: "",
                positionId: "P0",
                gender: "M",
                roleId: "R1",
                image: "",
            },
            users: [],
        };
    }

    async componentDidMount() {
        await this.props.getGender();
        await this.props.getRole();
        await this.props.getPosition();
        await this.props.getUsers("ALL");
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevProps.genders !== this.props.genders) {
            this.setState({
                ...this.state,
                genders: this.props.genders,
            });
        }
        if (prevProps.roles !== this.props.roles) {
            this.setState({
                ...this.state,
                roles: this.props.roles,
            });
        }
        if (prevProps.positions !== this.props.positions) {
            this.setState({
                ...this.state,
                positions: this.props.positions,
            });
        }
        if (prevProps.users !== this.props.users) {
            const positions = this.props.positions;
            const genders = this.props.genders;
            const roles = this.props.roles;

            this.setState({
                ...this.state,
                avatarUser: avatar,
                crud: CRUD.CREATE,
                userInfo: {
                    id: "",
                    email: "",
                    password: "",
                    fullName: "",
                    address: "",
                    phonenumber: "",
                    positionId:
                        positions &&
                        positions.length > 0 &&
                        positions[0].keyMap,
                    gender: genders && genders.length > 0 && genders[0].keyMap,
                    roleId: roles && roles.length > 0 && roles[0].keyMap,
                    image: "",
                },
                users: this.props.users,
            });
        }
    }

    handleOnnchangeImg = async (file) => {
        if (file) {
            const base64 = await CommonUtils.toBase64(file);

            const copState = { ...this.state };
            copState.avatarUser = base64;
            copState.userInfo.image = base64;

            this.setState({
                ...copState,
            });
        }
    };

    handleOnChangeInput = (e, key) => {
        const copyState = { ...this.state };
        copyState.userInfo[key] = e.target.value;

        this.setState({
            ...copyState,
        });
    };

    handleOpenLightBox = () => {
        this.setState({
            isOpen: true,
        });
    };

    handleCreateUser = () => {
        const isNotValid = this.checkEmptyValue(this.state.userInfo);
        if (isNotValid) {
            alert(`${isNotValid} is empty`);
        } else {
            // console.log(this.state.userInfo);
            this.props.createUser(this.state.userInfo);
            setTimeout(() => {
                this.props.getUsers("ALL");
            }, 300);
        }
    };

    handleUpdateUser = async () => {
        await this.props.updateUser(this.state.userInfo);
        const positions = this.props.positions;
        const genders = this.props.genders;
        const roles = this.props.roles;

        this.setState({
            ...this.state,
            crud: CRUD.CREATE,
            userInfo: {
                id: "",
                email: "",
                password: "",
                fullName: "",
                address: "",
                phonenumber: "",
                positionId: positions && positions.length > 0 && positions[0],
                gender: genders && genders.length > 0 && genders[0],
                roleId: roles && roles.length > 0 && roles[0],
                image: "",
            },
        });

        this.props.getUsers("ALL");
    };

    handleEditUser = (user) => {
        const image = user.image ? Buffer.from(user.image).toString() : "";

        const copyState = { ...this.state };
        copyState.crud = CRUD.UPDATE;
        copyState.avatarUser = image;
        copyState.userInfo = {
            id: user.id,
            email: user.email,
            password: "123456",
            fullName: user.fullName,
            address: user.address,
            phonenumber: user.phonenumber,
            positionId: user.positionId,
            gender: user.gender,
            roleId: user.roleId,
            image: "",
        };

        this.setState({
            ...copyState,
        });
    };

    handleDeleteUser = async (id) => {
        await this.props.deleteUser(id);
        this.props.getUsers("ALL");
    };

    checkEmptyValue = (obj) => {
        const result = Object.keys(obj).find((value, index) => {
            if (value === "id") return false;
            return !obj[value];
        });
        return result || undefined;
    };

    render() {
        console.log("check state: ", this.state);
        return (
            <>
                {this.state.isOpen && (
                    <Lightbox
                        mainSrc={this.state.avatarUser || avatar}
                        onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                )}
                <div className="title-manage text-center">
                    <FormattedMessage id="manage-user-redux.title" />
                </div>
                <div className="form-container container">
                    <div className="row">
                        <div className="col-8">
                            <div className="row mt-4">
                                <div className="col">
                                    <label
                                        className="form-label"
                                        htmlFor="email"
                                    >
                                        <FormattedMessage id="manage-user-redux.email" />
                                    </label>
                                    <input
                                        type="email"
                                        className="form-control"
                                        name="email"
                                        id="email"
                                        value={this.state.userInfo.email}
                                        disabled={
                                            this.state.crud === CRUD.UPDATE
                                        }
                                        onChange={(e) =>
                                            this.handleOnChangeInput(e, "email")
                                        }
                                    />
                                </div>
                                <div className="col">
                                    <label
                                        className="form-label"
                                        htmlFor="password"
                                    >
                                        <FormattedMessage id="manage-user-redux.password" />
                                    </label>
                                    <input
                                        type="password"
                                        className="form-control"
                                        name="password"
                                        id="password"
                                        value={this.state.userInfo.password}
                                        disabled={
                                            this.state.crud === CRUD.UPDATE
                                        }
                                        onChange={(e) =>
                                            this.handleOnChangeInput(
                                                e,
                                                "password"
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col">
                                    <label
                                        className="form-label"
                                        htmlFor="fullname"
                                    >
                                        <FormattedMessage id="manage-user-redux.fullname" />
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="fullname"
                                        id="fullname"
                                        value={this.state.userInfo.fullName}
                                        onChange={(e) =>
                                            this.handleOnChangeInput(
                                                e,
                                                "fullName"
                                            )
                                        }
                                    />
                                </div>
                                <div className="col">
                                    <label
                                        className="form-label"
                                        htmlFor="address"
                                    >
                                        <FormattedMessage id="manage-user-redux.address" />
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        id="address"
                                        value={this.state.userInfo.address}
                                        onChange={(e) =>
                                            this.handleOnChangeInput(
                                                e,
                                                "address"
                                            )
                                        }
                                    />
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col form-row">
                                    <div className="col">
                                        <label
                                            className="form-label"
                                            htmlFor="phonenumber"
                                        >
                                            <FormattedMessage id="manage-user-redux.phonenumber" />
                                        </label>
                                        <input
                                            type="number"
                                            className="form-control"
                                            name="phonenumber"
                                            id="phonenumber"
                                            value={
                                                this.state.userInfo.phonenumber
                                            }
                                            onChange={(e) =>
                                                this.handleOnChangeInput(
                                                    e,
                                                    "phonenumber"
                                                )
                                            }
                                        />
                                    </div>
                                    <div className="col">
                                        <label
                                            className="form-label"
                                            htmlFor="positionId"
                                        >
                                            <FormattedMessage id="manage-user-redux.position" />
                                        </label>
                                        <select
                                            className="form-select"
                                            value={
                                                this.state.userInfo.positionId
                                            }
                                            onChange={(e) =>
                                                this.handleOnChangeInput(
                                                    e,
                                                    "positionId"
                                                )
                                            }
                                        >
                                            {this.state.positions &&
                                                this.state.positions.map(
                                                    (position) => {
                                                        return (
                                                            <option
                                                                key={
                                                                    position.keyMap
                                                                }
                                                                value={
                                                                    position.keyMap
                                                                }
                                                            >
                                                                {this.props
                                                                    .language ===
                                                                "vi"
                                                                    ? position.valueVi
                                                                    : position.valueEn}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                        </select>
                                    </div>
                                </div>
                                <div className="col form-row">
                                    <div className="col">
                                        <label
                                            className="form-label"
                                            htmlFor="gender"
                                        >
                                            <FormattedMessage id="manage-user-redux.gender" />
                                        </label>
                                        <select
                                            className="form-select"
                                            value={this.state.userInfo.gender}
                                            onChange={(e) =>
                                                this.handleOnChangeInput(
                                                    e,
                                                    "gender"
                                                )
                                            }
                                        >
                                            {this.state.genders &&
                                                this.state.genders.map(
                                                    (gender) => {
                                                        return (
                                                            <option
                                                                key={
                                                                    gender.keyMap
                                                                }
                                                                value={
                                                                    gender.keyMap
                                                                }
                                                            >
                                                                {this.props
                                                                    .language ===
                                                                "vi"
                                                                    ? gender.valueVi
                                                                    : gender.valueEn}
                                                            </option>
                                                        );
                                                    }
                                                )}
                                        </select>
                                    </div>
                                    <div className="col">
                                        <label
                                            className="form-label"
                                            htmlFor="roleid"
                                        >
                                            <FormattedMessage id="manage-user-redux.role" />
                                        </label>
                                        <select
                                            className="form-select"
                                            value={this.state.userInfo.roleId}
                                            onChange={(e) =>
                                                this.handleOnChangeInput(
                                                    e,
                                                    "roleId"
                                                )
                                            }
                                        >
                                            {this.state.roles &&
                                                this.state.roles.map((role) => {
                                                    return (
                                                        <option
                                                            key={role.keyMap}
                                                            value={role.keyMap}
                                                        >
                                                            {this.props
                                                                .language ===
                                                            "vi"
                                                                ? role.valueVi
                                                                : role.valueEn}
                                                        </option>
                                                    );
                                                })}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-4 mt-4">
                            <p className="form-label text-center">
                                <FormattedMessage id="manage-user-redux.avatar" />
                            </p>
                            <div className="avatar-container">
                                <label
                                    className="img-label"
                                    htmlFor="avatar"
                                    style={{
                                        backgroundImage: `url(${
                                            (this.state.avatarUser &&
                                                this.state.avatarUser) ||
                                            avatar
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
                    <button
                        type="button"
                        className={`btn ${
                            (this.state.crud === CRUD.CREATE &&
                                "btn-primary") ||
                            "btn-warning"
                        } mt-4`}
                        onClick={() => {
                            this.state.crud === CRUD.CREATE
                                ? this.handleCreateUser()
                                : this.handleUpdateUser();
                        }}
                    >
                        <FormattedMessage id="manage-user-redux.save" />
                    </button>
                </div>
                <TableUser
                    users={this.state.users}
                    handleEditUser={this.handleEditUser}
                    handleDeleteUser={this.handleDeleteUser}
                    isEdit={true}
                />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language,
        genders: state.admin.genders,
        roles: state.admin.roles,
        positions: state.admin.positions,
        users: state.admin.users,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getGender: () => dispatch(actions.fetchGenderStart()),
        getRole: () => dispatch(actions.fetchRoleStart()),
        getPosition: () => dispatch(actions.fetchPositionStart()),
        createUser: (data) => dispatch(actions.createUserStart(data)),
        getUsers: (id) => dispatch(actions.fetchUsersStart(id)),
        deleteUser: (id) => dispatch(actions.deleteUserStart(id)),
        updateUser: (data) => dispatch(actions.updateUserStart(data)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserReduxManager);
