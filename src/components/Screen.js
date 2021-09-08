import React, { useEffect, useState } from "react";
import "../styles/screen.css";

const Screen = ({ audioName, volume, on }) => {
  // Screen component that shows the audio volume level and audio name

  // State required for the audio name display animation
  const [restartAnimation, setRestartAnimation] = useState(false);

  // Restart animation everytime the audioName changes
  useEffect(() => {
    return () => setRestartAnimation((prev) => !prev);
  }, [audioName]);

  return (
    <div
      key={restartAnimation ? "1" : "0"}
      className={on ? "screen-on" : "screen-off"}
    >
      {on ? (
        <span className="volume">
          <i
            className={volume > 0 ? "fa fa-volume-up" : "fa fa-volume-off"}
          ></i>
          {Math.floor(volume * 100)}
        </span>
      ) : null}
      <span className="audio-name">{audioName}</span>
    </div>
  );
};

export default Screen;
