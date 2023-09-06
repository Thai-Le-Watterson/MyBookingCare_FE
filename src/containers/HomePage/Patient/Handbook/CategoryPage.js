import React from "react";
import * as userService from "../../../../services/userService";
import _ from "lodash";
// import moment from "moment/moment";

import HomeHeader from "../../HomeHeader";
import HomeFooter from "../../HomeFooter";
import ListOrderByChar from "../../../../components/ListOrderByChar";

// import "./CategoryPage.scss";

class CategoryPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            categories: [],
        };
    }

    componentDidMount = async () => {
        const categories = await userService.getAllCategoryHandbook("-1");

        this.setState({
            categories: categories && !_.isEmpty(categories) ? categories : [],
        });
    };

    render() {
        const { categories } = this.state;

        const newCategories = categories.map((category) => {
            return { id: category.id, name: category.name };
        });

        return (
            <>
                <HomeHeader />
                <ListOrderByChar
                    list={newCategories}
                    redirectTo="category"
                    style={1}
                />
                <HomeFooter />
            </>
        );
    }
}

export default CategoryPage;
