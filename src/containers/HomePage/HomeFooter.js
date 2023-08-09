import React from "react";
import { Link } from "react-router-dom";

import "./HomeFooter.scss";

class HomeFooter extends React.Component {
    render() {
        return (
            <div className="footer-container ">
                <div className="container">
                    <p className="text">&copy; Copy Right</p>
                    <div className="social-network">
                        <a
                            href="https://www.youtube.com/watch?v=_2uVuxLgMGc&list=LL&index=2"
                            target="_blank"
                        >
                            <i className="fa-brands fa-youtube youtube"></i>
                        </a>
                        <a href="https://www.facebook.com/" target="_blank">
                            <i className="fa-brands fa-facebook facebook"></i>
                        </a>
                    </div>
                </div>
            </div>
        );
    }
}

export default HomeFooter;
