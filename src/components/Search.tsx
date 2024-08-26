"use client"
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useRouter } from 'next/navigation';
// import { fetchGenres } from '@/app/api/genre/route';
import axios from 'axios';

type Genre = {
    code: string;
    name: string;
}

const bull = (
    <Box
      component="span"
      sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
    >
      •
    </Box>
);

const Search = () => {
    const router = useRouter();
    const [area, setArea] = useState('');
    const [genre, setGenre] = useState('');
    const [keyWord, setKeyWord] = useState('');
    const [genres, setGenres] = useState<Genre[]>([]);

    useEffect(() => {
        const getGenres = async () => {
          const fetchedGenres = await fetchGenres();
          console.log(fetchedGenres);
          setGenres(fetchedGenres);
        };
    
        getGenres();
      }, []);

    const fetchGenres = async() => {
        try {
            const res = await axios.get('/api/genre');
            return res.data;
        } catch (error) {
            console.error(error);
            return [];
        }
    }

    const areaHandler = (e: SelectChangeEvent) => {
        setArea(e.target.value as string);
    }

    const genreHandler = (e: SelectChangeEvent) => {
        setGenre(e.target.value as string);
    }

    const keyWordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setKeyWord(e.target.value);
    }

    const searchHandler = () => {
        const query = new URLSearchParams({
            area: area,
            genre: genre,
            keyword: keyWord
        }).toString();
        router.push(`/shop?${query}`);
    }

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
            }}
        >
            <Card sx={{ minWidth: 275, maxWidth: 800 }} className='z-10'>
                <CardContent>
                    <Typography sx={{ fontSize: 36 }} color="text.secondary" gutterBottom>
                        お探しのお店を探そう！
                    </Typography>
                    <Typography variant="h5" component="div">
                        条件を絞ってください。
                    </Typography>
                    <div className='flex'>
                        <Box sx={{ minWidth: 120, margin: 2 }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">エリア</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={area}
                                label="Area"
                                onChange={areaHandler}
                                >
                                <MenuItem value="東京">東京</MenuItem>
                                <MenuItem value="神奈川">神奈川</MenuItem>
                                <MenuItem value="千葉">千葉</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 120, margin: 2  }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">ジャンル</InputLabel>
                                <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={genre}
                                label="Genre"
                                onChange={genreHandler}
                                >
                                <MenuItem value="">
                                    <em>選択してください</em>
                                </MenuItem>
                                {genres.map((genreItem: Genre) => (
                                    <MenuItem key={genreItem.code} value={genreItem.code}>
                                    {genreItem.name}
                                    </MenuItem>
                                ))}
                                </Select>
                            </FormControl>
                        </Box>
                        <Box sx={{ minWidth: 120, margin: 2 }}>
                            <TextField
                                fullWidth
                                id="outlined-basic"
                                label="キーワード"
                                variant="outlined"
                                value={keyWord}
                                onChange={keyWordHandler}
                            />
                        </Box>
                        <CardActions>
                            <Button size="large" variant="outlined" onClick={searchHandler}>検索</Button>
                        </CardActions>  
                    </div>
                </CardContent>
            </Card>
        </Box>
    )
}

export default Search