import React from "react";
import { connect } from "react-redux";
import { languages } from "../../../utils";
require("dotenv").config();

class LikeShare extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount = () => {
        this.initFacebookSDK();
    };

    componentDidUpdate = (prevProps) => {
        if (prevProps.href !== this.props.href) {
            // this.initFacebookSDK();
        }
    };

    initFacebookSDK = () => {
        if (window.FB) {
            window.FB.XFBML.parse();
        }

        const locale = this.props.language === languages.VI ? "vi_VN" : "en_US";

        window.fbAsyncInit = function () {
            window.FB.init({
                appId: process.env.REACT_APP_FACEBOOK_APP_ID,
                autoLogAppEvents: true,
                xfbml: true,
                version: "v17.0",
            });
        };

        (function (d, s, id) {
            let js,
                fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = `//connect.facebook.net/${locale}/all.js`;
            fjs.parentNode.insertBefore(js, fjs);
        })(document, "script", "facebook-jssdk");
    };

    render() {
        const { href } = this.props;
        // console.log("href: ", href);
        return (
            <div
                class="fb-like"
                // data-href="https://developers.facebook.com/docs/plugins/"
                data-href={href}
                data-width=""
                data-layout=""
                data-action=""
                data-size=""
                data-share="true"
            ></div>
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

export default connect(mapStateToProps, mapDispatchToProps)(LikeShare);
