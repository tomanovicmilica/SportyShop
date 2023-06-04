import { FieldValues, useForm } from "react-hook-form";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AppTextInput from "../../app/components/AppTextInput";
import { ProductType } from "../../app/models/productType";
import { setProductType } from "../catalog/productTypeSlice";

interface Props{
    productType?: ProductType;
    cancelEdit: () => void;
}

export default function ProductTypeForm({cancelEdit}: Props) {
    const { control, handleSubmit, formState: { isSubmitting } } = useForm({
        //resolver: yupResolver(validationSchema)
    });
    const dispatch = useAppDispatch();

    async function handleSubmitData(data: FieldValues) {
        try {
            let response: ProductType;
            
                response = await agent.Admin.createProductType(data);
            
            dispatch(setProductType(response));
            cancelEdit();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box component={Paper} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            Product Type Details
        </Typography>
        <form onSubmit={handleSubmit(handleSubmitData)}>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <AppTextInput control={control} name='name' label='Product type name' />
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