import React from "react";
import * as userService from "../../../../services/userService";
import _ from "lodash";

// import HomeHeader from "../../HomeHeader";
import HomeFooter from "../../HomeFooter";
import ContentLoader from "react-content-loader";
import { FormattedMessage } from "react-intl";
import { Container } from "reactstrap";
import HeaderGoBack from "../../HeaderGoBack";

import "./SpecialtyPage.scss";

class SpecialtyPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadContent: false,
            specialties: [],
        };
    }

    componentDidMount = async () => {
        this.setState({
            isLoadContent: true,
        });

        const specialties = await userService.getAllSpecialties();
        // console.log("check specialties: ", specialties);
        if (specialties && !_.isEmpty(specialties)) {
            this.setState({
                specialties,
            });
        }

        this.setState({
            isLoadContent: false,
        });
    };

    redirectToSpecialtyDetail = (specialtyId, nameSpecialty) => {
        nameSpecialty = nameSpecialty.replaceAll(" ", "-");
        this.props.history.push(`/specialty/${specialtyId}/${nameSpecialty}`);
    };

    contentLoader = (quantity) => {
        const result = [];

        if (Number.isInteger(quantity) && quantity > 0)
            for (let i = 1; i <= quantity; i++) {
                result.push(
                    <div className="item-loader">
                        <ContentLoader
                            viewBox="40 0 600 200"
                            // width={"100%"}
                            height={100}
                            title="Loading specialty..."
                        >
                            <rect
                                x="42.84"
                                y="9.93"
                                rx="5"
                                ry="5"
                                width="250"
                                height="160"
                            />
                            <rect
                                x="320"
                                y="9.67"
                                rx="0"
                                ry="0"
                                width="140"
                                height="16"
                            />
                        </ContentLoader>
                    </div>
                );
            }

        return result;
    };

    render() {
        // console.log(this.props);
        console.log(this.state);
        return (
            <>
                {/* <HomeHeader screenWidth={this.state.screenWidth} /> */}
                <HeaderGoBack name={"specialty"} />
                <Container className="specilty-page_content">
                    {this.state.isLoadContent ? (
                        this.contentLoader(4)
                    ) : this.state?.specialties?.length > 0 ? (
                        this.state.specialties.map((specialty, index) => {
                            const image =
                                specialty.image &&
                                Buffer.from(specialty.image).toString();
                            return (
                                <div
                                    className="item"
                                    key={index}
                                    onClick={() =>
                                        this.redirectToSpecialtyDetail(
                                            specialty.id,
                                            specialty.name
                                        )
                                    }
                                >
                                    <div
                                        className="img"
                                        style={{
                                            backgroundImage: `url(${image})`,
                                        }}
                                    ></div>
                                    <span className="title">
                                        {specialty.name}
                                    </span>
                                </div>
                            );
                        })
                    ) : (
                        <h3 className="text-center py-3 no-content">
                            <FormattedMessage id="homepage.no-specialty" />
                        </h3>
                    )}
                </Container>
                <HomeFooter />
            </>
        );
    }
}

export default SpecialtyPage;
