import { Box, Button, Grid, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { User } from "../../app/models/user";
import agent from "../../app/api/agent";
import { setUser } from "./accountSlice";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import AppTextInput from "../../app/components/AppTextInput";
import { useState } from "react";
import userEvent from "@testing-library/user-event";

interface Props {
    useR: User;
    cancelEdit: () => void;
}

export default function Profile({useR, cancelEdit}: Props) {

    const {user} = useAppSelector(state => state.account);
    const dispatch = useAppDispatch();
    const { control, reset, handleSubmit, formState: { isDirty, isSubmitting } } = useForm({});
    
    async function handleSubmitData(data: FieldValues) {
        try {
            let response: User;
            
        response = await agent.Account.updateUser(data);
        const {...user} = response;
        dispatch(setUser(user));
        cancelEdit();
        } catch (error) {
            console.log(error);
        }
    }
    return(
        <Box component={Paper} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                Product Details
            </Typography>
            <form onSubmit={handleSubmit(handleSubmitData)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <AppTextInput control={control} name='name' label='Name' />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <AppTextInput control={control} name='lastName' label='Last name' />
                    </Grid>

                    <Grid> 
                        <TextField disabled={true}>{user?.email}</TextField>
                    </Grid>
                    
                    
                </Grid>
                <Box display='flex' justifyContent='space-between' sx={{ mt: 3 }}>
                    <Button onClick={cancelEdit} variant='contained' color='inherit'>Cancel</Button>
                    <LoadingButton loading={isSubmitting} type='submit' variant='contained' color='success'>Submit</LoadingButton>
                </Box>
            </form>
        </Box>
    )
}