import React, { useEffect, useState } from "react";
import { Box, Button, Grid, Paper, Typography } from '@mui/material';
import Header from "../Header";
import { RoomSettings } from "../RoomSettings";
import { SideRoomTable } from "../SideRooms";
import { AddSection } from "../Buttons/AddSection";
import SectionsContainer from "../Containers/SectionsContainer";
import { UserInfoContainer } from "../Containers/UserInfoContainer";
import { AddPostButton } from "../Buttons/AddPostButton";
import SearchBar from "../SearchBar";
import PostContainer from "../Containers/PostContainer";
import { getSections } from "../../api/SectionApi";
import { RoomLayoutStyle } from "../../styles/RoomLayoutStyle";
import { useDispatch, useSelector } from "react-redux";
import { getRoomTags } from "../../api/TagAPI";
import { getQuizes } from "../../api/QuizAPI"
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Divider from '@mui/material/Divider';

const RoomLayout = () => {
    const [sectionId, setSectionId] = useState(0);
    const [sections, setSections] = useState([]);
    const [quizes, setQuizes] = useState([]);
    const [posts, setPosts] = useState([]);
    const [tags, setTags] = useState([]);
    const currentRoom = useSelector((state) => state.rooms.currentRoom);


    useEffect(() => {
        getQuizes(setQuizes, currentRoom.id);
        getSections(setSections, currentRoom.id);
        getRoomTags(currentRoom.id, setTags);
    }, [currentRoom.id]);

    const addNewPost = (newPost) => {
        const updatedList = [...posts, newPost];

        setPosts(updatedList);
    }

    return (

        <Grid //container
            direction="row"
            sx={RoomLayoutStyle.grid}
        // justifyContent="space-evenly"
        // alignItems="strech"
        >
            <Grid sx={RoomLayoutStyle.roomGrid}>
                <Drawer
                    sx={RoomLayoutStyle.roomDrawer}
                    variant="permanent"
                >
                    <Box sx={RoomLayoutStyle.titleBox}>
                        <Toolbar>
                            <Typography variant="h4" style={RoomLayoutStyle.title}>
                                Collibri
                            </Typography>
                        </Toolbar>
                    </Box>
                    <Box sx={RoomLayoutStyle.dividerBox}>
                        <Divider variant="middle">
                            <Typography sx={RoomLayoutStyle.roomsDivider}>ROOMS</Typography>
                        </Divider>
                    </Box>
                    <SideRoomTable currentRoom={currentRoom} />
                </Drawer>
            </Grid>
            <Grid direction="column" sx={{ width: '83%', height: '100%', }}>
                <Grid sx={{ height: '10%' }}>
                    <Header
                        roomSettings={
                            <RoomSettings tags={tags} setTags={setTags} roomId={currentRoom.id} />
                        }
                    />
                </Grid>
                <Grid direction="row" sx={{ display: 'flex', height: '90%', }}>
                    <Grid direction="column" sx={{ display: 'flex', width: '32%', bgcolor: '#d8f3e2', }}>
                        <Box sx={{ height: '100%' }}>
                            <AddSection sections={sections} setSections={setSections} quizes={quizes} setQuizes={setQuizes}></AddSection>
                            <SectionsContainer sections={sections} setSections={setSections} setSectionId={setSectionId} quizes={quizes} setQuizes={setQuizes} />
                            <UserInfoContainer />
                        </Box>
                    </Grid>
                    <Grid direction="column" sx={{ display: 'flex', width: '68%' }}>
                        <Box sx={{ height: '15%', display: 'flex', }}>
                            <AddPostButton sectionId={sectionId} addNewPost={addNewPost} setPosts={setPosts} tags={tags} />
                            <SearchBar posts={posts} sectionId={sectionId} setPosts={setPosts} />
                        </Box>
                        <PostContainer sectionId={sectionId} posts={posts} setPosts={setPosts} />
                    </Grid>
                </Grid>
            </Grid>
        </Grid>

    );
}

export default RoomLayout;