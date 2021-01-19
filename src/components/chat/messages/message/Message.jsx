import React from 'react';
import PropTypes from 'prop-types';

Message.propTypes = {
    
};

function Message({message: {name, text, user_id}, current_uid}) {

    let isCurrentUser = false;
    if(current_uid === user_id){
        isCurrentUser = true;
    }

    return (
        isCurrentUser?(
        <div className="bubble">
            <div className="msg">
            {name}: {text}
            </div>
        </div>
        ):(
         <div className="bubble bubble-alt green">
            <div className="msg">
            {name}: {text}
            </div>
        </div>
        )
    );
}

export default Message;