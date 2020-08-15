import React from 'react';
import { useHistory } from 'react-router-dom';

const Logout = props => {
 
    const history = useHistory();

        localStorage.clear();
        history.push('/Login');
        window.location.reload(false);

}

export default Logout;
