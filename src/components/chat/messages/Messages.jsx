import React, {Component} from 'react';
import Message from './message/Message';

class Messages extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <>
                 {this.props.messages? this.props.messages.map((message, i)=>{
                        return(
                            <Message key={i} message={message} current_uid={this.props.user_id}></Message>
                        )
                 }) : 'Nothing Message'}
            </>
        )
    }
}

export default Messages;