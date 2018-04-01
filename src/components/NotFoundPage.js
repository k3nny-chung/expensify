import React from 'react';
import {NavLink} from 'react-router-dom';

const NotFoundPage = () => (
    <div>Page Not Found 404 
        <NavLink to="/">Go home</NavLink>
    </div>
);

export default NotFoundPage;