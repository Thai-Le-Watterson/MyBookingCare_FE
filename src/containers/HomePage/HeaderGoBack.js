import React from "react";
import { history } from "../../redux";
import { path } from "../../utils";

import { Container } from "reactstrap";
import { FormattedMessage } from "react-intl";

import "./HeaderGoBack.scss";

class HeaderGoBack extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        const { name } = this.props;

        return (
            <>
                <div className="header-goback_overlay">
                    <Container className="header-goback_container">
                        <i
                            className="icon fa-solid fa-left-long"
                            onClick={() => history.push(path.HOMEPAGE)}
                        ></i>
                        <h1 className="header-title">
                            <FormattedMessage id={`header-go-back.${name}`} />
                        </h1>
                    </Container>
                </div>
            </>
        );
    }
}

export default HeaderGoBack;
