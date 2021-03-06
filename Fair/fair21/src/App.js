import './App.css';
import Home from './Pages/Home/Home';
import {Switch, BrowserRouter, Route} from 'react-router-dom'
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
  import 'react-toastify/dist/ReactToastify.css';
import UpdateDetails from './Pages/UpdateDetails/UpdateDetails';
import Profile from './Pages/Profile/Profile';
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Switch>
          <Route exact path="/home" component={Home}/>
          <Route exact path="/login" component={Login}/>
          <Route exact path="/register" component={Register}/>
          <Route exact path="/new-user" component={UpdateDetails}/>
          <Route exact path="/profile" component={Profile}/>
          <Route path="/" component={Home}/>
          </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
