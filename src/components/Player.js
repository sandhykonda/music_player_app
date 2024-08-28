
import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import {
  FaPlay,
  FaPause,
  FaForward,
  FaBackward,
  FaVolumeUp,
  FaVolumeMute,
} from "react-icons/fa";

const PlayerContainer = styled.div`
  background: black;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: white;
  width: 50%;
  margin-left: 3%;
`;

const AlbumArt = styled.img`
  width: 400px;
  height: 400px;
  border-radius: 10px;
`;

const SongTitle = styled.h2`
  margin: 10px 0;
`;

const SongName = styled.h4`
  margin: 5px 0;
`;

const ControlsWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 10px;
  width: 100%;
`;

const ControlButton = styled.button`
  background: darkgray;
  border: none;
  color: white;
  height: 50px;
  font-size: 30px;
  margin: 0 0 0 35px;
  cursor: pointer;
  border-radius: 50%;
  padding: 10px;
  align-items: center;
  transition: background 0.3s;

  &:hover {
    background: gray;
  }
`;

const VolumeControl = styled.div`
  display: flex;
  align-items: center;
  
`;

const VolumeSlider = styled.input`
  display: ${({ show }) => (show ? "block" : "none")};
  width: 100px;
  margin-left: 1px;
  background: rgba(255, 255, 255, 0.2);
`;

const AudioBar = styled.div`
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.2);
  margin-top: 20px;
  position: relative;
`;

const AudioProgress = styled.div`
  height: 100%;
  width: ${({ progress }) => progress}%;
  background: white;
`;

const AudioControls = styled.audio`
  width: 100%;
  display: none;
`;



function Player({ song, onNext, onPrevious }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [volume, setVolume] = useState(1);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
      const updateProgress = () => {
        if (audioRef.current) {
          const percentage =
            (audioRef.current.currentTime / audioRef.current.duration) * 100;
          setProgress(percentage);
        }
      };
      audioRef.current.addEventListener("timeupdate", updateProgress);

      return () => {
        audioRef.current.removeEventListener("timeupdate", updateProgress);
      };
    }
  }, [volume, song]);

  useEffect(() => {
    if (song && isPlaying) {
      const playAudio = () => {
        if (audioRef.current) {
          audioRef.current.play().catch((error) => {
            console.error("Auto-play was prevented:", error);
          });
        }
      };
      // Ensure that playAudio is triggered after a user interaction
      playAudio();
    }
  }, [song, isPlaying]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch((error) => {
          console.error("Play failed:", error);
          // Auto-play might be blocked, so you can prompt the user here or handle it as needed
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeClick = () => {
    setShowVolumeSlider(!showVolumeSlider);
  };

  const handleVolumeChange = (event) => {
    setVolume(event.target.value);
  };

  return (
    <PlayerContainer>
      <SongTitle>{song ? song.artist : "No song"}</SongTitle>
      <SongName>{song ? song.name : "No song selected"}</SongName>
      <AlbumArt
        src={`https://cms.samespace.com/assets/${song?.cover}`}
        alt={song?.name}
      />
      <AudioBar>
        <AudioProgress progress={progress} />
      </AudioBar>
      <ControlsWrapper>
        <ControlButton onClick={onPrevious}>
          <FaBackward />
        </ControlButton>
        <ControlButton onClick={handlePlayPause}>
          {isPlaying ? <FaPause /> : <FaPlay />}
        </ControlButton>
        <ControlButton onClick={onNext}>
          <FaForward />
        </ControlButton>
        <VolumeControl>
          <ControlButton onClick={handleVolumeClick}>
            {volume === 0 ? <FaVolumeMute /> : <FaVolumeUp />}
          </ControlButton>
          <VolumeSlider
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            show={showVolumeSlider}
          />
        </VolumeControl>
      </ControlsWrapper>
      <AudioControls ref={audioRef} controls src={song?.url}>
        Your browser does not support the audio element.
      </AudioControls>
    </PlayerContainer>
  );
}

export default Player;
