import { GoogleAuthProvider, createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from 'firebase/auth';
import React, {  createContext, useEffect, useState } from 'react';
import auth from '../firebase/firebase.config';
import useAxiosOpen from '../hooks/useAxiosOpen';

const googlePrvider = new GoogleAuthProvider()

export const AuthContext = createContext(null)



const AuthProvider = ({children}) => {

    const [user, setUser] = useState(null)

    const [loading, setLoading] = useState(true);

    const axiosOpen = useAxiosOpen()

    const userlogin = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const userSingup = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const userLogout = ()=> {
        setLoading(true);
        return signOut(auth)
    }

    const updateUserProfile = (name, photo) => {
        setLoading(true);
        return updateProfile(auth.currentUser, {
            displayName: name, photoURL: photo
        });
    }

    const googleLogin = () => {
        setLoading(true);
        return signInWithPopup(auth, googlePrvider)
    }


    const authInfo = {
        user,
        loading,
        userlogin,
        googleLogin,
        userSingup,
        userLogout,
        updateUserProfile
    }

    useEffect( () => {

        const unSubscribe = onAuthStateChanged(auth, (currentUser)=> {
            setUser(currentUser)
            if(currentUser){
                //get token and store client
                const userInfo =  { email: currentUser?.email}
                axiosOpen.post('/jwt', userInfo)
                .then(res => {
                    if(res.data.token){
                        localStorage.setItem('access-token', res.data.token);
                        setLoading(false)
                    }
                })
            }
            else{
                localStorage.removeItem('access-token')
                // todo: remove token (if token stored in the client side)
                setLoading(false)
            }
            
        })
        return () => {
            unSubscribe();
        }
    },[axiosOpen])

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;