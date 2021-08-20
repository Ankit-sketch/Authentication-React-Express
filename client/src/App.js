import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LoginScreen from './components/Screens/LoginScreen'
import RegisterScreen from './components/Screens/RegisterScreen'
import ForgotPasswordScreen from './components/Screens/ForgotPasswordScreen'
import ResetPasswordScreen from './components/Screens/ResetPasswordScreen'

const App = () => {
  return (
    <Router>
    <div className="App"> 
      <Switch>
       <Route exact path = "/login" component = {LoginScreen} />
       <Route exact path = "/register" component = {RegisterScreen} />
       <Route exact path = "/forgotpassword" component = {ForgotPasswordScreen} />
       <Route exact path = "/resetpassword/:resetToken" component = {ResetPasswordScreen} />
      </Switch>  
    </div>
    </Router>
  );
}

export default App;
