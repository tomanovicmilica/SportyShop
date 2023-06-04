import { Avatar, Button, Card, CardActions, CardContent, CardHeader, CardMedia, Tooltip, Typography } from "@mui/material";
import { Product} from "../../app/models/product";
import { Link } from "react-router-dom";
import { currencyFormat } from "../../app/util/util";

interface Props {
    product: Product;
}

export default function ProductCard({product}: Props) {

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
            sx={{ height: 180, width:200 ,backgroundSize: 'contain', bgcolor: 'primary.light' ,ml: 4}}
            image={product.imageUrl}
            title={product.name}
            component='img'
        /> 
        <CardContent>
            <Typography gutterBottom color='secondary' variant="h5">
                {currencyFormat(product.price)}
            </Typography>
        </CardContent>
        <CardActions>
            {/*<LoadingButton 
                    loading={status ==='pendingAddItem' + product.productId} 
                    //onClick={() => dispatch(addBasketItemAsync({productId: product.productId}))}  
        size="small">Add to Cart</LoadingButton>*/}
        <Tooltip title='Go to product details'>
            <Button component={Link} to={`/catalog/${product.productId}`}  size="small">View</Button>
        </Tooltip>
        </CardActions>
    </Card>
    )
}