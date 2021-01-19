import React, { Component} from 'react';
import {UserContext} from '../../UserContext';

class Login extends Component {
    static contextType = UserContext;
    constructor(props) {
        super(props);
        this.state = {
           message: false,
           messageLogin: false,
           email: '',
           password: '',
           errors: {
            errorEmail: '',
            errorPassword : ''
           }
        }

    }

    componentDidMount(){
        const location = this.props.location.search;
        const params = new URLSearchParams(location)
        if(params.get('signup') === 'true'){
            this.setState({
                message: true
            })
        }else if(params.get('login') === 'true'){
            this.setState({
                messageLogin: true
            })
        }
    }


    render() {
        const {message, messageLogin} = this.state;
        const {errorEmail, errorPassword} = this.state.errors;
        const {user, setUser} = this.context;

        const handleOnChange = (e)=>{
            const name = e.target.getAttribute('name')
            this.setState({
                [name]: e.target.value
            })
        }

        const handleSubmit=(e)=>{
            e.preventDefault();
            this.setState({
                errors: {
                 errorEmail: '',
                 errorPassword: ''
                }
             })
           fetch('http://localhost:5000/auth/login',{
               method: 'POST',
               credentials: 'include',
               headers: {"Content-Type":"application/json"},
               body: JSON.stringify({email: this.state.email, password: this.state.password})
           }).then(res=>res.json())
           .then(res=>{
               if(res.message){
                const fieldname = 'error'+res.message.split(" ")[0];
                this.setState({
                   errors: {
                    [fieldname]: res.message
                   }
                })
            }
    
            if(res.user){
                setUser(res.user);
                this.props.history.push('/');
            }
        })
    
        }

        if(user){
            this.props.history.push('/');
        }

        return (
            <div>
                <div className="row">
                <div className="col s12">
                {
                    message? 
                    <div className="card-panel green accent-3"><b>Selamat Anda Sudah Terdaftar, Silakan Login</b></div>
                         : 
                        <></>
                }
                 {
                    messageLogin? 
                    <div className="card-panel green accent-3"><b>Anda Harus Login Terlebih Dahulu.</b></div>
                         : 
                        <></>
                }
                <div className="card darken-1">
                    <div className="card-content align-center black-text">
                    <span className="card-title">Welcome</span>
                    </div>
                    <div className="card-action">
                    <div className="row">
                        <form className="col s12" onSubmit={handleSubmit}>
                        <div className="row">
                        <div className="input-field">
                            <input 
                            id="name" 
                            type="text" 
                            name="email"
                            onChange={handleOnChange}
                            className="validate"
                            />
                            <div className="email error red-text">{this.state.errors.errorEmail}</div>
                            <label htmlFor="email">Enter Your Email</label>
                        </div>
                        <div className="input-field">
                            <input 
                            id="password" 
                            type="password" 
                            onChange={handleOnChange}
                            name="password"
                            className="validate"
                            />
                            <div className="password error red-text">{this.state.errors.errorPassword}</div>
                            <label htmlFor="password">Enter Your Password</label>
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


export default Login;