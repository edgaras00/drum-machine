import React from "react";
import Screen from "./Screen";
import "../styles/menu.css";

const Menu = ({
  audioName,
  volume,
  changeVolume,
  on,
  toggleOn,
  hideKeys,
  toggleHideKeys,
  mode,
  changeMode,
}) => {
  // Menu component (screen, volume, mode, on/off)
  return (
    <div className="menu">
      <Screen audioName={audioName} volume={volume * 1} on={on} />
      <br />
      <label>
        <span>
          <i className="fa fa-volume-up"></i>
        </span>
        {/* Volume level slider */}
        <input
          className="slider"
          type="range"
          min={0}
          max={1}
          step={0.01}
          value={volume}
          onChange={changeVolume}
        />
      </label>
      <br />
      <div className="menu-buttons-container">
        {/* <div className={on ? "menu-buttons-on" : "menu-buttons-off"}> */}
        <div className={`menu-buttons ${!on ? "menu-off" : "menu-on"}`}>
          <button
            className={mode === "heater" ? "selected" : null}
            onClick={() => changeMode("heater")}
          >
            Heater
          </button>
          <button
            className={mode === "piano" ? "selected" : null}
            onClick={() => changeMode("piano")}
          >
            Piano
          </button>
          <button
            className={mode === "electro" ? "selected" : null}
            onClick={() => changeMode("electro")}
          >
            Electro
          </button>
          <button onClick={toggleHideKeys}>
            {hideKeys ? "Show Keys" : "Hide Keys"}
          </button>
        </div>
        <button className="power-button" onClick={toggleOn}>
          {/* Power On/Off style */}
          <i
            className="fa fa-power-off fa-2x"
            style={{ color: on ? "white" : "#C4BFBF" }}
          ></i>
        </button>
      </div>
    </div>
  );
};

export default Menu;
