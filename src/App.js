import React, { useState, useEffect, useCallback, useRef } from "react";
import { Stomp } from "@stomp/stompjs";
import SockJS from "sockjs-client";
import Cylinder3d from "./components/rendering/Cylinder3d";
import { Canvas } from "@react-three/fiber";
import MainCanvas from "./components/rendering/MainCanvas";

function App() {
  const [name, setName] = useState("");
  const [planets, setPlanets] = useState("");
  const [connected, setConnected] = useState(false);

  let initialized = false;

  const headers = {
    login: "username",
    passcode: "password",
  };

  const stompClientRef = useRef(null);

  const connect = useCallback(async () => {
    console.log("connecting...");

    let socket = new SockJS(`http://localhost:8080/ws`);
    const client = Stomp.over(socket);

    setConnected("pending");
    await client.connect(headers, onConnected, onError);

    stompClientRef.current = client;

    console.log("WebSocket connection established");
  }, [headers]);

  const onConnected = useCallback(() => {
    setConnected(true);
    console.log("WebSocket connection established");
    stompClientRef.current.subscribe("/user/sim/transfer", onUpdate);
  }, []);

  const onUpdate = useCallback((payload) => {
    console.log("Received payload:", payload);
    setPlanets(payload.body);
  }, []);

  const onError = useCallback((err) => {
    setConnected(false);
    console.log("WebSocket error:", err);
  }, []);

  const sendValue = useCallback(() => {
    if (stompClientRef.current) {
      var chatMessage = {
        name: name,
        content: "test content",
      };
      console.log("Sending payload:", chatMessage);
      stompClientRef.current.send(
        "/app/transfer",
        {},
        JSON.stringify(chatMessage)
      );
    }
  }, [name]);

  useEffect(() => {
    if (!initialized) {
      console.log(initialized);
      initialized = true;
      console.log("USE EFFECT");
      connect();
      console.log("Connected: " + connected);
    }
  }, []);

  const handleSubmit = useCallback(
    (event) => {
      sendValue();
      event.preventDefault();
    },
    [sendValue]
  );

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter your name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <button type="submit" onSubmit={() => sendValue()}>
          Send
        </button>
      </form>
      {planets && <p>{planets}</p>}
      <section className="App-header"></section>
      <MainCanvas planets={planets} />
    </div>
  );
}
export default App;
