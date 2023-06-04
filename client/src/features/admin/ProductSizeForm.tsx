import { FieldValues, useForm } from "react-hook-form";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import AppTextInput from "../../app/components/AppTextInput";
import { ProductSize } from "../../app/models/productSize";
import { setProductSize } from "../catalog/productSizeSlice";
import { useEffect, useState } from "react";
import { Size } from "../../app/models/size";
import useProducts from "../../app/hooks/useProducts";
import AppSelectList from "../../app/components/AppSelectListSize";



interface Props{
    productSize?: ProductSize;
    cancelEdit: () => void;
}

export default function ProductTypeForm({productSize, cancelEdit}: Props) {
    const { control, handleSubmit, formState: { isSubmitting } } = useForm({
        //resolver: yupResolver(validationSchema)
    });
    const dispatch = useAppDispatch();
    const {products} = useProducts();
    const [size, setSize] = useState<Size[]>([{id: 0, sizeOfProduct: '' }]);
  

    useEffect(() => {
        agent.Size.list()
            .then(size => setSize(size))
            .catch(error => console.log(error))
    }, []);


    async function handleSubmitData(data: FieldValues) {
        try {
            let response: ProductSize;
            if(productSize) {
                response = await agent.Admin.updateProductSize(data);
            } else {
                response = await agent.Admin.createProductSize(data);
            }
            dispatch(setProductSize(response));
            cancelEdit();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Box component={Paper} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom sx={{ mb: 4 }}>
            Product Size Details
        </Typography>
        <form onSubmit={handleSubmit(handleSubmitData)}>
                <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                     
                     <AppSelectList control={control}  items={products}  name='productId' label='Product' />

                </Grid>
                <Grid item xs={12} sm={6}>
                
                        <AppSelectList control={control} items={size} name='sizeId' label='Product size' />
                     
                 </Grid>
                    <Grid item xs={12} sm={12}>
                        <AppTextInput type='number' control={control} name='quantityInStock' label='Quantity in stock' />
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