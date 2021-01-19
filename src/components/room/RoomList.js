import React, { Component } from 'react';
import Room from './Room';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';


class RoomList extends Component {
    constructor(props) {
        super(props);

    }

    render() {
        return (
                this.props.rooms && this.props.rooms.map(room=>(
                    <Link key={room._id} to={`/chat/${room._id}/${room.name}`}>
                        <Room name={room.name} key={room._id}></Room>
                    </Link>
           ))
        );
    }
}

RoomList.propTypes = {

};

export default RoomList;