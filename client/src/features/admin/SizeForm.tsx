import { FieldValues, useForm } from "react-hook-form";
import { Size } from "../../app/models/size";
import { useAppDispatch } from "../../app/store/configureStore";
import agent from "../../app/api/agent";
import { setSize } from "../catalog/sizeSlice";
import { LoadingButton } from "@mui/lab";
import { Box, Paper, Typography, Grid, Button } from "@mui/material";
import AppTextInput from "../../app/components/AppTextInput";

interface Props{
    size?: Size;
    cancelEdit: () => void;
}

export default function SizeForm({ size, cancelEdit }: Props) {
    const { control, reset, handleSubmit, watch, formState: { isDirty, isSubmitting } } = useForm({
        //resolver: yupResolver(validationSchema)
    });
    const dispatch = useAppDispatch();

    async function handleSubmitData(data: FieldValues) {
        try {
            let response: Size;
            
                response = await agent.Admin.createSize(data);
            
            dispatch(setSize(response));
            cancelEdit();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box component={Paper} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            Size Details
        </Typography>
        <form onSubmit={handleSubmit(handleSubmitData)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <AppTextInput control={control} name='sizeOfProduct' label='Size of product' />
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