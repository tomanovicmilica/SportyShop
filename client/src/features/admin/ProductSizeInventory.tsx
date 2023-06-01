import { useState } from "react";
import { useAppDispatch } from "../../app/store/configureStore";
import { Box, Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import useProductSize from "../../app/hooks/useProductSize";
import { ProductSize } from "../../app/models/productSize";
import ProductSizeForm from "./ProductSizeForm";
import agent from "../../app/api/agent";
import { removeProductSize } from "../catalog/productSizeSlice";
import { Edit, Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

export default function ProductSizeInventory() {
    const {productSizes} = useProductSize();
    const dispatch = useAppDispatch();
    const [editMode, setEditMode] = useState(false);
    const [selectedProductSize, setSelectedProductSize] = useState<ProductSize | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [target, setTarget] = useState(0);

    function handleSelectProductSize(productSize: ProductSize) {
        setSelectedProductSize(productSize);
        setEditMode(true);
    }

    function handleDeleteProductSize(id: number) {
        setLoading(true);
        setTarget(id)
        agent.Admin.deleteProductSize(id)
            .then(() => dispatch(removeProductSize(id)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }


    function cancelEdit() {
        if (selectedProductSize) setSelectedProductSize(undefined);
        setEditMode(false);
    }

    if (editMode) return <ProductSizeForm productSize={selectedProductSize} cancelEdit={cancelEdit} />

    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant='h4'>Product sizes</Typography>
                <Button onClick={() => setEditMode(true)} sx={{ m: 2 }} size='large' variant='contained'>Create</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#Size</TableCell>
                            <TableCell align="left">ProductId</TableCell>
                            {/*<TableCell align="left">Product</TableCell>*/}
                            <TableCell align="left">SizeId</TableCell>
                            {/*<TableCell align="left">Size</TableCell>*/}
                            <TableCell align="center">Quantity in stock</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productSizes.map((productSize) => (
                            <TableRow
                                key={productSize.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {productSize.id}
                                </TableCell>
                            
                                <TableCell align="left">{productSize.productId}</TableCell>
                               {/* <TableCell align="left">{productSize.product.name}</TableCell>*/}
                                <TableCell align="left">{productSize.sizeId}</TableCell>
                               { /*<TableCell align="left">{productSize.size.sizeOfProduct}</TableCell>*/}
                                <TableCell align="center">{productSize.quantityInStock}</TableCell>
                                <TableCell align="right">
                                <Button onClick={() => handleSelectProductSize(productSize)} startIcon={<Edit />} />
                                    <LoadingButton 
                                        loading={loading && target === productSize.id} 
                                        onClick={() => handleDeleteProductSize(productSize.id)} 
                                        startIcon={<Delete />} color='error' />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
        </>
    )
}