import { FieldValues, useForm } from "react-hook-form";
import { Brand } from "../../app/models/brand";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AppTextInput from "../../app/components/AppTextInput";
import { setBrand } from "../catalog/brandSlice";

interface Props{
    brand?: Brand;
    cancelEdit: () => void;
}

export default function BrandForm({cancelEdit}: Props) {
    const { control, handleSubmit, formState: { isSubmitting } } = useForm({
        //resolver: yupResolver(validationSchema)
    });
    const dispatch = useAppDispatch();

    async function handleSubmitData(data: FieldValues) {
        try {
            let response: Brand;
            
                response = await agent.Admin.createBrand(data);
            
            dispatch(setBrand(response));
            cancelEdit();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box component={Paper} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            Brand Details
        </Typography>
        <form onSubmit={handleSubmit(handleSubmitData)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <AppTextInput control={control} name='name' label='Brand name' />
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