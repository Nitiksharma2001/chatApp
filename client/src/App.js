import "./App.css";
import io from "socket.io-client";
import {useState} from "react"
const socket = io("http://localhost:4000/")
function App() {
  const [username, setUsername] = useState("")
  const [room, setRoom] = useState("")

  const joinRoom = () =>{
    if(username !== "" && room !== ""){
      socket.emit("join_room", room);
    }
  }
  return (
    <div className="App">
      <h3>Join a Room</h3>
      <input type="text" placeholder="John..." onChange={(e) => setUsername(e.target.value)}/>
      <input type="text" placeholder="Room Id..." onChange={(e) => setRoom(e.target.value)} />
      <button onClick={joinRoom}>Join the Room</button>
    </div>
  )
}

export default App;
