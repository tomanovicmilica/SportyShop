import { JSXElementConstructor, Key, ReactElement, ReactFragment, ReactPortal, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid, Typography, Divider, TableContainer, Table, TableBody, TableRow, TableCell, TextField, MenuItem, Select} from "@mui/material";
import LoadingComponent from "../../app/layout/LoadingComponent";
import NotFound from "../../app/errors/NotFound";
import { LoadingButton } from "@mui/lab";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { addBasketItemAsync, removeBasketItemAsync } from "../basket/basketSlice";
import { fetchProductAsync, productSelectors } from "./catalogSlice";
import CustomizedDialogs from "../../app/components/CustomizedDialogs";

export default function ProductDetails() {
    const { basket, status } = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();
    const { productId } = useParams<{productId: string}>();
    const product = useAppSelector(state => productSelectors.selectById(state, productId!));
    const {status: productStatus} = useAppSelector(state => state.catalog);
    const [quantity, setQuantity] = useState(0);
    //const sizes = product?.productSizes?.find(s=>s.sizeId === size?.sizeId);
    
    const productSize = product?.productSizes ? product.productSizes : "";
    const [size, setSize] = useState(productSize);
    const item = basket?.items.find(i => i.productId === product?.productId && i.size === size);



    useEffect(() => {
        if (item) setQuantity(item.quantity);
       
        if (!product && productId) dispatch(fetchProductAsync(parseInt(productId))) 
     }, [productId, item, product, dispatch]);

    function handleInputChange(e: any) {
        if (e.target.value >= 0)
            setQuantity(parseInt(e.target.value));
    }


    function handleUpdateCart() {
         if (!item || quantity > item?.quantity) {
          console.log(size.toString());
            const updatedQuantity = (item && item.size === size) ? quantity - item.quantity : quantity;
            dispatch(addBasketItemAsync({productId: product?.productId!, size: size.toString(), quantity: updatedQuantity}))
            console.log(size.toString());
            console.log(quantity);
            console.log(updatedQuantity);
        } else {
            const updatedQuantity = item.quantity - quantity;
            dispatch(removeBasketItemAsync({productId: product?.productId!, size: size.toString(), quantity: updatedQuantity}))
        }
    }

    if (productStatus.includes('pending')) return <LoadingComponent message="Loading product..." />


    if (!product) return <NotFound />

    return (
    <Grid container spacing={6}>
        <Grid item xs={6}>
            <img src={product.imageUrl} alt={product.name} style={{ width: '100%' }} />
        </Grid>
        <Grid item xs={6}>
            <Typography variant='h3'>{product.name}</Typography>
            <Divider sx={{ mb: 2 }} />
            <Typography variant='h4' color='secondary'>${(product.price / 100).toFixed(2)}</Typography>
            <TableContainer>
                <Table>
                    <TableBody sx={{ fontSize: '1.1em' }}>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>{product.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Description</TableCell>
                            <TableCell>{product.description}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Type</TableCell>
                            <TableCell>{product.productType.name}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Brand</TableCell>
                            <TableCell>{product.brand.name}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <Grid container spacing={2} display='inline-flex' sx={{mt:1}}>
                <Grid item xs={6}>

            {product.productSizes ? (
                      <div>
                        <label 
                          htmlFor="size"
                          className="block mb-2 me-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Pick a size 
                        </label>
                        <Select sx={{ display: 'inline-flex', ml:3}}
                          id="size"
                          name="size"
                          label="Size"
                          value={size.toString()}
                          onChange={(e) => setSize(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          {product.productSizes.map((item: { size: { sizeOfProduct: string | number | readonly string[] | undefined; }; sizeId: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment | ReactPortal | null | undefined; }, index: Key | null | undefined) => {
                            return (
                              <MenuItem key={index} value={item.size.sizeOfProduct}>
                                {item.size.sizeOfProduct}
                              </MenuItem>
                            );
                          })}
                        </Select>
                      </div>
                    ) : (
                      <div>
                        <label
                          htmlFor="size"
                          className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                        >
                          Pick a size
                        </label>
                        <Select
                          id="size"
                          disabled={true}
                          name="size"
                          value={size.toString()}
                          onChange={(e) => setSize(e.target.value)}
                          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                          {/*{product.productSizes?.map((item, index) => {
                            return (
                              <MenuItem key={index} value={item.size.sizeOfProduct}>
                                {item.size.sizeOfProduct}
                              </MenuItem>
                            );
                          })}*/}
                        </Select>
                      </div>
                    )}
                    
                </Grid>
                <Grid item xs={6} display='inline'>
                    <CustomizedDialogs />
                    </Grid>
                    </Grid>
                  
            <Grid container spacing={2} sx={{mt:2}}>
                    <Grid item xs={6}>
                        <TextField
                            onChange={handleInputChange}
                            variant={'outlined'}
                            type={'number'}
                            label={'Quantity in Cart'}
                            fullWidth
                            value={quantity}
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <LoadingButton
                            disabled={(item?.quantity === quantity && item.size === size )|| (!item && quantity === 0)}
                            loading={status.includes('pending')}
                            onClick={handleUpdateCart}
                            sx={{ height: '55px' }}
                            color={'primary'}
                            size={'large'}
                            variant={'contained'}
                            fullWidth>
                            {item && item.size=== size ? 'Update Quantity' : 'Add to Cart'}
                        </LoadingButton>
                    </Grid>
                </Grid>
        </Grid>
    </Grid>
    )
}