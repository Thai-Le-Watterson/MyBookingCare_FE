import React from "react";
import HomeHeader from "./HomeHeader";
import HomeFooter from "./HomeFooter";

class Page404 extends React.Component {
    render() {
        return (
            <>
                <div
                    style={{
                        height: "100vh",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                    }}
                >
                    <HomeHeader />
                    <h1 className="text-center">404 Not Found</h1>
                    <HomeFooter />
                </div>
            </>
        );
    }
}

export default Page404;
