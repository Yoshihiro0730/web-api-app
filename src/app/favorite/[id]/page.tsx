"use client"
import { useSelector } from 'react-redux';
import { useParams } from 'next/navigation';
import FavoriteList from '@/components/FavoriteList';
import { RootState } from '@/features/store';
import { selectUser } from '@/features/userSlice';

const FavoritePage = () => {
    const { id } = useParams();
    const currentUserUid = useSelector(selectUser);

    return(
        <div className="mt-20">
            <h1>お気に入り店舗一覧</h1>
            <FavoriteList userId={id as string} />
        </div>
    )
}

export default FavoritePage;