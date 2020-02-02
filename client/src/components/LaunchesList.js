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
    state = {
        searchedMissionName: "",
        searchParameter: "all"
    };
    handleSearchParameterChange = event => {
        this.setState({
            searchParameter: event.target.value
        });
    };
    handleMissionNameChange = event => {
        this.setState({
            searchedMissionName: event.target.value
        });
    };
    render() {
        return (
            <div className="launches-list">
                <h1>LaunchesList</h1>
                <div className="search-bar">
                    <select
                        value={this.state.searchParameter}
                        onChange={this.handleSearchParameterChange}
                        name="searchBy"
                        id="searchBy"
                    >
                        <option value="all">All</option>
                        <option value="true">Successfull launches</option>
                        <option value="false">Unsuccessfull launches</option>
                    </select>
                    <input
                        onChange={this.handleMissionNameChange}
                        type="text"
                        placeholder="Mission name"
                    />
                    <i
                        onClick={this.handleSearch}
                        className="fas fa-search fa-2x"
                    ></i>
                </div>
                <Query query={LAUNCHESLIST_QUERY}>
                    {({ loading, error, data }) => {
                        if (loading) return <h4>Loading...</h4>;
                        if (error) console.log(error);

                        return (
                            <ul className="list">
                                {data.launches
                                    .filter(singleLaunch => {
                                        if (
                                            this.state.searchParameter === "all"
                                        ) {
                                            return singleLaunch.mission_name
                                                .toLowerCase()
                                                .includes(
                                                    this.state.searchedMissionName.toLowerCase()
                                                );
                                        } else {
                                            return (
                                                singleLaunch.mission_name
                                                    .toLowerCase()
                                                    .includes(
                                                        this.state.searchedMissionName.toLowerCase()
                                                    ) &&
                                                String(
                                                    singleLaunch.launch_success
                                                ) === this.state.searchParameter
                                            );
                                        }
                                    })
                                    .map(launch => (
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
