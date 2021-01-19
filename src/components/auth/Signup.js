import React, { Component} from 'react';
import {UserContext} from '../../UserContext';

class Signup extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email:'',
            password: '',
            errors : {
                errorName : '',
                errorEmail: '',
                errorPassword: ''
            }
        }
    } 

   
    
    
    render() {
        const {user, setUser} = this.context;

        if(user){
            this.props.history.push('/');
        }

        const handleSubmit = (e) =>{
            e.preventDefault();
            this.setState({
                errors: {
                    errorName: '',
                    errorEmail: '',
                    errorPassword: ''
                }
            })
            fetch('http://localhost:5000/auth/signup',{
                method: "POST",
                credentials: "include",
                headers: {"Content-Type":"application/json"},
                body   : JSON.stringify({name: this.state.name, email:this.state.email, password: this.state.password})
            }).then(response=>{
                return response.json();
            }).then(response=>{
                const data = response;
                if(data.errors){
                    this.setState({
                        errors: {
                            errorName: data.errors.name,
                            errorEmail: data.errors.email,
                            errorPassword: data.errors.password
                        }
                    })
                }
                if(data.user){
                    setUser(data.user)
                }
               
            }).catch(err=>{
                console.log(err)
            })
    
            return this.props.history.push('/login?signup=true');
        }
        
        
       
        
        const handleOnchange = (e)=>{
            const name = e.target.getAttribute('name');
            this.setState({
                [name] : e.target.value
            })
        }

        return (
            <div>
            <div className="row">
            <div className="col s12">
            <div className="card darken-1">
                <div className="card-content align-center black-text">
                <span className="card-title center-align">SIGN UP </span>
                </div>
                <div className="card-action">
                <div className="row">
                    <form className="col s12" onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="input-field">
                            <input 
                            id="name" 
                            type="text" 
                            name="name"
                            onChange={handleOnchange}
                            className="validate"
                            />
                            <div className="name error red-text">{this.state.errors.errorName}</div>
                            <label htmlFor="name">Enter Your Name</label>
                        </div>
                        <div className="input-field">
                            <input 
                            id="email" 
                            type="text" 
                            name="email"
                            onChange={handleOnchange}
                            className="validate"
                            />
                            <div className="email error red-text">{this.state.errors.errorEmail}</div>
                            <label htmlFor="email">Enter Your Email</label>
                        </div>
                        <div className="input-field">
                            <input 
                            id="password" 
                            type="text" 
                            name="password"
                            onChange={handleOnchange}
                            className="validate"
                            />
                            <div className="password error red-text">{this.state.errors.errorPassword}</div>
                            <label htmlFor="password">Enter New Password</label>
                        </div>
                    </div>
                    <button className="btn" type="submit">Enter</button>
                    </form>
                </div>
                </div>
            </div>
            </div>
        </div>    
        </div>
        );
    }
}


export default Signup;