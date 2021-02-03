import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Pusher from 'pusher-js';
import axios from './axios';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
function App() {
	const [ messages, setMessages ] = useState([]);
	const [ rooms, setRooms ] = useState([]);

	useEffect(() => {
		axios.get('/messages/sync').then((response) => {
			setMessages(response.data);
		});
	}, []);
	useEffect(() => {
		axios.get('/rooms/sync').then((response) => {
			setRooms(response.data);
		});
	}, []);
	useEffect(
		() => {
			const pusher = new Pusher('a6f563d1c61755c53d19', {
				cluster: 'us3'
			});
			const channel = pusher.subscribe('messages');
			channel.bind('inserted', (newMessage) => {
				alert(JSON.stringify(newMessage));
				setMessages([ ...messages, newMessage ]);
			});
			return () => {
				channel.unbind_all();
				channel.unsubscribe();
			};
		},
		[ messages ]
	);

	console.log(messages);

	return (
		<div className="app">
			<div className="app__body">
				<Router>
					<Sidebar rooms={rooms} />
					<Switch>
						<Route path="/rooms/:roomId">
							<Chat messages={messages} />
						</Route>
					</Switch>
				</Router>
			</div>
		</div>
	);
}

export default App;
