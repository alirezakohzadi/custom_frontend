    import Cookie from 'js-cookie'; // فقط وارد کردن js-cookie
    import axios from "axios";
    // حذف واردات از lucide-react اگر نیاز به آن ندارید

    const client = axios.create({
        baseURL: "http://127.0.0.1:8000/"
    });

    export async function getproducts() {
        try {
            const { data } = await client.get("articles/");
            return data;
        } catch (error) {
            return null;
        }
    }
    export async function getaboutus() {
        try {
            const { data } = await client.get("articles/aboutus/");
            return data;
        } catch (error) {
            return null;
        }
    }

    export async function getitemsBtnN() {
        try {
            const { data } = await client.get("articles/");
            return data;
        } catch (error) {
            return null;
        }
    }

    export async function getproductsLike() {
        try {
            const { data } = await client.get("articles/");
            return data;
        } catch (error) {
            return null;
        }
    }
    export async function getsearch(searchQuery) {
        try {
            const { data } = await client.get(`articles/search/article/?query=${searchQuery}`);
            return data;
        } catch (error) {
            return null;
        }
    }

    export async function getquestions() {
        try {
            const { data } = await client.get("articles/question/");
            return data;
        } catch (error) {
            return null;
        }
    }

    export async function getarticleM(id) {
        try {
            const { data } = await client.get(`articles/article/${id}/`);
            return data;
        } catch (error) {
            return null;
        }
    }

    export async function getarticleL(id) {
        try {
            const { data } = await client.get(`articles/article/${id}/`);
            return data;
        } catch (error) {
            return null;
        }
    }
    
    export async function getarticle(id) {
        try {
            const { data } = await client.get(`articles/article/${id}/`);
            return data;
        } catch (error) {
            return null;
        }
    }

    export async function loginuser(username, password) {
        try {
            const response = await client({
                method: "POST",
                url: "user/login/",
                data: { username, password },
                withCredentials: true
            });
            return response.data; // در صورت موفقیت
        } catch (error) {
            // به جای چاپ خطا در کنسول، فقط شیء خطا برگردانید
            return { error: error.response?.data?.error || 'An unexpected error occurred' };
        }
    }
    export async function usermessage(name, email, body, mobilenumber) {
        try {
            const response = await client({
                method: "POST",
                url: "user/message/",
                data: { name, email, body, mobilenumber },
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            return { error: error.response?.data?.error || 'An unexpected error occurred' };
        }
        
    }

    export async function registeruser(username, password, password_2, email) {
        try {
            const response = await client({
                method: "POST",
                url: "user/register/",
                data: { username, email, password, password_2},
                withCredentials: true
            });
            return response.data; // در صورت موفقیت
        } catch (error) {
            // به جای چاپ خطا در کنسول، فقط شیء خطا برگردانید
            return { error: error.response?.data?.error || 'An unexpected error occurred' };
        }
    }




    export async function logoutuser() {
        try {
            const { data } = await client({
                method: "POST",
                url: "user/logout/",
                withCredentials: true,
            });
            return data;
        } catch (error) {
            return null;
        }
    }

    export async function ckek_auth() {
        try {
            const { data } = await client({
                method: "GET",
                url: "user/auth/status/",
                withCredentials: true,
                credentials: "include"
            });
            return data;
        } catch (error) {
            return null;
        }
    }


