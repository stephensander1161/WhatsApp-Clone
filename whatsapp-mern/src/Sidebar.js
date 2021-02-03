import React, { useState } from 'react';
import './Sidebar.css';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import ChatIcon from '@material-ui/icons/Chat';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchOutlined from '@material-ui/icons/SearchOutlined';
import SidebarChat from './SidebarChat';

import { Avatar, IconButton } from '@material-ui/core';

function Sidebar({ rooms }) {
	return (
		<div className="sidebar">
			<div className="sidebar__header">
				<Avatar src="" />
				<div className="sidebar__headerRight" />
				<IconButton>
					<DonutLargeIcon />
				</IconButton>
				<IconButton>
					<ChatIcon />
				</IconButton>
				<IconButton>
					<MoreVertIcon />
				</IconButton>
			</div>

			<div className="sidebar__search">
				<div className="sidebar__searchContainer">
					<SearchOutlined />
					<input placeholder="Search or start a new chat" type="text" />
				</div>
			</div>

			<div className="sidebar__chats">
				<SidebarChat addNewChat />
				{rooms.map((room) => (
					<SidebarChat key={room.id} id={room._id} name={room.name} description={room.description} />
				))}
			</div>
		</div>
	);
}

export default Sidebar;
