import React, { useContext } from 'react';

const Logout = props => {
//const [refreshDrawer,setRefreshDrawer] = useContext(DrawerContext);

    // AuthService.logout().then(data=>{
    //     if(data.success){
    //       // AuthContext.setUser(data.user);
    //      //  AuthContext.setIsAuthenticated(false);
    //        console.log(data + "from logout");
    //     }
    // });
        localStorage.clear();
        props.history.push('/Login');
 //{setRefreshDrawer(true)}
    return(
        <div>
            <h1> You have successfully Logout </h1> 
        </div>
    )
}

export default Logout;
