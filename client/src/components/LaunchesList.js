import React, { Component } from "react";
import gql from "graphql-tag";
import { Query } from "react-apollo";

const LAUNCHESLIST_QUERY = gql`
    query LaunchesListQuery {
        launches {
            flight_number
            mission_name
            launch_date_utc
            launch_success
            links {
                flickr_images
            }
        }
    }
`;

class LaunchesList extends Component {
    render() {
        return (
            <>
                <h1>LaunchesList</h1>
                <Query query={LAUNCHESLIST_QUERY}>
                    {({ loading, error, data }) => {
                        if (loading) return <h4>Loading...</h4>;
                        if (error) console.log(error);

                        return (
                            <>
                                {data.launches.map(launch => (
                                    <>
                                        <p>{launch.flight_number}</p>
                                        <p>{launch.mission_name}</p>
                                        <p>{launch.launch_date_utc}</p>
                                        <p>{launch.launch_success}</p>
                                        <p>{launch.links.flickr_images[0]}</p>
                                    </>
                                ))}
                            </>
                        );
                    }}
                </Query>
            </>
        );
    }
}

export default LaunchesList;
