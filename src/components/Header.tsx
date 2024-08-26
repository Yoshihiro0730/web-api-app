"use client"
import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux"
import { updateUserProfile } from "../features/userSlice";
import { RootState } from "@/features/store";
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';

const Header: React.FC = () => {
    const [islogin, setIslogin] = useState(false);
    const userInfo = useSelector((state: RootState) => state.user.user.uid);
    const displayName = useSelector((state: RootState) => state.user.user.displayName);
    const dispatch = useDispatch();
    
    // ユーザーログイン情報の確認
    useEffect(() => {
        if(userInfo) {
            setIslogin(true);
        } else {
            setIslogin(false);
        }
    }, [userInfo]);

    // ログアウト機能
    const logoutHandler = async() => {
        dispatch(updateUserProfile({
            uid: "",
            displayName: ""
        }))
        await setIslogin(false)
    }

    const router = useRouter();

    return (
        <nav className="fixed top-0 left-0 right-0 flex justify-between mb-2 text-2xl shadow-lg p-2 bg-white z-50">
            <h2 className="mt-auto mb-auto cursor-pointer" onClick={() => router.push("/")}>グルメDB</h2>
            {islogin ?
                <div className="flex">
                    <p className="mt-auto mb-auto">{displayName}</p>
                    <Button variant='outlined' className="ml-2" onClick={logoutHandler}>
                        ログアウト
                    </Button>
                    <Button
                        variant='outlined'
                        color="success"
                        className="mb-auto mt-auto ml-5"
                        onClick={() => router.push(`/favorite/${userInfo}`)}
                    >
                        お気に入り
                    </Button>
                </div>
            :
                <div>
                    <Button variant='outlined' className="ml-2" onClick={() => router.push("/auth")}>
                        ログイン
                    </Button>
                </div>
            }
        </nav>
    )
}

export default Header;