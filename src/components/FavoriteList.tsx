"use client"
import React, { useState, useEffect } from "react";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";
import { Card, CardContent, CardMedia, Typography, Grid, Box, CardActionArea, IconButton } from "@mui/material";
import FavoriteIcon from '@mui/icons-material/Favorite';
import Link from 'next/link';

interface ListProps {
    userId: string;
}

const FavoriteList: React.FC<ListProps> = ({ userId }) => {
    const [favorite, setFavorite] = useState<any[] | null>([]);

    useEffect(() => {
        fetchFavorite();
    }, [userId]);

    const fetchFavorite = async() => {
        const ref = collection(db, 'users', userId, 'favorites');
        const snapShot = await getDocs(ref);
        const favoriteData = snapShot.docs.map(doc => ({id: doc.id, ...doc.data()}));
        console.log("Fetched favorites:", favoriteData);
        setFavorite(favoriteData);
    }

    return(
        <Box sx={{ flexGrow: 1, padding: 2 }}>
            <Grid container spacing={3}>
                {favorite ? (
                    favorite.map((shop: any) => (
                        <Grid item xs={12} sm={6} md={4} key={shop.id}>
                            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', position: 'relative' }}>
                                <CardActionArea component={Link} href={shop.url} target="_blank" rel="noopener noreferrer">
                                    <CardMedia
                                        component="img"
                                        height="140"
                                        image={shop.photo}
                                        alt={shop.name}
                                    />
                                    <CardContent sx={{ flexGrow: 1 }}>
                                        <Typography gutterBottom variant="h5" component="div">
                                            {shop.name}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {shop.catch}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            ジャンル: {shop.genre}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            住所: {shop.address}
                                        </Typography>
                                    </CardContent>
                                </CardActionArea>
                                {/* {isCurrentUser && (
                                    <IconButton
                                        onClick={() => removeFavorite(shop.id)}
                                        sx={{ position: 'absolute', top: 5, right: 5 }}
                                    >
                                        <FavoriteIcon color="error" />
                                    </IconButton>
                                )} */}
                            </Card>
                        </Grid>
                    ))
                ) : (
                    <Grid item xs={12}>
                        <Typography>お気に入りの店舗がありません。</Typography>
                    </Grid>
                )}
            </Grid>
        </Box>
    )
}

export default FavoriteList;