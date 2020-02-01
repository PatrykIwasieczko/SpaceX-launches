// React
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

// GraphQL
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
                                    <div
                                        key={launch.flight_number}
                                        className="launch-item"
                                    >
                                        <li>
                                            <p>{launch.flight_number}</p>
                                            <p>{launch.mission_name}</p>
                                            <p>{launch.launch_date_utc}</p>
                                            <p>{launch.launch_success}</p>
                                            {launch.links.flickr_images[0] ? (
                                                <img
                                                    className="launch-image"
                                                    src={
                                                        launch.links
                                                            .flickr_images[0]
                                                    }
                                                    alt="Launch"
                                                ></img>
                                            ) : launch.links.mission_patch ? (
                                                <img
                                                    className="launch-image"
                                                    src={
                                                        launch.links
                                                            .mission_patch
                                                    }
                                                    alt="Launch"
                                                ></img>
                                            ) : (
                                                <p>Mission is about to start</p>
                                            )}
                                            <NavLink
                                                to={`/launch/${launch.flight_number}`}
                                            >
                                                Launch details
                                            </NavLink>
                                        </li>
                                    </div>
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
