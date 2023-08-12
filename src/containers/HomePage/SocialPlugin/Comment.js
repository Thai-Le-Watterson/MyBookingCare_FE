import React from "react";
import { connect } from "react-redux";

class Comment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const { href } = this.props;
        return (
            <>
                <div
                    class="fb-comments"
                    // data-href="https://www.facebook.com/groups/2575884495812741/?hoisted_section_header_type=recently_seen&amp;multi_permalinks=6465645216836630"
                    data-href={href}
                    data-width=""
                    data-numposts="5"
                ></div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {};
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
