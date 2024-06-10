

export const register_user = async (formData) => {
    try {
        const res = await fetch('http://localhost:4000/api/v1/auth/signup', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(formData),
        });
        const data = res.json();
        return data;
    } catch (error) {
        console.log('Error in register_user (service) => ', error);
        return error.message
    }
};


export const login_user = async (formData) => {
    try {
        const res = await fetch('http://localhost:4000/api/v1/auth/login', {
            headers: {
                'Content-Type': 'application/json',
            },
            method: 'POST',
            body: JSON.stringify(formData),
        });
        const data = res.json();
        return data;
    } catch (error) {
        console.log('Error in login_user (service) => ', error);
        return error.message
    }
};

export const media_list = async (token) => {
    try {
        const res = await fetch('http://localhost:4000/api/v1/media/list', {
             headers: {
              Authorization: `Bearer ${token}`,
             },
            method: 'GET',
        });
        const data = res.json();
        return data;
    } catch (error) {
        console.log('Error in login_user (service) => ', error);
        return error.message
    }
};

export const media_view = async (token, id) => {
    try {
        const res = await fetch(`http://localhost:4000/api/v1/media/view/${id}`, {
             headers: {
              Authorization: `Bearer ${token}`,
             },
            method: 'GET',
        });
        const data = res.json();
        return data;
    } catch (error) {
        console.log('Error in login_user (service) => ', error);
        return error.message
    }
};