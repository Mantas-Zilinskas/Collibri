import React, {useEffect, useState} from "react";
import {Button, Grid, Paper} from '@mui/material';
import {useParams} from "react-router-dom";
import Header from "../Header";
import {RoomSettings} from "../RoomSettings";
import {SideRoomTable} from "../SideRooms";
import {AddSection} from "../Buttons/AddSection";
import SectionsContainer from "../Containers/SectionsContainer";
import {UserInfoContainer} from "../Containers/UserInfoContainer";
import {AddPostButton} from "../Buttons/AddPostButton";
import SearchBar from "../SearchBar";
import PostContainer from "../Containers/PostContainer";
import {getSections} from "../../api/SectionApi";
import {postContainerStyle} from "../../styles/RoomLayoutStyle";



const RoomLayout = () => {
    const [sectionId, setSectionId] = useState(0);
    const [sections, setSections] = useState([]);
    const [posts, setPosts] = useState([]);


    const {roomId} = useParams()

    useEffect(() => {
        getSections(setSections, roomId);
    }, [roomId]);

    return (

        <Grid container spacing={2}
              direction="row"
              justifyContent="space-evenly"
              alignItems="strech">
            <Grid item xs={12}>
                <Paper><Header/></Paper>
            </Grid>
            <Grid item xs={1}>
                <RoomSettings/>
                <SideRoomTable/>

            </Grid>
            <Grid item md={4}>
                <AddSection sections={sections} setSections={setSections}></AddSection>
                <Paper><SectionsContainer sections={sections} setSections={setSections}
                                          setSectionId={setSectionId}/>
                </Paper>
                <UserInfoContainer username={"Future User"}/>
            </Grid>
            <Grid  item xs={6}>
                <Grid container
                      direction="row"
                      sx={{mb:'0.5rem'}}
                ><AddPostButton sectionId={sectionId} setPosts={setPosts}/>
                    <SearchBar posts={posts} sectionId={sectionId} setPosts={setPosts}/>
                </Grid>

                <Paper sx={postContainerStyle}>
                    <PostContainer sectionId={sectionId} posts={posts} setPosts={setPosts}/>
                </Paper>
            </Grid>
        </Grid>

    );
}

export default RoomLayout;