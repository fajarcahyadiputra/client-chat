import React, { Component } from 'react';
import PropTypes from 'prop-types';

class input extends Component {
    constructor(props) {
        super(props);

    }


    render() {
        return (
            <div>
            <form action="" onSubmit={this.props.sendMessage} className="form">
               <input 
               className="input"
               placeholder="Type a message"
               className="validate"
               type="text" 
               value={this.props.message} 
               onChange={event=> this.props.setMessage(event.target.value)} 
               onKeyPress={event => event.key === 'Enter' ? this.props.sendMessage(event): null}
               />
               <button className="sendButton" type="submit">Send Message</button>
           </form>
            </div>
        );
    }
}

input.propTypes = {

};

export default input;