
import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import SearchBar from "./components/SearchBar";
import SongList from "./components/SongList";
import Player from "./components/Player";
import Sidebar from "./components/Sidebar";
import TrackSection from "./components/TrackSection";

const AppContainer = styled.div`
  display: flex;
  height: 100vh;
`;


const MainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex: 1;
  overflow: hidden;
`;

const SongListWrapper = styled.div`
  flex: 1.5;
  padding: 20px;
  background: black;
  display: flex;
  flex-direction: column;
`;

const FixedTopSection = styled.div`
  position: sticky;
  top: 0;
  z-index: 1;
  background: black;
  padding-bottom: 10px;
`;

const ScrollableSongList = styled.div`
  flex: 1;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const PlayerWrapper = styled.div`
  width: 600px;
  background: black;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;



 function App() {
  const [songs, setSongs] = useState([]);
  const [filteredSongs, setFilteredSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  useEffect(() => {
    axios
      .get("https://cms.samespace.com/items/songs")
      .then((response) => {
        const data = response.data.data;
        setSongs(data);
        setFilteredSongs(data);
        setCurrentSongIndex(0); // Set default song index to 0
      })
      .catch((error) => {
        console.error("Error fetching songs:", error);
      });
  }, []);

  useEffect(() => {
    // Ensure currentSongIndex is within bounds
    if (filteredSongs.length > 0 && currentSongIndex >= filteredSongs.length) {
      setCurrentSongIndex(filteredSongs.length - 1);
    }
  }, [filteredSongs, currentSongIndex]);

  const handleSearch = (event) => {
    const query = event.target.value.toLowerCase();
    const filtered = songs.filter((song) =>
      song.name.toLowerCase().includes(query)
    );
    setFilteredSongs(filtered);
    // Reset current song index if filteredSongs is empty
    if (filtered.length === 0) {
      setCurrentSongIndex(0);
    }
  };

  const handleSongSelect = (song, index) => {
    setCurrentSongIndex(index);
  };

  const setSongFilter = (filterType) => {
    if (filterType === "topTracks") {
      setFilteredSongs(songs.filter((song) => song.top_track));
    } else {
      setFilteredSongs(songs);
    }
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : filteredSongs.length - 1
    );
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex < filteredSongs.length - 1 ? prevIndex + 1 : 0
    );
  };

  const currentSong = filteredSongs[currentSongIndex];

  return (
    <AppContainer>
      <Sidebar />
      <MainContent>
        <ContentWrapper>
          <SongListWrapper>
            <FixedTopSection>
              <TrackSection setSongFilter={setSongFilter} />
              <SearchBar onSearch={handleSearch} />
            </FixedTopSection>
            <ScrollableSongList>
              <SongList songs={filteredSongs} onSongSelect={handleSongSelect} />
            </ScrollableSongList>
          </SongListWrapper>
          <PlayerWrapper>
            {currentSong && (
              <Player
                song={currentSong}
                onNext={handleNext}
                onPrevious={handlePrevious}
              />
            )}
          </PlayerWrapper>
        </ContentWrapper>
      </MainContent>
    </AppContainer>
  );
}

export default App;

