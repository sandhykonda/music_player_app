
import React from "react";
import styled from "styled-components";

const SearchBarContainer = styled.div`
  display: flex;
  width:100%;
`;

const SearchInput = styled.input`
  width: 80%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  outline: none;
  font-size: 16px;
  margin-left:15px;
`;

const SearchBar = ({ onSearch }) => (
  <SearchBarContainer>
    <SearchInput
      type="text"
      placeholder="Search for a song..."
      onChange={(e) => {
        console.log("Search input changed:", e.target.value);
        onSearch(e);
      }}
    />
  </SearchBarContainer>
);


export default SearchBar;
