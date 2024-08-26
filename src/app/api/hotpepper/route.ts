import axios from "axios";
import { NextResponse } from 'next/server';

// 表示件数
const SHOW_NUM = 10;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = "http://webservice.recruit.co.jp/hotpepper/gourmet/v1/"
  const apiKey = process.env.HOTPEPPER_API;

  if (!url || !apiKey) {
    return NextResponse.json({ error: 'API URL or API Key is not set' }, { status: 500 });
  }

  // 表示件数
  const count = searchParams.get('count') || SHOW_NUM;

  // 何件目から取得するか
  const startNum = searchParams.get('startNum');
  const start = startNum ? (parseInt(startNum) * 10 - 9).toString() : '1';

  // 地域 (初期値:東京)設定
  const areaCode = searchParams.get('area');
  const large_area = areaCode ? `&large_area=${areaCode}` : '';

  // ジャンル設定
  const genreCode = searchParams.get('genre');
  const genre = genreCode ? `&genre=${genreCode}` : '';

  // キーワード設定
  const keyword = searchParams.get('keyword');
  const keywordParam = keyword ? `&keyword=${keyword}` : '';

  try {
    const apiUrl = `${url}?key=${apiKey}${large_area}${genre}${keywordParam}&count=${count}&start=${start}&range=3&format=json`;
    console.log(apiUrl)
    const response = await axios.get(apiUrl);
    const shopLists = response.data.results;

    return NextResponse.json(shopLists);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data' }, { status: 500 });
  }
}