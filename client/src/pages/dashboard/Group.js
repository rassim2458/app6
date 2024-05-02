import { Box, Stack, Typography, Link, IconButton, Divider } from '@mui/material'
import React, { useState } from 'react'
import { Search, SearchIconWrapper, StyledInputBase } from '../../components/Search'
import { MagnifyingGlass, Plus } from 'phosphor-react';
import { useTheme } from "@mui/material/styles";
import { SimpleBarStyle } from '../../components/Scrollbar';
import '../../css/global.css';
import { ChatList } from '../../data';
import ChatElement from '../../components/ChatElement';
import CreateGroup from '../../sections/main/CreateGroup';
import Conversationn from '../../components/GroupeChat/indexx';

import Contactt from "../../components/ContactGroupe";
import { useSelector } from "react-redux";
import SharedMessages from "../../components/SharedMessages";
import StarredMessages from "../../components/StarredMessages";

const Group = () => {
    const theme = useTheme();
    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = () =>{
        setOpenDialog(false);
      }
      const {sidebar} = useSelector((store)=> store.app);// access our store inside component
    return (
    <>
    <Stack direction={'row'} sx={{width:'100%'}}>
        {/* Left */}
        <Box sx={{height:'100vh' , 
        backgroundColor:(theme) =>theme.palette.mode === 'light' ? '#F8FAFF' : theme.palette.background , 
        width:320,
        boxShadow:'0px 0px 2px rgba(0,0,0,0.25)'}}>
            <Stack p={3} spacing={2} sx={{maxHeight:'100vh'}}>
                <Stack>
                    <Typography variant='h5'>Group</Typography>
                </Stack>
                <Stack sx={{width:'100%'}}>
                <Search>
                    <SearchIconWrapper>
                    <MagnifyingGlass color="#709CE6" />
                    </SearchIconWrapper>
                    <StyledInputBase placeholder='Search...' inputProps={{ "aria-label": "search" }} />
                </Search>
                </Stack>
                <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography variant='subtitle2' component={Link}>Create New Group</Typography>
                    <IconButton onClick={() =>{setOpenDialog(true)}}>
                        <Plus style={{color: theme.palette.primary.main}}/>
                    </IconButton>
                </Stack>
                <Divider/>
                <Stack spacing={3} className='scrollbar'  sx={{flexGrow:1, overflowY:'scroll', height:'100%'}}>
                    <SimpleBarStyle  timeout={500} clickOnTrack={false}>
                        <Stack spacing={2.5}>
                            {/*  */}
                           
                            {ChatList.map((el)=>{
                                return <ChatElement  {...el}/>
                            })}

                              
                        </Stack>
                    </SimpleBarStyle>
                </Stack>
            </Stack>
        </Box>

        {/* Right */}
        <Box sx={{ height: '100%', width: sidebar.open ? 'calc(100vw - 740px)': 'calc(100vw - 420px)',
       backgroundColor: theme.palette.mode === 'light' ? '#F0F4FA' : theme.palette.background.default }}>
      {/* Conversation */}
      <Conversationn />
      </Box>
      {/* Contact */}
      {sidebar.open && (()=>{
        switch (sidebar.type) {
          case 'CONTACTT':
            return <Contactt/>

          case 'STARREDD':
            return <StarredMessages/>

          case 'SHAREDD':
            return <SharedMessages/>
        
          default:
            break;
        }
      })()  }
    </Stack>
    {openDialog && <CreateGroup open={openDialog} handleClose={handleCloseDialog}/>}
    </>
  )
}

export default Group