// React
import React from "react";
import { NavLink } from "react-router-dom";

const Launch = ({
    launch: {
        flight_number,
        mission_name,
        launch_date_utc,
        launch_success,
        links: { flickr_images, article_link, video_link, mission_patch }
    }
}) => {
    return (
        <div className="launch-item">
            <li>{mission_name}</li>
            <li>{launch_date_utc}</li>
            <li>{launch_success}</li>
            <li>
                {flickr_images[0] ? (
                    <img
                        className="launch-image"
                        src={flickr_images[0]}
                        alt="Launch"
                    ></img>
                ) : mission_patch ? (
                    <img
                        className="launch-image"
                        src={mission_patch}
                        alt="Launch"
                    ></img>
                ) : (
                    <p>Mission is about to start</p>
                )}
            </li>
            <NavLink to={`/launch/${flight_number}`}>Launch details</NavLink>
        </div>
    );
};

export default Launch;
