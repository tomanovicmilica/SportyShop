import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Typography } from "@mui/material";
import { Product } from "../../app/models/product";
import { Link } from "react-router-dom";
import { currencyFormat } from "../../app/util/util";
import { LoadingButton } from "@mui/lab";
import { useAppSelector, useAppDispatch } from "../../app/store/configureStore";
import { addBasketItemAsync } from "../basket/basketSlice";

interface Props {
    product: Product;
}

export default function ProductCard({product}: Props) {
    const {status} = useAppSelector(state => state.basket);
    const dispatch = useAppDispatch();

    return (
        <Card>
        <CardHeader
            avatar={
                <Avatar sx={{ bgcolor: 'secondary.main' }}>
                    {product.name.charAt(0).toUpperCase()}
                </Avatar>
            }
            title={product.name}
            titleTypographyProps={{
                sx: { fontWeight: 'bold', color: 'primary.main' }
            }}
        />
        <CardMedia
            sx={{ height: 140, backgroundSize: 'contain', bgcolor: 'primary.light' }}
            image={product.imageUrl}
            title={product.name}
        />
        <CardContent>
            <Typography gutterBottom color='secondary' variant="h5">
                {currencyFormat(product.price)}
            </Typography>
        </CardContent>
        <CardActions>
            <LoadingButton 
                    loading={status.includes('pendingAddItem' + product.productId)} 
                    onClick={() => dispatch(addBasketItemAsync({productId: product.productId}))}  
                    size="small">Add to Cart</LoadingButton>
            <Button component={Link} to={`/catalog/${product.productId}`}  size="small">View</Button>
        </CardActions>
    </Card>
    )
}