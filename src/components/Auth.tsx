"use client"
import React, { useState } from "react"
import { doc, setDoc } from "firebase/firestore";
import { useDispatch } from "react-redux"
import { updateUserProfile } from "../features/userSlice";
import { auth, db } from "@/firebase" 
import { createUserWithEmailAndPassword, updateProfile, signInWithEmailAndPassword } from "firebase/auth";
import { Button, TextField, Typography } from '@mui/material';
import { styled } from '@mui/system';
import { useRouter } from "next/navigation";

const Container = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f0f0f0',
  });
  
  const LoginCard = styled('div')({
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
  });

const Auth: React.FC = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [userName, setUserName] = useState("");
    const [resetEmail, setResetEmail] = useState("");
    const [conversion, setConversion] = useState(true);
    const router = useRouter();
    
    // アカウント作成関数
    const signUpEmail = async() => {
        try{
            const authUser = await createUserWithEmailAndPassword(auth, email, password);
            console.log(authUser)
        if (authUser.user) {
            await updateProfile(authUser.user, {
                displayName: userName
            });
            dispatch(updateUserProfile({
                uid: authUser.user.uid,
                displayName: userName
            }));
            console.log('通過')
        }
        await setDoc(doc(db, "users", authUser.user.uid), {
            uid: authUser.user.uid,
            displayName: authUser.user.displayName,
            email: authUser.user.email,
            createdAt: new Date().toISOString()
        })
        
        } catch(error){
            console.log("ユーザー登録に失敗しました。", error)
        }
    }  
    
    // ログイン機能
    const signInEmail = async() => {
        try{
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;
            console.log(user.uid)
            let displayName = user.displayName;
            if(!displayName) {
                alert("ユーザー名を入力してください。")
            }
            if(displayName) {
                await updateProfile(user, {
                    displayName: displayName
                })
            } else {
                displayName = "ゲスト";
            }
            dispatch(updateUserProfile({
                uid: user.uid,
                displayName: displayName
            }))
        } catch(error) {
            alert(error);
        } 
        await router.push("/")
    }

    return (
        <Container>
            {conversion ? 
                <LoginCard>
                    <Typography variant="h5" gutterBottom>
                    ログイン
                    </Typography>
                    <TextField 
                        variant="outlined"
                        margin="normal" 
                        required
                        id="userName"
                        label="ユーザー名"
                        name="userName"
                        autoComplete="userName"
                        autoFocus
                        fullWidth 
                        value={userName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setUserName(e.target.value)
                        }}
                    />
                    <TextField 
                        variant="outlined"
                        margin="normal" 
                        required
                        id="Email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        fullWidth 
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setEmail(e.target.value)
                        }}
                    />
                    <TextField 
                        variant="outlined"
                        margin="normal" 
                        required
                        id="Password"
                        label="Password"
                        name="password"
                        autoComplete="password"
                        autoFocus
                        fullWidth 
                        type="password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(e.target.value)
                        }}
                    />
                    <div className="text-center cursor-pointer mb-2 text-blue-500 hover:underline" onClick={() => setConversion(false)}>新規登録はこちら</div>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        fullWidth 
                        onClick={async()=>{
                                try {
                                    await signInEmail();
                                } catch(error){
                                    console.log("ログインに失敗しました。", error);
                                }
                            }   
                        }
                    >
                        ログイン
                    </Button>
                </LoginCard>
            : 
                <LoginCard>
                    <Typography variant="h5" gutterBottom>
                    新規登録
                    </Typography>
                    <TextField 
                        variant="outlined"
                        margin="normal" 
                        required
                        id="userName"
                        label="ユーザー名"
                        name="userName"
                        autoComplete="userName"
                        autoFocus
                        fullWidth 
                        value={userName}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setUserName(e.target.value)
                        }}
                    />
                    <TextField 
                        variant="outlined"
                        margin="normal" 
                        required
                        id="Email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        fullWidth 
                        value={email}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setEmail(e.target.value)
                        }}
                    />
                    <TextField 
                        variant="outlined"
                        margin="normal" 
                        required
                        id="Password"
                        label="Password"
                        name="password"
                        autoComplete="password"
                        autoFocus
                        fullWidth 
                        type="password"
                        value={password}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            setPassword(e.target.value)
                        }}
                    />
                    <div className="text-center cursor-pointer mb-2 text-blue-500 hover:underline" onClick={() => setConversion(true)}>ログイン</div>
                    <Button variant="contained" color="primary" fullWidth onClick={signUpEmail}>
                        登録
                    </Button>
                </LoginCard>
            }
            
        </Container>
    )
}

export default Auth