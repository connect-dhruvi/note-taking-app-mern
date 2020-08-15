
export default {
    
    getNotes : () => {
        return fetch('https://notea.herokuapp.com/user/notes',{
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": localStorage.getItem('Authorization')
            },credentials: "same-origin"
        })
                .then(response=>{
                    if(response.status !== 401){
                        return response.json().then(data => data);
                    }
                    else
                        
                        return {message : {msgBody : "UnAuthorized",msgError : true}};
                        
                });
    },
    getArchieveNotes : () => {
        return fetch('https://notea.herokuapp.com/user/notes/archieve',{
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": localStorage.getItem('Authorization')
            },credentials: "same-origin"
        })
                .then(response=>{
                    if(response.status !== 401){
                        return response.json().then(data => data);
                    }
                    else
                        
                        return {message : {msgBody : "UnAuthorized",msgError : true}};
                        
                });
    },
    getTrashNotes : () => {
        return fetch('https://notea.herokuapp.com/user/notes/trash',{
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": localStorage.getItem('Authorization')
            },credentials: "same-origin"
        })
                .then(response=>{
                    if(response.status !== 401){
                        return response.json().then(data => data);
                    }
                    else
                        
                        return {message : {msgBody : "UnAuthorized",msgError : true}};
                        
                });
    },
    postNote : note => {
        return fetch('https://notea.herokuapp.com/user/note',{
            method : "post",
            body : JSON.stringify(note),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": localStorage.getItem('Authorization')
            }
        }).then(response=>{
            if(response.status !== 401){
                return response.json().then(data => data);
            }
            else
                return {message : {msgBody : "UnAuthorized"},msgError : true};
        });
    },

    deleteNote : note => {
        return fetch('https://notea.herokuapp.com/user/note/delete',{
            method : "delete",
            body : JSON.stringify(note),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": localStorage.getItem('Authorization')
            }
        }).then(response=>{
            if(response.status !== 401){
                return response.json().then(data => data);
            }
            else
                return {message : {msgBody : "UnAuthorized"},msgError : true};
        });
    },

    updateNotes : note => {
        return fetch('https://notea.herokuapp.com/user/note/update', {
            method : "PUT",
            body : JSON.stringify(note),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": localStorage.getItem('Authorization')
            }
           
        }) .then(response=>{
                    if(response.status !== 401){
                        return response.json().then(data => data);
                    }
                    else
                        
                        return {message : {msgBody : "UnAuthorized",msgError : true}};
                        
                });
    },

    updateArchieveNotes : note => {
        return fetch('https://notea.herokuapp.com/user/note/archieve',{
            method : "PUT",
            body : JSON.stringify(note),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": localStorage.getItem('Authorization')
            }
           
        }) .then(response=>{
                    if(response.status !== 401){
                        return response.json().then(data => data);
                    }
                    else
                        
                        return {message : {msgBody : "UnAuthorized",msgError : true}};
                        
                });
    },

    updateTrashNotes : note => {
        return fetch('https://notea.herokuapp.com/user/note/trash',{
            method : "PUT",
            body : JSON.stringify(note),
            headers:{
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                "Authorization": localStorage.getItem('Authorization')
            }
           
        }) .then(response=>{
                    if(response.status !== 401){
                        return response.json().then(data => data);
                    }
                    else
                        
                        return {message : {msgBody : "UnAuthorized",msgError : true}};
                        
                });
    }

 
}