// React
import React, { Component } from "react";

// GraphQL
import gql from "graphql-tag";
import { Query } from "react-apollo";

// Components
import Launch from "./Launch";

const LAUNCHESLIST_QUERY = gql`
    query LaunchesListQuery {
        launches {
            flight_number
            mission_name
            launch_date_utc
            launch_success
            links {
                flickr_images
                mission_patch
            }
        }
    }
`;

class LaunchesList extends Component {
    render() {
        return (
            <div className="launches-list">
                <h1>LaunchesList</h1>
                <Query query={LAUNCHESLIST_QUERY}>
                    {({ loading, error, data }) => {
                        if (loading) return <h4>Loading...</h4>;
                        if (error) console.log(error);

                        return (
                            <ul className="list">
                                {data.launches.map(launch => (
                                    <Launch
                                        key={launch.flight_number}
                                        launch={launch}
                                    />
                                ))}
                            </ul>
                        );
                    }}
                </Query>
            </div>
        );
    }
}

export default LaunchesList;
