$(function(){
	var socket = io.connect('https://xtensiochat.herokuapp.com/')
	var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
	var feedback = $("#feedback")

	send_message.click(function(){
		socket.emit('new_message', {message : message.val()})
	})

	socket.on("connection message", (data) => {
		chatroom.append($('<p>').text(data));
	})

	socket.on("new_message", (data) => {
		feedback.html('');
		message.val('');
		chatroom.append($('<p class="message">').text(data.username + " : " + data.message));
	})

	send_username.click(function(){
		socket.emit('change_username', {username : username.val()})
		if(username.val() !== ""){
			$('#change_username').hide();
		}
	})

	message.bind("keypress", () => {
		socket.emit('typing')
	})

	socket.on('typing', (data) => {
		feedback.html($('<p>').text(data.username + " is typing a message..."))
	})
});