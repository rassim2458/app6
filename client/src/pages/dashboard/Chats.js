import { Box, IconButton, Stack, Typography } from
  '@mui/material'
import { CircleDashed, MagnifyingGlass } from 'phosphor-react';
import { useTheme } from '@mui/material/styles';
import React, { useEffect } from 'react';
import { ChatList } from '../../data';
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search';
import ChatElement from '../../components/ChatElement';
import { socket } from '../../socket';
import { useSelector, useDispatch } from 'react-redux';
import { fetchDirectConversations } from "../../redux/slices/conversation";


const user_id = window.localStorage.getItem("user_id")


const Chats = () => {
  
  const theme = useTheme();

  const dispatch = useDispatch();

  const {conversations} = useSelector((state) => state.conversation.direct_chat);

  

 

  return (
    <Box sx={{
      position: "relative", width: 320, height: "100%",
      backgroundColor: theme.palette.mode === 'light' ? "#F8FAFF" : theme.palette.background.paper,
      boxShadow: '0px 0px 2px rgba(0,0,0,0.25)'
    }}>
      <Stack p={3} spacing={2} sx={{ height: "100vh" }}>
        <Stack direction="row" alignItems='center' justifyContent='space-between'>
          <Typography variant='h5'>
            Chats
          </Typography>
          
        </Stack>

        <Stack sx={{ width: "100%" }}>
          <Search>
            <SearchIconWrapper>
              <MagnifyingGlass color="#709CE6" />
            </SearchIconWrapper>
            <StyledInputBase placeholder='Search...' inputProps={{ "aria-label": "search" }} />
          </Search>
        </Stack>


        <Stack className='scrollbar' spacing={2} direction='column' sx={{ flexGrow: 1, overflow: 'scroll', height: '100%' }}>


          <Stack spacing={2.4}>

            {conversations.map((el) => {
              return <ChatElement {...el} />
            })}

          </Stack>

        </Stack>
      </Stack>

    </Box>
  )
}

export default Chats