
import React, { useState } from "react";
import styled from "styled-components";

const SectionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background: black;
  color: white;
  border-bottom: none; /* Remove any border at the bottom */
`;

const SectionButton = styled.button`
  background: none;
  border: none;
  color: ${({ isActive }) => (isActive ? "gray" : "white")};
  font-size: 18px;
  cursor: pointer;
  outline: none;
  padding: 5px 10px;
  margin: 0; /* Ensure no margin is added */
  box-shadow: none; /* Remove any box shadow */

  &:hover {
    color: gray;
  }
`;

const TrackSection = ({ setSongFilter }) => {
  const [activeSection, setActiveSection] = useState("forYou");

  const handleSectionClick = (section) => {
    setActiveSection(section);
    setSongFilter(section);
  };

  return (
    <SectionContainer>
      <SectionButton
        isActive={activeSection === "forYou"}
        onClick={() => handleSectionClick("forYou")}
      >
        For You
      </SectionButton>
      <SectionButton
        isActive={activeSection === "topTracks"}
        onClick={() => handleSectionClick("topTracks")}
      >
        Top Tracks
      </SectionButton>
    </SectionContainer>
  );
};

export default TrackSection;
