import React,{useContext, useEffect, useState} from 'react';
import {UserContext} from '../../UserContext';
import {Link, Redirect} from 'react-router-dom';
import RoomList from '../room/RoomList';
import io from 'socket.io-client';

let socket;

const Home = () =>{
    const [room, setRoom] = useState('');
    const [rooms, setRooms] = useState([]);
    const {user, setUser} = useContext(UserContext);

    //endpoin server nodejs
    const ENDPT = 'localhost:5000';
    //use sochet io
    useEffect(()=>{
        socket = io(ENDPT);
        return () =>{
            socket.emit('disconnected');
            socket.off();

        }
    }, [ENDPT])

    useEffect(()=>{
        socket.on('room-created', room=>{
            setRooms([...rooms, room]);
        })
    }, [rooms]);

    useEffect(()=>{
        socket.on('data-room', rooms=>{
            setRooms(rooms);
        })
    },[]);


    //handle submit
    const handleSubmit = e =>{
        e.preventDefault();
        socket.emit('create-room', room);
        setRoom('');
    };

    if(!user){
        return <Redirect to="/login"></Redirect>
    }

    return(
        <div>
            <div className="row">
                <div className="col s6">
                <div className="card darken-1">
                    <div className="card-content align-center black-text">
                    <span className="card-title">Welcome {user ? user.name:''}</span>
                    </div>
                    <div className="card-action">
                    <div className="row">
                        <form className="col s12" onSubmit={handleSubmit}>
                        <div className="row">
                            <div className="input-field">
                            <input 
                            id="first_name" 
                            type="text" 
                            className="validate"
                            value={room}
                            onChange={e=> setRoom(e.target.value)}
                            />
                            <label htmlFor="first_name">Enter aroom name</label>
                        </div>
                        </div>
                        <button className="btn" type="submit">Enter</button>
                        </form>
                    </div>
                    </div>
                </div>
                </div>
                <div className="s6">
                    <div className="col s6  offset-1">
                    <RoomList rooms={rooms}></RoomList>
                    <Link to={'/chat'}>
                    <button className="btn " >Go To Chat</button>
                </Link>    
                </div> 
                </div>
            </div>    
        </div>

    )
}

export default Home;