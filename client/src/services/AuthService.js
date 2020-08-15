
export default {
    login: user => {
        console.log(user);
        return fetch('https://notea.herokuapp.com/user/login', {
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
        return fetch('https://notea.herokuapp.com/user/register', {
            method: "post",
            body: JSON.stringify(user),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => res.json())
            .then(data => data);
    },
    updateUser : user => {
        return fetch('https://notea.herokuapp.com/user/update',{
            method : "PUT",
            body : JSON.stringify(user),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": localStorage.getItem('Authorization')
            }
           
        }) .then(response => {
                    if(response.status !== 401){
                        return response.json().then(data => data);
                    }
                    else
                        
                        return {message : {msgBody : "UnAuthorized",msgError : true}};
                        
                });
    },
    isAuthenticated: () => {
        return fetch('https://notea.herokuapp.com/user/authenticated',{
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": localStorage.getItem('Authorization')
            },credentials: "same-origin"
        })
            .then(res => {
                if (res.status !== 401)
                    return res.json().then(data => data);
                else{
                    //props.history.push('/Login',)
                    return { isAuthenticated: false, user: { username: "", role: "", firstname:"" } }; 
                }
            });
    },
    isAuthorized: () => {
        return localStorage.getItem('Authorization') !== null;
    }
}