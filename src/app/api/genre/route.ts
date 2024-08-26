import { NextResponse } from 'next/server';
import axios from "axios";

const url = 'http://webservice.recruit.co.jp/hotpepper/genre/v1/';
const apiKey = process.env.HOTPEPPER_API;

async function getGenres() {
    try {
        const res = await axios.get(`${url}?key=${apiKey}&format=json`);
        return res.data.results.genre;
    } catch(error){
        console.error(error);
        return [];
    }
}

export async function GET() {
    const genres = await getGenres();
    return NextResponse.json(genres);
}

// export async function fetchGenres() {
//     if (typeof window === 'undefined') {
//         return await getGenres();
//     } else {
//         try {
//             const res = await axios.get('/api/genre');
//             return res.data;
//         } catch (error) {
//             console.error(error);
//             return [];
//         }
//     }
// }