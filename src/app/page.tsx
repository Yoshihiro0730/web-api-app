"use client"
import { useEffect, useState } from "react";
import Search from "@/components/Search";
// import getShopList from "@/features/getShopList";

export default function Home() {
  const [shopList, setShopList] = useState(null);

  const getShopList = async () => {
    const url = `/api/hotpepper?format=json&large_area=Z011`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }
      const data = await res.json();
      console.log(data);
      setShopList(data);
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

  return (
    <div className="min-h-screen
                     bg-[url('https://embed.pixiv.net/artwork.php?illust_id=111021323&mdate=1692548002')] 
                     bg-cover 
                     bg-center 
                     bg-no-repeat">
      <div className="p-4">
        <Search />
      </div>
    </div>
  );
}
