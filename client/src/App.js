import React, { useEffect } from "react";
import Login from "./Components/Pages/LoginPage/Login";
import Register from "./Components/Pages/RegisterPage/Register";
import Alert from "./Components/AlertSnackBar";
import { BrowserRouter, Switch } from "react-router-dom";
import Boards from "./Components/Pages/BoardsPage/Boards";
import ProtectedRoute from "./Utils/ProtectedRoute";
import { loadUser } from "./Services/userService";
import Store from "./Redux/Store";
import { Route } from "react-router-dom";
import FreeRoute from "./Utils/FreeRoute";
import Board from "./Components/Pages/BoardPage/Board";
import axios from "axios";
axios.defaults.baseURL =
  "https://us-central1-trello-application-5672d.cloudfunctions.net/trello";
const App = () => {
  useEffect(() => {
    loadUser(Store.dispatch);
  }, []);
  return (
    <BrowserRouter>
      <Alert />
      <Switch>
        <ProtectedRoute exact path="/boards" component={Boards} />
        <ProtectedRoute exact path="/board/:id" component={Board} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <FreeRoute exact path="/" component={Login} />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
