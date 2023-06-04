import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { useAppDispatch } from "../../app/store/configureStore";
import { User } from "../../app/models/user";
import agent from "../../app/api/agent";
import { setUser } from "./accountSlice";
import { FieldValues, useForm } from "react-hook-form";
import { LoadingButton } from "@mui/lab";
import AppTextInput from "../../app/components/AppTextInput";

interface Props {
    user: User;
    cancelEdit: () => void;
}

export default function Profile({cancelEdit}: Props) {

   //const {user} = useAppSelector(state => state.account);
    const dispatch = useAppDispatch();
    //const [userr , setUser] = useState(user);
    const { control, handleSubmit, formState: { isSubmitting } } = useForm({});
    
    async function handleSubmitData(data: FieldValues) {
      try {
            let response: User;
            
        response = await agent.Account.updateUser(data);
        dispatch(setUser(response));
        cancelEdit();
        } catch (error) {
            console.log(error);
        }

    }
    return(
        <Box component={Paper} sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
                User Details
            </Typography>
            <form onSubmit={handleSubmit(handleSubmitData)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <AppTextInput control={control} name='name' label='Name' />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <AppTextInput control={control} name='lastName' label='Last name' />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                        <AppTextInput control={control} name='phoneNumber' label='Phone number' />
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