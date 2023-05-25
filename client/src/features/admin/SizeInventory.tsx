import { useState } from "react";
import { useAppDispatch } from "../../app/store/configureStore";
import { Size } from "../../app/models/size";
import useSize from "../../app/hooks/useSize";
import { Box, Typography, Button, TableContainer, Paper, Table, TableHead, TableRow, TableCell, TableBody } from "@mui/material";
import SizeForm from "./SizeForm";

export default function SizeInventory() {
    const {sizes} = useSize();
    const dispatch = useAppDispatch();
    const [editMode, setEditMode] = useState(false);
    const [selectedSize, setSelectedSize] = useState<Size | undefined>(undefined);
    const [loading, setLoading] = useState(false);
    const [target, setTarget] = useState(0);

    function handleSelectSize(size: Size) {
        setSelectedSize(size);
        setEditMode(true);
    }

    function cancelEdit() {
        if (selectedSize) setSelectedSize(undefined);
        setEditMode(false);
    }

    if (editMode) return <SizeForm size={selectedSize} cancelEdit={cancelEdit} />

    return (
        <>
            <Box display='flex' justifyContent='space-between'>
                <Typography sx={{ p: 2 }} variant='h4'>Sizes</Typography>
                <Button onClick={() => setEditMode(true)} sx={{ m: 2 }} size='large' variant='contained'>Create</Button>
            </Box>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>#Size</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {sizes.map((size) => (
                            <TableRow
                                key={size.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {size.id}
                                </TableCell>
                            
                                <TableCell align="left">{size.sizeOfProduct}</TableCell>
                                <TableCell align="right">
                                    
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            
        </>
    )
}