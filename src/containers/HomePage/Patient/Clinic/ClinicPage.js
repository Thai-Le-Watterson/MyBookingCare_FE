import React from "react";
import * as userService from "../../../../services/userService";
import _ from "lodash";

import HomeHeader from "../../HomeHeader";
import HomeFooter from "../../HomeFooter";
import ListOrderByChar from "../../../../components/ListOrderByChar";

class ClinicPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            clinics: [],
            isLoading: false,
        };
    }

    componentDidMount = async () => {
        this.setState({
            isLoading: true,
        });

        const clinics = await userService.getAllClinic();

        this.setState({
            clinics: clinics && !_.isEmpty(clinics) ? clinics : [],
            isLoading: false,
        });
    };

    render() {
        const { clinics, isLoading } = this.state;

        const newClinics = clinics.map((clinic) => {
            return {
                id: clinic.id,
                name: clinic.name,
                image: clinic.image,
                provinceId: clinic.clinicData[0]?.provinceId,
                address: clinic.clinicData[0]?.provinceData,
            };
        });

        // console.log(newClinics);

        return (
            <>
                <HomeHeader />
                <ListOrderByChar
                    list={newClinics}
                    redirectTo="clinic"
                    titleId="clinicpage.title"
                    style={2}
                    isLoading={isLoading}
                />
                <HomeFooter />
            </>
        );
    }
}

export default ClinicPage;
