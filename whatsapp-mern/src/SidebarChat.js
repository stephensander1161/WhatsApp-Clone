import React, { useEffect, useState } from 'react';
import './SidebarChat.css';
import { Avatar } from '@material-ui/core';
import axios from './axios';
import { Link } from 'react-router-dom';

function SidebarChat({ addNewChat, id, name, description }) {
	const [ seed, setSeed ] = useState('');
	const [ input, setInput ] = useState('');

	useEffect(() => {
		setSeed(Math.floor(Math.random() * 5000));
	}, []);

	const createChat = (e) => {
		const roomName = prompt('please enter name for chat room');
		const roomDescription = prompt('now enter a description');

		if (roomName) {
			axios.post('/rooms/new', {
				name: roomName,
				description: roomDescription
			});
			window.location.reload(true);
		}
	};

	return !addNewChat ? (
		<Link to={`/rooms/${id}`}>
			<div className="sidebarChat">
				<Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
				<div className="sidebarChat__info">
					<h4>{name}</h4>
					<p>{description}</p>
				</div>
			</div>
		</Link>
	) : (
		<div onClick={createChat} className="sidebarChat">
			<h2>Add New Chat</h2>
		</div>
	);
}

export default SidebarChat;
