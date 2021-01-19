import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './assets/materialize/css/materialize.min.css';
import {UserContext} from './UserContext'; 
import Chat from './components/chat/Chat';
import Home from './components/home/Home';
import Navbar from './components/templets/Navbar';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';

function App() {

  let [user, setUser] = useState(null);

  useEffect(()=>{
   const verivyUser = async () => {
        try {
          const res = await  fetch('http://localhost:5000/auth/verifyUser',{
          credentials: 'include',
          headers:{"Content-Type":"application/json"}});
          const data = await res.json();
          setUser(data)
        } catch (error) {
          console.log(error.message)
        }
   }
   verivyUser();
  },[])

  return (
    <Router>
      <div className="App container">
          <UserContext.Provider value={{user, setUser}}>
          <Navbar/>
              <Switch>
                  <Route exact path="/" component={Home}></Route>
                  <Route path="/chat/:room_id/:room_name" component={Chat}></Route>
                  <Route path="/login" component={Login}></Route>
                  <Route path="/signup" component={Signup}></Route>
              </Switch>
          </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
