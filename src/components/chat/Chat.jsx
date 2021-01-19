import React,{useContext, useEffect, useState} from 'react';
import {UserContext} from '../../UserContext';
import {Link, useParams, Redirect} from 'react-router-dom';
import Messages from './messages/Messages';
import STB  from 'react-scroll-to-bottom';
import Input from '../input/Input';
import '../../assets/materialize/css/message.css';
import io from 'socket.io-client';
let socket;

const Chat = ()=>{

    const {user, setUser} =  useContext(UserContext);

    //endpoin server nodejs
    const ENDPT = 'localhost:5000';
    //to get params from url
    let {room_id, room_name} = useParams();
    //we use method in useState
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([]);
    //this is we make user in userContext

    useEffect(()=>{
    if(!user){
     }else{
         socket = io(ENDPT);
         socket.emit('join', {name: user.name, room_id: room_id, user_id: user._id})
     }
    },[])

    useEffect(()=>{
        if(!user){

        }else{ 
            socket.on('message', message=>{
                setMessages([...messages, message]);
            })
     }
    },[messages])

    useEffect(()=>{
        if(!user){

        }else{
            socket.on('data-message', message=>{
                setMessages(message);
            })
         }
    })

    const sendMessage = e => {
        e.preventDefault();
        if(message){
            console.log(message);
            socket.emit('sendMessage', message, room_id, ()=>{
                setMessage('')
            });
        }
    }


    return(
            <div className="messages">
                <br/>
                <ol className="chat">
                     {
                         user?<Messages messages={messages} user_id={user._id}></Messages>: <Redirect to="/login?login=true"></Redirect>
                     }
                </ol>
                <Input message={message} sendMessage={sendMessage} setMessage={setMessage}></Input>
            </div>

    )
}

export default Chat;