import React from "react";
import styled from "styled-components";

const SidebarContainer = styled.div`
  width: 250px;
  background-color: black;
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between; /* Ensures top and bottom alignment */
  align-items: center;
  padding: 20px 0;
  height: 100vh; /* Full height of the viewport */
`;


const LogoContainer = styled.div`
  margin-bottom: auto; /* Pushes the logo to the top */
`;

const Logo = styled.img`
  
  width: 133.41px;
  height: 40px;
  top: 32px;
  left: 32px;
  padding: 0.47px 0.94px 0.12px 0.94px;
  gap: 0px;
  opacity: 0px;
`;

const ProfilePicContainer = styled.div`
  margin-top: auto; /* Pushes the profile pic to the bottom */
  margin-bottom: 50px;
`;

const ProfilePic = styled.img`
  width: 100px;
  height:100px;
  border-radius: 50%;
  border: 2px solid white;
`;

const Sidebar = () => {
  return (
    <SidebarContainer>
      <LogoContainer>
        <Logo
          src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_White.png"
          alt="Spotify Logo"
        />
      </LogoContainer>
      {/* You can add more sidebar items in the middle here */}
      <ProfilePicContainer>
        <ProfilePic
          src="https://i.pinimg.com/236x/05/d1/94/05d1948a0b051439f26a835c33b79823.jpg"
          alt="Profile Picture"
        />
      </ProfilePicContainer>
    </SidebarContainer>
  );
};

export default Sidebar;
