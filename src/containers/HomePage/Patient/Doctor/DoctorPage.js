import React from "react";
import * as userService from "../../../../services/userService";
import _ from "lodash";

// import HomeHeader from "../../HomeHeader";
import HomeFooter from "../../HomeFooter";
import ContentLoader from "react-content-loader";
import { FormattedMessage, injectIntl } from "react-intl";
import { Container, Input } from "reactstrap";
import HeaderGoBack from "../../HeaderGoBack";

import "./DoctorPage.scss";

class DoctorPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoadContent: false,
            allDoctors: [],
            search: "",
        };
    }

    componentDidMount = async () => {
        this.setState({
            isLoadContent: true,
        });

        const allDoctors = await userService.getAllDoctors("ALL");
        // console.log("check allDoctors: ", allDoctors);
        if (allDoctors && !_.isEmpty(allDoctors)) {
            this.setState({
                allDoctors,
            });
        }

        this.setState({
            isLoadContent: false,
        });
    };

    redirectToSpecialtyDetail = (specialtyId, nameSpecialty) => {
        nameSpecialty = nameSpecialty.replaceAll(" ", "-");
        this.props.history.push(`/doctor/${specialtyId}/${nameSpecialty}`);
    };

    contentLoader = (quantity) => {
        const result = [];

        if (Number.isInteger(quantity) && quantity > 0)
            for (let i = 1; i <= quantity; i++) {
                result.push(
                    <div className="item-loader">
                        <ContentLoader
                            // viewBox="40 0 600 200"
                            // width={"100%"}
                            height={100}
                            speed={2}
                            viewBox="0 0 400 140"
                            title="Loading doctor..."
                        >
                            <rect
                                x="120"
                                y="44"
                                rx="3"
                                ry="3"
                                width="128"
                                height="6"
                            />
                            <rect
                                x="120"
                                y="76"
                                rx="3"
                                ry="3"
                                width="92"
                                height="6"
                            />
                            <circle cx="50" cy="60" r="40" />
                        </ContentLoader>
                    </div>
                );
            }

        return result;
    };

    handleOnChangeInput = (e) => {
        this.setState({
            search: e.target.value,
        });
    };

    render() {
        const { allDoctors, isLoadContent, search } = this.state;
        const allDoctorsFilter = search
            ? allDoctors.filter((doctor) => {
                  return doctor.fullName
                      .toLowerCase()
                      .normalize("NFD")
                      .replace(/\p{Diacritic}/gu, "")
                      .replace(/ /g, "")
                      .includes(
                          search
                              .toLowerCase()
                              .normalize("NFD")
                              .replace(/\p{Diacritic}/gu, "")
                              .replace(/ /g, "")
                      );
              })
            : allDoctors.slice(0, 5);
        const placeholder = this.props?.intl?.formatMessage({
            id: "doctorpage.search",
        });
        // console.log(search);

        return (
            <>
                {/* <HomeHeader screenWidth={this.state.screenWidth} /> */}
                <HeaderGoBack name={"doctor"} />
                <div className="search_overlay">
                    <Container className="search">
                        <Input
                            type="text"
                            className="input"
                            value={search}
                            placeholder={placeholder}
                            onChange={(e) => this.handleOnChangeInput(e)}
                        />
                        {search && (
                            <i
                                className="fa-solid fa-xmark close"
                                onClick={() => this.setState({ search: "" })}
                            ></i>
                        )}
                    </Container>
                </div>
                <Container className="doctor-page_content">
                    <h5 className="list-doctor_title">
                        <FormattedMessage
                            id={`doctorpage.${
                                search ? "search-doctor" : "outstanding-doctor"
                            }`}
                        />
                    </h5>

                    {isLoadContent ? (
                        this.contentLoader(4)
                    ) : allDoctorsFilter?.length > 0 ? (
                        allDoctorsFilter.map((doctor, index) => {
                            const avatar =
                                doctor.image &&
                                Buffer.from(doctor.image).toString();
                            return (
                                <div
                                    className="item"
                                    key={index}
                                    onClick={() =>
                                        this.redirectToSpecialtyDetail(
                                            doctor.id,
                                            doctor.fullName
                                        )
                                    }
                                >
                                    <div
                                        className="img"
                                        style={{
                                            backgroundImage: `url(${avatar})`,
                                        }}
                                    ></div>
                                    <div className="title">
                                        <span className="doctor-name">
                                            {doctor.fullName}
                                        </span>
                                        <p className="specialty-name">
                                            {
                                                doctor.doctorInforData
                                                    ?.specialtyData?.name
                                            }
                                        </p>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <h3 className="text-center py-3 no-content">
                            <FormattedMessage id="doctorpage.no-doctor" />
                        </h3>
                    )}
                </Container>
                <HomeFooter />
            </>
        );
    }
}

export default injectIntl(DoctorPage);
