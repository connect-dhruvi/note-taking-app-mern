import React from 'react';
import Link from '@material-ui/core/Link';

function Home(){
    return(
        <div>
            <h1> Welcome to Forgot Password</h1>
            <Link href="/Login" variant="body2" >
                {"Already have an account? Login here"}
              </Link>

        </div>
    )
}

export default Home;
