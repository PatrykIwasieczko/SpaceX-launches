// React
import React, { Component } from "react";
import { NavLink } from "react-router-dom";

// GraphQL
import gql from "graphql-tag";
import { Query } from "react-apollo";

const SINGLE_LAUNCH_QUERY = gql`
    query SingleLaunchQuery($flight_number: Int!) {
        launch(flight_number: $flight_number) {
            flight_number
            mission_name
            launch_year
            launch_success
            launch_date_utc
            rocket {
                rocket_id
                rocket_name
                rocket_type
            }
            links {
                flickr_images
                mission_patch
                article_link
                video_link
            }
        }
    }
`;

class SingleLaunch extends Component {
    render() {
        let { flight_number } = this.props.match.params;
        flight_number = parseInt(flight_number);
        return (
            <>
                <Query
                    query={SINGLE_LAUNCH_QUERY}
                    variables={{ flight_number }}
                >
                    {({ loading, error, data }) => {
                        if (loading) return <h4>Loading...</h4>;
                        if (error) console.log(error);
                        const {
                            mission_name,
                            flight_number,
                            launch_year,
                            launch_date_utc,
                            launch_success,
                            rocket: { rocket_id, rocket_name, rocket_type },
                            links: {
                                flickr_images,
                                mission_patch,
                                article_link,
                                video_link
                            }
                        } = data.launch;
                        return (
                            <div className="single-launch">
                                <h1>
                                    <span className="">Mission:</span>{" "}
                                    {mission_name}
                                </h1>
                                {mission_patch ? (
                                    <img
                                        className="patch-image"
                                        src={mission_patch}
                                        alt="Patch"
                                    />
                                ) : (
                                    <h2>The launch is about to start</h2>
                                )}

                                <h2 className="">Launch Details</h2>
                                <div className="launch-details">
                                    <ul>
                                        <li className="">
                                            Flight Number: {flight_number}
                                        </li>
                                        <li className="">
                                            Launch Year: {launch_year}
                                        </li>
                                        <li className="">
                                            Launch Date: {launch_date_utc}
                                        </li>
                                        <li className="">
                                            Launch Successful:{" "}
                                            <span
                                                className={
                                                    launch_success
                                                        ? "text-success"
                                                        : "text-danger"
                                                }
                                            >
                                                {launch_success ? "Yes" : "No"}
                                            </span>
                                        </li>
                                        <li>
                                            <div className="images-list">
                                                {flickr_images.map(
                                                    (image, index) => (
                                                        <img
                                                            className="image"
                                                            key={index}
                                                            src={image}
                                                            alt="Rocket"
                                                        />
                                                    )
                                                )}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <h2 className="">Rocket Details</h2>
                                <div className="rocket-details">
                                    <ul>
                                        <li>Rocket ID: {rocket_id}</li>
                                        <li>Rocket Name: {rocket_name}</li>
                                        <li>Rocket Type: {rocket_type}</li>
                                    </ul>
                                </div>
                                <hr />
                                <div className="links">
                                    <NavLink to="/">Back</NavLink>
                                    <a
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        href={article_link}
                                    >
                                        Read more
                                    </a>

                                    <a
                                        rel="noopener noreferrer"
                                        target="_blank"
                                        href={video_link}
                                    >
                                        Watch video
                                    </a>
                                </div>
                            </div>
                        );
                    }}
                </Query>
            </>
        );
    }
}

export default SingleLaunch;
