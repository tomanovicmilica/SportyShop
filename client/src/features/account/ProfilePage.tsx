import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { User } from "../../app/models/user";
import Profile from "./Profile";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { Edit } from "@mui/icons-material";

export default function ProfilePage() {
    const {user} = useAppSelector(state => state.account);
    const dispatch = useAppDispatch();
    const [editMode, setEditMode] = useState(false);
    const [loading, setLoading] = useState(false);
    const [target, setTarget] = useState(0);
    const [selectedUser, setSelectedUser] = useState<User>();

    function handleSelectUser(user: User) {
        setSelectedUser(user);
        setEditMode(true);
    }

    function cancelEdit() {
        setEditMode(false);
    }

    if (editMode) return <Profile useR={selectedUser!} cancelEdit={cancelEdit} />

    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant='h4'>Profile</Typography>
                <Button onClick={() => handleSelectUser(user!)} sx={{ m: 2 }} size='large' variant='contained' startIcon={<Edit />}>Edit</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#</TableCell>
                            <TableCell align="left">User</TableCell>
                            <TableCell align="right">Name</TableCell>
                            <TableCell align="center">Last name</TableCell>
                            <TableCell align="center">Email</TableCell>
                            
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        
                            <TableRow>
                            
                                <TableCell></TableCell>
                                <TableCell align="left">
                                    {user?.name}
                                </TableCell>
                                <TableCell align="right">{user?.name}</TableCell>
                                <TableCell align="center">{user?.lastName}</TableCell>
                                <TableCell align="center">{user?.email}</TableCell>
                                
                            </TableRow>
                        
                    </TableBody>
                </Table>
            </TableContainer>
           
        </>
    )
}