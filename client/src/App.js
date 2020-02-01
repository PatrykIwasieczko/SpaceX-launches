// React
import React from "react";
import "./App.scss";
import { BrowserRouter, Route } from "react-router-dom";

// Apollo
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";

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
                </div>
            </BrowserRouter>
        </ApolloProvider>
    );
}

export default App;
