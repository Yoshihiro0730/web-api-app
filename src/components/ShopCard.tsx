"use client"
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { selectUser } from "@/features/userSlice";
import { Card, CardContent, CardMedia, Typography, Grid, Box, CardActionArea, IconButton } from "@mui/material";
import FavoriteOutlinedIcon from '@mui/icons-material/FavoriteOutlined';
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import Link from "next/link";
import { doc, setDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";

const ShopCard = () => {
    const [shopList, setShopList] = useState<any[] | null>(null);
    const [favorites, setFavorites] = useState<Set<string>>(new Set());
    const user = useSelector(selectUser);
    const searchParams = useSearchParams();

    const getShopList = async () => {
        const area = searchParams.get("area") || "Z011";
        const genre = searchParams.get("genre");
        const keyword = searchParams.get("keyword");
        const url = `/api/hotpepper?large_area=${area || ''}&genre=${genre || ''}&keyword=${keyword || ''}`;
        console.log(url);
        try {
        const res = await fetch(url);
        if (!res.ok) {
            throw new Error(`HTTP error! status: ${res.status}`);
        }
        const data = await res.json();
        console.log(data);
        setShopList(data.shop);
        } catch (error) {
        console.error("Error fetching shop list:", error);
        }
    }

    useEffect(() => {
        getShopList();

        return () => {
        console.log("test");
        };
    }, []);

    const favoriteHandler = async(shop: any) => {
        const shopId = shop.id;
        const ref = doc(db, 'users', user.uid, 'favorites', shopId);
        if(favorites.has(shopId)){
            await deleteDoc(ref);
            favorites.delete(shopId);
        } else {
            await setDoc(ref, {
                name: shop.name,
                genre: shop.genre.name,
                address: shop.address,
                photo: shop.photo.pc.l,
                url: shop.urls.pc
            });
            favorites.add(shopId);
        }
        setFavorites(new Set(favorites));
    }

    return(
        <div className="flex mt-20">
            <Box sx={{ flexGrow: 1, padding: 2 }}>
                <Grid container spacing={3}>
                    {shopList ? (
                        shopList.map((shop: any, index: number) => (
                            <Grid item xs={12} sm={6} md={4} key={index}>
                                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                    <CardActionArea component={Link} href={shop.urls.pc} target="_blank" rel="noopener noreferrer">
                                        <CardMedia
                                            component="img"
                                            height="140"
                                            image={shop.photo.pc.l}
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
                                                ジャンル: {shop.genre.name}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                住所: {shop.address}
                                            </Typography>
                                        </CardContent>
                                        <IconButton
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                favoriteHandler(shop);
                                            }}
                                            sx={{ position: 'absolute', top: 5, right: 5 }}
                                        >
                                            {favorites.has(shop.id) ? <FavoriteOutlinedIcon color="error" /> : <FavoriteBorderOutlinedIcon />}
                                        </IconButton>
                                    </CardActionArea>
                                    
                                </Card>
                            </Grid>
                        ))
                    ) : (
                        <Grid item xs={12}>
                            <Typography>データを読み込んでいます...</Typography>
                        </Grid>
                    )}
                </Grid>
            </Box>
        </div>
    )
}

export default ShopCard