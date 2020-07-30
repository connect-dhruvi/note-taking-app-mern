import React, { useContext } from 'react';

function Logout(){
//const [refreshDrawer,setRefreshDrawer] = useContext(DrawerContext);

    // AuthService.logout().then(data=>{
    //     if(data.success){
    //       // AuthContext.setUser(data.user);
    //      //  AuthContext.setIsAuthenticated(false);
    //        console.log(data + "from logout");
    //     }
    // });
    localStorage.clear();
    
 //{setRefreshDrawer(true)}
    return(
        <div>
           
            <h1> You have successfully Logout </h1> 
        </div>
    )
}

export default Logout;
