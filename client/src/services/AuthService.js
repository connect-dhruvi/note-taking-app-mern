export default {
    login: user => {
        console.log(user);
        return fetch('http://localhost:5000/user/login', {
            method: "post",
            credentials: 'same-origin',
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        }).then(res => {
            if (res.status !== 401)
                return res.json().then(data => data);
            else
                return { isAuthenticated: false, user: { username: "", role: "" } };
        })
    },
    register: user => {
        console.log(user);
        return fetch('http://localhost:5000/user/register', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => data);
    },
    isAuthenticated: () => {
        return fetch('/user/authenticated')
            .then(res => {
                if (res.status !== 401)
                    return res.json().then(data => data);
                else {
                    //props.history.push('/Login',)
                    return { isAuthenticated: false, user: { username: "", role: "" } };
                }
            });
    },
    isAuthorized: () => {
        return localStorage.getItem('Authorization') !== null;
    }
}