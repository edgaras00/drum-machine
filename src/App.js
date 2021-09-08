import React, { useState, useEffect, useRef } from "react";
import Button from "./components/Button";
import Menu from "./components/Menu";
import heaterKit from "./data/heaterKit";
import pianoKit from "./data/pianoKit";
import electroKit from "./data/electroKit";
import "./styles/app.css";

function App() {
  // App state

  // Array holding audio objects
  const [audio, setAudio] = useState([]);
  // Audio name that is displayed on screen
  const [activeAudio, setActiveAudio] = useState("");
  // Array holding audio information (name, id, type...)
  const [audioData, setAudioData] = useState([]);
  // On/Off status of the drum-machine
  const [on, setOn] = useState(true);
  // The mode state tracks what audio kit is used ("heater" by default)
  const [mode, setMode] = useState("heater");
  // Audio volume
  const [volume, setVolume] = useState(0.5);

  // changeToggle is used to "force" state change for the activeAudio state
  // Allows the same active audio name to be displayed when the same
  // button is clicked repeatedly
  const [changeToggle, setChangeToggle] = useState(false);
  // Hide / Show keyboard key labels
  const [hideKeys, setHideKeys] = useState(false);
  // Ref to provide access to the drum-machine
  const drumRef = useRef(null);

  useEffect(() => {
    // Change the available sounds based on selected audio kit (mode)
    let data;
    switch (mode) {
      case "heater":
        data = heaterKit;
        break;
      case "piano":
        data = pianoKit;
        break;
      case "electro":
        data = electroKit;
        break;
      default:
        data = "heater";
    }
    // Create an array of sound objects from the audio kit array
    const sounds = data.map((item) => {
      const sound = new Audio(item.src);
      return sound;
    });
    // Information about each sound file/object

    // id: assigned sound id that is looked up if a sound is played
    // each button is assigned a unique id that corresponds to a sound

    // name: name of the sound (e.g. Heater-1)
    // keyId: key code of the keyboard key
    // char: keyboard caharacter
    // type: sound type (e.g. heater, clap, kick, etc...)
    // clicked: boolean if the sound key is pressed or not
    // plays sound if clicked == true
    const soundInfo = data.map((item) => ({
      id: item.id - 1,
      name: item.name,
      keyId: item.key,
      char: item.char,
      type: item.type,
      clicked: false,
    }));
    // set audio state that holds the audio objects
    setAudio(sounds);
    // set audioData state that holds audio object information
    setAudioData(soundInfo);
  }, [mode]);

  function handleClick(id, volume) {
    // Function that takes in a button id and plays a sound where
    // the button id === audio object index in the audio aray

    // Don't do anything if the drum-machine is "off"
    if (!on) return;

    audio.forEach((item, index) => {
      // Each item is an audio object
      // Play the sound if audio object index === clicked button id
      if (id === index) {
        // Clone the audionode to allow the audio to be played multiple
        // times. There is a significant delay otherwise.
        const clone = item.cloneNode();
        clone.volume = Number(volume);
        clone.play();
      }
    });
    // Toggle state is being changed everytime to force
    // the audio name to be redisplayed on the screen
    // with each repetitive button click.
    // It "forces" the activeAudio state to change in order
    // to rerender the active audio name on the screen
    setChangeToggle((prev) => !prev);
    audioData.forEach((item) => {
      if (item.id === id) {
        if (changeToggle) {
          setActiveAudio(item.name);
        } else {
          setActiveAudio(item.name + " ");
        }
      }
    });
  }

  function handleKey(event, volume) {
    // Function that handles key press events

    audioData.forEach((item) => {
      // Check if the audio object's key id === keyboard event keycode
      if (item.keyId === event.keyCode) {
        const id = item.id;

        // Create a copy of the audioData array
        const copy = audioData.map((item) => {
          if (item.id === id) {
            // Change the "clicked" property to true
            return { ...item, clicked: true };
          }
          return item;
        });
        // Change the audioData state with modified data (copy)
        setAudioData(copy);

        // Create another copy of the audioData array
        // This is done to quickly change back the "clicked"
        // property to false
        // Otherwise the button's animation remains in the clicked
        // state
        setTimeout(() => {
          const copy2 = audioData.map((item) => {
            if (item.id === id) {
              return { ...item, clicked: false };
            }
            return item;
          });
          setAudioData(copy2);
        }, 200);

        // If the drum machine is "off" don't play anything
        if (!on) return;
        // Call the handleClick function that plays the volume
        handleClick(id, volume);
      }
    });
  }

  function changeVolume(event) {
    // Function that changes the audio volume state
    setVolume(event.target.value);
  }

  function toggleOn() {
    // Function that changes the drum-machine's on/off state
    setOn((state) => !state);
  }

  function toggleHideKeys() {
    // Function that shows or hides key labels
    setHideKeys((state) => !state);
  }

  function changeMode(value) {
    // Function that changes the mode (audio kit) based on input value
    setMode(value);
  }

  // Create drum machine button components
  const buttonComponents = audioData.map((item) => (
    <Button
      key={item.id}
      id={item.id}
      name={item.name}
      handleClick={handleClick}
      char={item.char}
      type={item.type}
      volume={volume}
      clicked={item.clicked}
      hideKeys={hideKeys}
      power={on}
    />
  ));

  return (
    <div
      // tabIndex = -1 allows the user to play the drum-machine
      // using keyboard keys without having to directly focus
      // on the drum-machine itself
      // E.g. play audio even when a mouse was clicked on
      // the background area
      tabIndex={-1}
      className="app"
      ref={drumRef}
      onKeyDown={(event) => handleKey(event, volume)}
    >
      <div className="container">
        <Menu
          audioName={activeAudio}
          volume={volume}
          changeVolume={changeVolume}
          on={on}
          toggleOn={toggleOn}
          mode={mode}
          changeMode={changeMode}
          hideKeys={hideKeys}
          toggleHideKeys={toggleHideKeys}
        />
        <div className="button-panel">{buttonComponents}</div>
      </div>
    </div>
  );
}

export default App;
