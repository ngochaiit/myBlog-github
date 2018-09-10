var io = require('socket.io')(3050);
  let usernames = [];
  io.on('connection', function(socket){
    console.log("2233445");
    socket.emit('request', /* */); // emit an event to the socket
    io.emit('broadcast', /* */); // emit an event to all connected sockets
    socket.on('reply', function(){ /* */ }); // listen to the event

    // listen adduser event
    socket.on("adduser", function(username)
  {
    //save
    socket.username = username;
    usernames.push(username);
    
    let data = {
      sender: "SERVER",
      message: "You have to join chat room"
    };
    //notify to myself
    socket.emit("update_message", data);

    //notify to other users
    
    let data1 = 
    {
      sender: "SERVER",
      message: username + "have join to chat room"

    };

    socket.broadcast.emit("update_message", data1);
  });

  //listen send_message
  socket.on("send_message", function(message)
{
  let data = {
    sender: "You",
    message: message,
  }
  //notify to myself
  socket.emit('update_message', data);

  //notify to other users
  let data1 = 
  {
    sender: socket.username,
    message: message
  }
  socket.broadcast.emit('update_message', data1);
})

//listen disconect event

socket.on("disconnect", function()
{
  //delete username
  for(let i = 0; i < usernames.length; i++)
  {
    if(usernames[i] == socket.username)
    {
      usernames.splice(i, 1);
    }
  }

  //notify to other users
  var data = {
    sender: "SERVER",
    message: socket.username + " leave chat room",
  }
  socket.broadcast.emit('update_message', data);

});

    
  });
module.exports = {
    io
}