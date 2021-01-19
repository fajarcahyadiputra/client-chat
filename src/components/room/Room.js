import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Room extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
            <>
                 <div className="card horizontal">
                 <div className="card-stacked">
                     <div  className="card-action ">
                         {this.props.name}
                     </div>
                 </div>
                 </div>
        </>
        );
    }
}

Room.propTypes = {

};

export default Room;