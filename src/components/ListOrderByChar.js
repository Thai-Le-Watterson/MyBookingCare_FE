import React from "react";
import _ from "lodash";
import { history } from "../redux";
import { connect } from "react-redux";
import { languages } from "../utils";

import { FormattedMessage, injectIntl } from "react-intl";

import "./ListOrderByChar.scss";

class ListOrderByChar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listRaw: [],
            provincesSelect: [],
            provincesSelectTrue: [],
            isShowArrowUp: false,
            searchProvinceValue: "",
            searchClinicNameValue: "",
        };
    }

    componentDidMount = async () => {
        const pointScroll = document.getElementsByClassName("list-char")[0]?.offsetTop;

        document.body.addEventListener(
            "scroll",
            () => {
                if (document.body.scrollTop >= pointScroll) {
                    this.setState({
                        isShowArrowUp: true,
                    });
                } else {
                    this.setState({
                        isShowArrowUp: false,
                    });
                }
            },
            false
        );
    };

    componentDidUpdate = async (prevProps) => {
        if (this.props.list !== prevProps.list) {
            this.setState({
                listRaw: this.props.list && !_.isEmpty(this.props.list) ? this.props.list : [],
            });
        }
    };

    handleClickCharList = (e, char) => {
        const elementActived = document.querySelector(".item.active");
        elementActived?.classList.remove("active");
        e.target.classList.add("active");

        const elementChar = document.getElementById(`char-list-${char.toUpperCase()}`);

        document.body.scroll({
            left: 0,
            top: elementChar?.parentElement?.offsetTop - 90 || 0,
            behavior: "smooth",
        });
    };

    handleToggleSelectProvince = () => {
        const element = document.querySelector(".select-province");
        if (element.classList.contains("active")) element.classList.remove("active");
        else element.classList.add("active");
    };

    handleActiveItemProvince = (provinceSelect) => {
        const item = document.getElementsByClassName(provinceSelect.key)[0];
        let newProvinces = [...this.state.provincesSelect];

        if (item.classList.contains("active")) {
            item.classList.remove("active");
            newProvinces = newProvinces.filter((province) => province.key !== provinceSelect.key);
        } else {
            item.classList.add("active");
            if (!newProvinces.find((province) => province.key === provinceSelect.key))
                newProvinces.push(provinceSelect);
        }

        this.setState({
            provincesSelect: [...newProvinces],
        });
    };

    handleClearItemProvince = () => {
        const itemsActive = document.querySelectorAll(".select-option_item .item.active");

        itemsActive.forEach((item) => item.classList.remove("active"));

        this.handleToggleSelectProvince();

        this.setState({
            provincesSelect: [],
            provincesSelectTrue: [],
        });
    };

    handleApplyFilterProvince = () => {
        this.setState({
            provincesSelectTrue: [...this.state.provincesSelect],
        });

        this.handleToggleSelectProvince();
    };

    handleSearchClinicByName = (e) => {
        this.setState({
            searchClinicNameValue: e.target.value,
        });
    };

    handleSearchProvince = (e) => {
        this.setState({
            searchProvinceValue: e.target.value,
        });
    };

    render() {
        const {
            listRaw,
            isShowArrowUp,
            provincesSelect,
            provincesSelectTrue,
            searchClinicNameValue,
            searchProvinceValue,
        } = this.state;
        const { redirectTo, style, titleId, language, intl, isLoading } = this.props;
        const alphabet = "abcdefghijklmnopqrstuvwxyz".split("");
        const list = {};

        let listSearchClinic = [...listRaw];
        let listSearchProvince = [...listRaw];

        //filter list raw to listSearchClinic
        if (searchClinicNameValue) {
            listSearchClinic = searchClinicNameValue
                ? listRaw.filter((item) => {
                      return item.name
                          .toLowerCase()
                          .normalize("NFD")
                          .replace(/\p{Diacritic}/gu, "")
                          .replace(/ /g, "")
                          .includes(
                              searchClinicNameValue
                                  .toLowerCase()
                                  .normalize("NFD")
                                  .replace(/\p{Diacritic}/gu, "")
                                  .replace(/ /g, "")
                          );
                  })
                : [...listRaw];
        }

        //filter list raw to listSearchProvince
        if (searchProvinceValue) {
            listSearchProvince = searchProvinceValue
                ? listRaw.filter((item) => {
                      return item.address[language === languages.VI ? "valueVi" : "valueEn"]
                          .toLowerCase()
                          .normalize("NFD")
                          .replace(/\p{Diacritic}/gu, "")
                          .replace(/ /g, "")
                          .includes(
                              searchProvinceValue
                                  .toLowerCase()
                                  .normalize("NFD")
                                  .replace(/\p{Diacritic}/gu, "")
                                  .replace(/ /g, "")
                          );
                  })
                : [...listRaw];
        }

        //build list data
        listSearchClinic.forEach((item) => {
            if (provincesSelectTrue.length > 0) {
                const isItemValid = provincesSelectTrue.some((province) => province.key === item.provinceId);

                if (isItemValid) {
                    let char = item.name.charAt(0).toUpperCase();

                    if (!/[a-z]/i.test(char)) char = "other";

                    if (Array.isArray(list[char])) {
                        list[char].push(item);
                    } else {
                        list[char] = [item];
                    }
                }
            } else {
                let char = item.name.charAt(0).toUpperCase();

                if (!/[a-z]/i.test(char)) char = "other";

                if (Array.isArray(list[char])) {
                    list[char].push(item);
                } else {
                    list[char] = [item];
                }
            }
        });

        //build lisProvince data
        const listProvince = listSearchProvince.reduce((prevValue, currValue) => {
            if (!prevValue?.some((item) => item.key === currValue.provinceId) || prevValue.length === 0) {
                return [
                    ...prevValue,
                    {
                        key: currValue.provinceId,
                        address: currValue.address,
                    },
                ];
            } else {
                return [...prevValue];
            }
        }, []);

        return (
            <>
                <div className="list_container">
                    <div className="container">
                        <div className="head">
                            <div className="head_top">
                                <h2 className="search-title">
                                    {(style === 1 && <FormattedMessage id="clinicpage.search" />) ||
                                        (titleId && <FormattedMessage id={titleId} />)}
                                </h2>
                                {style === 2 && (
                                    <div className="head_top-right">
                                        <div
                                            className="select-province"
                                            onClick={() => this.handleToggleSelectProvince()}
                                        >
                                            <span>
                                                <FormattedMessage id="clinicpage.province" />
                                            </span>
                                            <i className="fa-solid fa-chevron-down"></i>
                                            <div className="select-option" onClick={(e) => e.stopPropagation()}>
                                                <h3 className="select-title">
                                                    <FormattedMessage id="clinicpage.choose-province" />
                                                </h3>
                                                <div className="search_container">
                                                    <input
                                                        type="text"
                                                        className="search_input"
                                                        placeholder={intl.formatMessage({
                                                            id: "clinicpage.search-plh",
                                                        })}
                                                        onChange={(e) => this.handleSearchProvince(e)}
                                                    />
                                                    <i className="fa-solid fa-magnifying-glass icon"></i>
                                                </div>
                                                <div className="select-option_item">
                                                    {listProvince &&
                                                        listProvince.length > 0 &&
                                                        listProvince.map((province) => (
                                                            <div
                                                                className={`item ${province.key}`}
                                                                onClick={() => {
                                                                    this.handleActiveItemProvince(province);
                                                                }}
                                                            >
                                                                <p className="item-content">
                                                                    {
                                                                        province.address[
                                                                            language === languages.VI
                                                                                ? "valueVi"
                                                                                : "valueEn"
                                                                        ]
                                                                    }
                                                                </p>
                                                            </div>
                                                        ))}
                                                </div>
                                                <div className="select-footer">
                                                    <button
                                                        className={`btn-reset ${
                                                            provincesSelect.length > 0 ? "active" : ""
                                                        }`}
                                                        onClick={() => this.handleClearItemProvince()}
                                                    >
                                                        <i className="fa-solid fa-rotate icon"></i>
                                                        <span>
                                                            <FormattedMessage id="clinicpage.reset" />
                                                        </span>
                                                    </button>
                                                    <button
                                                        className={`btn-apply ${
                                                            provincesSelect.length > 0 ? "active" : ""
                                                        }`}
                                                        onClick={() => this.handleApplyFilterProvince()}
                                                    >
                                                        <FormattedMessage id="clinicpage.apply" />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="search-input_container">
                                            <input
                                                className="search-input"
                                                placeholder={intl.formatMessage({
                                                    id: "clinicpage.search-plh",
                                                })}
                                                type="text"
                                                value={searchClinicNameValue}
                                                onChange={(e) => this.handleSearchClinicByName(e)}
                                            ></input>
                                            <i className="fa-solid fa-magnifying-glass icon"></i>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <div className="list-char">
                                {alphabet.map((char, index) => {
                                    return (
                                        <a
                                            className="item"
                                            key={`char-${index}`}
                                            onClick={(e) => this.handleClickCharList(e, char)}
                                        >
                                            {char.toUpperCase()}
                                        </a>
                                    );
                                })}
                            </div>
                        </div>
                        {!isLoading ? (
                            <div className="body">
                                {Object.keys(list)
                                    .sort()
                                    .map((char, index) => {
                                        return (
                                            <div className="list-item" key={`list-item-${index}`}>
                                                <div className="char" id={`char-list-${char}`}>
                                                    {char}
                                                </div>
                                                <div className="list-item row container">
                                                    {list[char].map((item, index) => {
                                                        const image = item.image && Buffer.from(item.image).toString();
                                                        return (
                                                            <div
                                                                className="item col-6 col-sm-4 col-md-3"
                                                                key={index}
                                                                onClick={() =>
                                                                    history.push(
                                                                        `/${redirectTo}/${
                                                                            item.id
                                                                        }/${item.name.replaceAll(" ", "-")}`
                                                                    )
                                                                }
                                                            >
                                                                {style === 2 && (
                                                                    <div
                                                                        className="img"
                                                                        style={{
                                                                            backgroundImage: `url(${image})`,
                                                                        }}
                                                                    ></div>
                                                                )}
                                                                <span className={`text style-${style}`}>
                                                                    {item.name}
                                                                </span>
                                                            </div>
                                                        );
                                                    })}
                                                </div>
                                            </div>
                                        );
                                    })}
                                {isShowArrowUp && (
                                    <div
                                        className="arrow-up"
                                        onClick={() => {
                                            console.log("go up");
                                            document.body.scroll({
                                                top: 0,
                                                behavior: "smooth",
                                            });
                                        }}
                                    >
                                        <i className="fa-solid fa-arrow-up icon"></i>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <h1 className="loading">
                                <FormattedMessage id="clinicpage.loading" />
                            </h1>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    language: state.app.language,
});

export default connect(mapStateToProps)(injectIntl(ListOrderByChar));
