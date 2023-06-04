import { useState } from "react";
import { useAppSelector } from "../../app/store/configureStore";
import { User } from "../../app/models/user";
import Profile from "./Profile";
import { Box, Button, Divider, Paper, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import * as React from 'react';

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : "#8d6e63",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));
  

export default function ProfilePage() {
    const {user} = useAppSelector(state => state.account);
    const [editMode, setEditMode] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User>();

    function handleSelectUser(user: User) {
        setSelectedUser(user);
        setEditMode(true);
    }

    function cancelEdit() {
        setEditMode(false);
    }

    if (editMode) return <Profile user={selectedUser!} cancelEdit={cancelEdit} />

    return (
        <>
        <Paper variant="outlined" sx={{ my: { xs: 3, md: 6 }, p: { xs: 2, md: 3 } }}>
        <Box display='flex' justifyContent='space-between'>
        <Typography sx={{ p: 2 , ml: 5}} variant='h4'>Profile</Typography>
         <Button onClick={() => handleSelectUser(user!)} sx={{ m: 2 }} size='large' variant='contained' startIcon={<Edit />}>Edit</Button>
        </Box>
         <Box sx={{ width: '60%' , ml:8, mt:5}} alignItems='center' justifyContent='space-between'>
         
            <Stack direction="row"
                 divider={<Divider orientation="vertical" flexItem />}
                  spacing={2} alignItems='center'>
                    <Item>Name:</Item>
                     <Item>{user?.name}</Item>
            </Stack>
            <Stack direction="row"
                 divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}>
                    <Item>Last name</Item>
                     <Item>{user?.lastName}</Item>
            </Stack>
            <Stack direction="row"
                 divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}>
                    <Item>Email</Item>
                     <Item>{user?.email}</Item>
            </Stack>
            <Stack direction="row"
                 divider={<Divider orientation="vertical" flexItem />}
                  spacing={2}>
                    <Item>Phone number</Item>
                     <Item>{user?.phoneNumber}</Item>
            </Stack>
         </Box>
         </Paper>
        </>
    )
}