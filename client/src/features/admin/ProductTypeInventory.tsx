import { useState } from "react";
import agent from "../../app/api/agent";
import { useAppDispatch } from "../../app/store/configureStore";
import { Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import { ProductType } from "../../app/models/productType";
import ProductTypeForm from "./ProductTypeForm";
import useProductTypes from "../../app/hooks/useProductType";
import { removeProductType } from "../catalog/productTypeSlice";

export default function ProductTypeInventory() {
    const {productTypes} = useProductTypes();

    const dispatch = useAppDispatch();
    const [selectedProductType, setSelectedProductType] = useState<ProductType | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [target, setTarget] = useState(0);
    const [editMode, setEditMode] = useState(false);

    function handleDeleteProductType(id: number) {
        setLoading(true);
        setTarget(id)
        agent.Admin.deleteProductType(id)
            .then(() => dispatch(removeProductType(id)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    function cancelEdit() {
        if (selectedProductType) setSelectedProductType(undefined);
        setEditMode(false);
    }

    if (editMode) return <ProductTypeForm productType={selectedProductType} cancelEdit={cancelEdit} />

    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant='h4'>Product types</Typography>
                <Button onClick={() => setEditMode(true)} sx={{ m: 2 }} size='large' variant='contained'>Create</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#Product type</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {productTypes.map((productType) => (
                            <TableRow
                                key={productType.productTypeId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {productType.productTypeId}
                                </TableCell>
                            
                                <TableCell align="left">{productType.name}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton 
                                        loading={loading && target === productType.productTypeId} 
                                        onClick={() => handleDeleteProductType(productType.productTypeId)} 
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