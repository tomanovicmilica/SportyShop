import { Box, CssBaseline, Grid, Typography } from "@mui/material";

export default function AboutPage() {
    return (

        <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={8}
          sm={4}
          md={4}
          
        >
            <div>
                <img src="/images/t1.jpg" alt="hero" style={{ display: 'block', width: '80%', maxHeight: 500 }} />
            </div>
         </Grid> 
         <Grid item xs={8}>
            <Box display='block' justifyContent='center' sx={{ p: 4 }} >
                        <Typography variant='h1'>
                                About Sporty
                        </Typography>
                        <CssBaseline />
                        
                    </Box>
                    <Box display='inline-table' justifyContent='center' sx={{ p: 4 }}>
                        <Typography variant='h5' display='inline-table'>
                        With our passion, we want to inspire 
                        people all over the world to start
                        something new – and keep going 
                        
                        We support you with high-tech sportswear
                        and sportstyle apparel to enjoy
                        every activity in your own way
                        </Typography>
                    </Box>
                    </Grid>
        </Grid>
                ) 
}