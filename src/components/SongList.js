

import React from "react";
import styled from "styled-components";

const ListContainer = styled.div`
  flex: 1;
  padding: 20px;
  background: rgba(0, 0, 0, 0.5);
  max-height: 100vh;
  overflow-y: scroll;

  &::-webkit-scrollbar {
    width: 0;
  }
  scrollbar-width: none;
  -ms-overflow-style: none;
  padding-right: 15px;
  margin-right: -15px;
`;

const SongItem = styled.div`
  margin: 10px 0;
  padding: 10px;
  display: flex;
  align-items: center;
  cursor: pointer;
  transition: background 0.3s ease;
  border: 3px solid rgba(255, 255, 255, 0.1);
  height: 70px;
  box-sizing: border-box;
  width: 90%;
  &:hover {
    background: rgba(255, 255, 255, 0.1);
  }
`;

const CoverImage = styled.img`
  width: 60px;
  height: 60px;
  margin-right: 10px;
  border-radius: 15px;
`;

const SongDetails = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  flex: 1;
`;
const SongInfo = styled.div`
  color: white;
  display: flex;
  flex-direction: column; /* Stack artist and song name vertically */
`;

const SongArtist = styled.div`
  font-size: 14px; /* Increase font size */
  margin-bottom: 5px; /* Space between artist and song name */
`;

const SongName = styled.div`
  font-size: 20px; /* Adjust size as needed */
`;



const SongList = ({ songs, onSongSelect }) => {
  return (
    <ListContainer>
      {songs.map((song, index) => (
        <SongItem key={song.id} onClick={() => onSongSelect(song, index)}>
          <CoverImage
            src={`https://cms.samespace.com/assets/${song.cover}`}
            alt="cover"
          />
          <SongDetails>
            <SongInfo>
              <SongName>{song.name}</SongName>
              <SongArtist>{song.artist}</SongArtist>
            </SongInfo>
          </SongDetails>
        </SongItem>
      ))}
    </ListContainer>
  );
};

export default SongList;
