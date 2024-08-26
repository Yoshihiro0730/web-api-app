'use client'
import React, { Suspense } from "react";
import ShopCard from "@/components/ShopCard";
import Loading from "@/components/Loading";

const ShopPage: React.FC = () => {
    return (
        <Suspense fallback={<Loading />}>
            <ShopCard />
        </Suspense>
    )
}

export default ShopPage;