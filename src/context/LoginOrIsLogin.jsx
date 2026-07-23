import { useEffect, useState } from "react";
import { createContext, useContext } from "react";
import { ckek_auth } from "../services/api";

export const LoginOrIsLogin = createContext({})

export const useLoginOrIsLogin = () => {
    return useContext(LoginOrIsLogin)
}




export function LoginOrIsLoginPro({ children }) {
    const [islogin, setIslogin] = useState(false)
    useEffect(() => {
        ckek_auth()
        .then((res) => {
            if (res["logged_in"] === true) {  // اصلاح پرانتزها و مقایسه دقیق
                setIslogin(true); // اگر مقدار res معتبر باشد، کاربر لاگین است
            }
        })
        .catch((error) => {
            setIslogin(false); // در صورت بروز خطا، کاربر را لاگ‌اوت کن
        });
    }, []);


    return (
        <LoginOrIsLogin.Provider value={{ islogin, setIslogin }}>
            {children}
        </LoginOrIsLogin.Provider>

    )
}

