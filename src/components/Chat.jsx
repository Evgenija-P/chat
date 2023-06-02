import React from 'react';
import io from 'socket.io-client';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import EmojiPicker from 'emoji-picker-react';

import icon from '../components/images/emoji.svg';
import Messages from './Messages';

const socket = io.connect('https://chat-bn62.onrender.com');

const Chat = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const [params, setParams] = useState({ room: '', user: '' });
  const [state, setState] = useState([]);
  const [message, setMessage] = useState('');
  const [isOpen, setOpen] = useState(false);
  const [users, setUsers] = useState(0);

  useEffect(() => {
    const searchParams = Object.fromEntries(new URLSearchParams(search));
    setParams(searchParams);
    socket.emit('join', searchParams);
  }, [search]);

  useEffect(() => {
    socket.on('message', ({ data }) => {
      setState(_state => [..._state, data]);
    });
  }, []);

  useEffect(() => {
    socket.on('room', ({ data: { users } }) => {
      setUsers(users.length);
    });
  }, []);

  const leftRoom = () => {
    socket.emit('leftRoom', { params });
    navigate('/');
  };

  const handleChange = ({ target: { value } }) => setMessage(value);

  const handleSubmit = e => {
    e.preventDefault();

    if (!message) return;

    socket.emit('sendMessage', { message, params });

    setMessage('');
  };

  const onEmojiClick = ({ emoji }) => setMessage(`${message} ${emoji}`);

  return (
    <div className="">
      <div className="absolute top-1/2 left-2/4 -translate-x-1/2 -translate-y-1/2 p-4 text-white w-full h-[600px] border border-indigo-950 flex justify-between flex-col bg-indigo-900 rounded-xl text-lg">
        <div className="flex justify-between mb-3 content-center border-b-2 border-indigo-950 pb-2">
          <div>Room: {params.room}</div>
          <div>{users} users in this room</div>
          <button
            onClick={leftRoom}
            className="bg-white rounded-lg text-indigo-800 p-1 h-full hover:shadow-[0_5px_20px_-5px_rgba(241,232,249,0.3)] focus:shadow-[0_5px_20px_-5px_rgba(241,232,249,0.3)]"
          >
            Left the room
          </button>
        </div>

        <div className="overflow-auto">
          <Messages messages={state} name={params.name} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex justify-between mt-3 content-center border-t-2 border-indigo-950 pt-2"
        >
          <input
            type="text"
            name="message"
            placeholder="What do you want to say?"
            value={message}
            onChange={handleChange}
            autoComplete="off"
            required
            className="text-indigo-800 rounded-lg px-2 py-1 outline-none w-full mr-3"
          />
          <div className="flex gap-x-2 relative">
            <img src={icon} alt="" onClick={() => setOpen(!isOpen)} />

            {isOpen && (
              <div className="absolute bottom-0 right-40">
                <EmojiPicker onEmojiClick={onEmojiClick} />
              </div>
            )}

            <div className="bg-white rounded-lg text-indigo-800 p-1 hover:shadow-[0_5px_20px_-5px_rgba(241,232,249,0.3)] focus:shadow-[0_5px_20px_-5px_rgba(241,232,249,0.3)]">
              <input
                type="submit"
                onSubmit={handleSubmit}
                value="Send a message"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Chat;
