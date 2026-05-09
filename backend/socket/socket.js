import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: ["http://localhost:3000"],
        methods: ["GET", "POST"],
    },
});

export const getReceiverSocketId = (receiverId) => {
    return userSocketMap[receiverId];
};

const userSocketMap = {}; // {userId: socketId}

io.on("connection", (socket) => {
	const userId = socket.handshake.query.userId;
	console.log(`User connected: ${userId} (socketId: ${socket.id})`);

	if (userId && userId !== "undefined") {
		userSocketMap[userId] = socket.id;
	}

	// Broadcast the online users to everyone
	const onlineUsers = Object.keys(userSocketMap);
	console.log("Current Online Users:", onlineUsers);
	io.emit("getOnlineUsers", onlineUsers);

	socket.on("disconnect", () => {
		console.log(`User disconnected: ${userId} (socketId: ${socket.id})`);
		if (userId && userId !== "undefined" && userSocketMap[userId] === socket.id) {
			delete userSocketMap[userId];
		}
		const updatedOnlineUsers = Object.keys(userSocketMap);
		console.log("Updated Online Users:", updatedOnlineUsers);
		io.emit("getOnlineUsers", updatedOnlineUsers);
	});
});

export { app, io, server };