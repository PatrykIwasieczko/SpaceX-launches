// React
import React from "react";
import { BrowserRouter, Route } from "react-router-dom";

// Apollo
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

// Components
import LaunchesList from "./components/LaunchesList";
import LaunchDetails from "./components/LaunchDetails";

// Styles & logo
import "./App.scss";
import logo from "./logo.png";

const client = new ApolloClient({
    uri: "http://localhost:5000/graphql"
});

function App() {
    return (
        <ApolloProvider client={client}>
            <BrowserRouter>
                <div className="container">
                    <img className="logo" src={logo} alt="SpaceX" />
                    <Route exact path="/" component={LaunchesList} />
                    <Route
                        path="/launch/:flight_number"
                        component={LaunchDetails}
                    />
                </div>
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
