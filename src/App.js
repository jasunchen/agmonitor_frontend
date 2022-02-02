// App.js
// Modified by: Alex Mei
import React, { useState, useEffect } from 'react';
import { Switch , Route, Redirect } from 'react-router-dom';
import { withAuth0 } from "@auth0/auth0-react";
import './App.css';
import "./css/Base.css";
import axios from 'axios';
import {SnapshotPage, ErrorPage, AboutPage, ExplorePage, AssetPage, SpecificAssetPage} from './components/pages';
import ProtectedRoute from './auth/protected-route';
import Navbar from './components/shared/Navbar';
import Footer from './components/shared/Footer';
import Loading from './components/utility/loading';

class App extends React.Component {
  render() {
    const { isLoading } = this.props.auth0;

    if (isLoading) {
      return <Loading />;
    }

    return (
      <main>
          <Navbar />
          <Switch>
            <Route exact path="/">
              {this.props.auth0.user ? <Redirect to="/snapshot" /> : <AboutPage />}
            </Route>
            <Route exact path="/home">
              <Redirect to="/snapshot" />
            </Route>
            <Route path="/about" exact component = {AboutPage}/>
            <ProtectedRoute path="/snapshot" exact component = {SnapshotPage}/>
            <ProtectedRoute path="/asset" exact component = {AssetPage}/>
            <ProtectedRoute path="/explore" exact component = {ExplorePage}/>
            <Route path="/asset/:id"  component = {SpecificAssetPage} />
            <Route path="/error" exact component = {ErrorPage}/>
          </Switch>
          <Footer />
      </main>
    );
  }
}

export default withAuth0(App);
