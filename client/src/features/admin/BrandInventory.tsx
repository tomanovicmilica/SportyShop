import { useState } from "react";
import agent from "../../app/api/agent";
import { Brand } from "../../app/models/brand";
import { useAppDispatch } from "../../app/store/configureStore";
import BrandForm from "./BrandForm";
import { Delete } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { Box, Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import useBrands from "../../app/hooks/useBrands";
import { removeBrand } from "../catalog/brandSlice";

export default function BrandInventory() {
    const {brands} = useBrands();
    const dispatch = useAppDispatch();
    const [selectedBrand, setSelectedBrand] = useState<Brand | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [target, setTarget] = useState(0);
    const [editMode, setEditMode] = useState(false);

    function handleDeleteBrand(id: number) {
        setLoading(true);
        setTarget(id)
        agent.Admin.deleteBrand(id)
            .then(() => dispatch(removeBrand(id)))
            .catch(error => console.log(error))
            .finally(() => setLoading(false))
    }

    function cancelEdit() {
        if (selectedBrand) setSelectedBrand(undefined);
        setEditMode(false);
    }

    if (editMode) return <BrandForm brand={selectedBrand} cancelEdit={cancelEdit} />

    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant='h4'>Brands</Typography>
                <Button onClick={() => setEditMode(true)} sx={{ m: 2 }} size='large' variant='contained'>Create</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#Brand</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {brands.map((brand) => (
                            <TableRow
                                key={brand.brandId}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {brand.brandId}
                                </TableCell>
                            
                                <TableCell align="left">{brand.name}</TableCell>
                                <TableCell align="right">
                                    <LoadingButton 
                                        loading={loading && target === brand.brandId} 
                                        onClick={() => handleDeleteBrand(brand.brandId)} 
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