import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
// import { history } from "../../redux";
import * as actions from "../../store/actions";
import * as userService from "../../services/userService";

import "./Login.scss";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      isShowPassword: false,
      errorMessage: "",
    };
  }

  handleOnChangeInput = (e, nameChange) => {
    this.setState({
      [nameChange]: e.target.value,
    });
  };

  handleShowHidePassword = (e) => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleLogin = async () => {
    this.setState({
      errorMessage: "",
    });

    const data = await userService.handleUserLogin(
      this.state.email,
      this.state.password
    );
    console.log(data);
    if (data && data.errCode === 0 && data.user) {
      this.props.userLoginSuccess(data.user);
    } else {
      this.setState({
        errorMessage: data.message,
      });
    }
  };

  render() {
    return (
      <div className="overlay">
        <div className="position-fixed top-0 start-0 bg-white p-4 rounded">
          <div>
            <h4>Admin Account</h4>
            <ul>
              <li>Email: thailevlfyb@gmail.com</li>
              <li>Password: 121212</li>
            </ul>
            <h4>Doctor Account</h4>
            <ul>
              <li>Email: doctor1@gmail.com</li>
              <li>Password: 121212</li>
            </ul>
            <h4>Patient Account</h4>
            <ul>
              <li>Email: lethaihihi11@gmail.com</li>
              <li>Password: 121212</li>
            </ul>
          </div>
        </div>
        <div className="login-container container">
          <div className="login-content row">
            <h1 className="login-title">Login</h1>
            <div className="form-group col-12">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                className="form-control"
                placeholder="Enter your email"
                value={this.state.email}
                onChange={(e) => this.handleOnChangeInput(e, "email")}
              />
            </div>
            <div className="form-group col-12">
              <label htmlFor="password">Password</label>
              <div className="custom-showhide">
                <input
                  type={this.state.isShowPassword ? "text" : "password"}
                  name="password"
                  id="password"
                  className="form-control"
                  placeholder="Enter your password"
                  value={this.state.password}
                  onChange={(e) => this.handleOnChangeInput(e, "password")}
                />
                <i
                  className={
                    this.state.isShowPassword
                      ? "fa-solid fa-eye"
                      : "fa-solid fa-eye-slash"
                  }
                  onClick={(e) => this.handleShowHidePassword(e)}
                ></i>
              </div>
            </div>

            <p className="message" style={{ color: "red", textAlign: "left" }}>
              {this.state.errorMessage}
            </p>

            <div className="form-group col-12">
              <button
                className="btn-login"
                onClick={() => {
                  this.handleLogin();
                }}
              >
                Log in
              </button>
            </div>

            <p>Or sign in with:</p>

            <div className="form-group col-12 icon-container">
              <i className="fa-brands fa-facebook-f icon-facebook"></i>
              <i className="fa-brands fa-twitter icon-twitter"></i>
              <i className="fa-brands fa-google-plus-g icon-google"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
