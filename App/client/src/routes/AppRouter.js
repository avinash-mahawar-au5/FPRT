import React, { Component, Fragment, Suspense, lazy } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import "../App.css";
import "../styles/Home.css";
const Home = lazy(() => import("../pages/Home"));
const Boards = lazy(() => import("../pages/Boards"));
const Auth = lazy(() => import("../components/Auth"));

class AppRouter extends Component {
  state = {};
  render() {
    return (
      <BrowserRouter>
        <Suspense fallback={<div></div>}>
          <Switch>
            <Route path="/" component={Home} exact />
            <Auth>
              <Fragment>
                <div className=" page">
                  <Route path="/u/:id" component={Boards} />
                </div>
              </Fragment>
            </Auth>
          </Switch>
        </Suspense>
      </BrowserRouter>
    );
  }
}

export default AppRouter;
