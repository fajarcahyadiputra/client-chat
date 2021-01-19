import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {UserContext} from '../../UserContext';

class Navbar extends Component{
    static contextType = UserContext;
    constructor(props){
        super(props);
    }

     logout = async () => {
        const {user, setUser} = this.context;
        try {
            const res = await  fetch('http://localhost:5000/auth/logout');
            const data = await res.json();
            console.log('logout', data);
            setUser(null)
        } catch (error) {
            console.log(error.message)
        }
    }

    render(){
        const {user, setUser} = this.context;
        return(
            <>
            <nav>
                <div className="nav-wrapper">
               <Link to="/" className="brand-logo">Home</Link>
                <a href="#" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                <ul className="right hide-on-med-and-down">
                    {
                    user? <li><a onClick={this.logout} href="#">Logout</a></li>:
                       <>
                         <li><Link to="/login">Login</Link></li>
                        <li><Link to="/signup">Signup</Link></li>
                       </>
                    }
                    </ul>
                </div>
            </nav>
    
            <ul className="sidenav" id="mobile-demo">
            <li><Link to="/login">Login</Link></li>
            <li><Link to="/signup">Signup</Link></li>
            <li><a onClick={this.logout} href="#">Logout</a></li>
            </ul>
        </>
        )
    }
}

export default Navbar;