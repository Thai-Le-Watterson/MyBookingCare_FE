import React from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import * as actions from "../../../../store/actions";
import { history } from "../../../../redux";
import { path } from "../../../../utils";

import "./UserOption.scss";

class UserOption extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
        };
    }

    componentDidMount = () => {
        this.setState({
            userInfo: this.props.userInfo,
        });
    };

    componentDidUpdate = (prevProps) => {};

    render() {
        let { userInfo, color, isAminPage, isLoggedIn } = this.props;
        const image = userInfo?.image && Buffer.from(userInfo.image).toString();
        console.log(userInfo);
        return (
            <>
                <div className="user-container" style={{ color: color || "" }}>
                    {isLoggedIn ? (
                        <>
                            <div className="btn btn-logout">
                                <span className="user-name">
                                    {userInfo?.fullName}
                                </span>
                                <div
                                    className="avatar"
                                    style={{
                                        backgroundImage: `url(${image})`,
                                    }}
                                ></div>
                            </div>

                            <ul
                                className={`user-option ${this.props.className}`}
                            >
                                {userInfo?.roleId === "R1" ||
                                userInfo?.roleId === "R2" ? (
                                    <>
                                        <div className="intro">
                                            <div
                                                className="avatar"
                                                style={{
                                                    backgroundImage: `url(${image})`,
                                                }}
                                            ></div>
                                            <span className="user-name">
                                                {userInfo?.fullName}
                                            </span>
                                        </div>
                                        {(isAminPage && (
                                            <li
                                                className="item"
                                                onClick={() =>
                                                    history.push(path.HOMEPAGE)
                                                }
                                            >
                                                <FormattedMessage id="homeHeader.userOption.goToHome" />
                                            </li>
                                        )) || (
                                            <li
                                                className="item"
                                                onClick={() =>
                                                    history.push("/system")
                                                }
                                            >
                                                <FormattedMessage id="homeHeader.userOption.goToAdmin" />
                                            </li>
                                        )}
                                    </>
                                ) : (
                                    ""
                                )}
                                <li
                                    className="item logout"
                                    onClick={() => this.props.processLogout()}
                                >
                                    <FormattedMessage id="homeHeader.userOption.logout" />
                                    <i className="fas fa-sign-out-alt"></i>
                                </li>
                            </ul>
                        </>
                    ) : (
                        <div
                            className="btn btn-login"
                            onClick={() => history.push(path.LOGIN)}
                        >
                            <span className="login-text">Đăng nhập</span>
                            <i className="fa-solid fa-circle-user icon-login"></i>
                        </div>
                    )}
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userInfo: state.user.userInfo,
        isLoggedIn: state.user.isLoggedIn,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        processLogout: () => dispatch(actions.processLogout()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserOption);
