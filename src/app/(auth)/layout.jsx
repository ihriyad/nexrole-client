import Navbar from '@/components/nav/Navbar';
import React from 'react';

const AuthPageLayout = ({children}) => {
    return (
        <div>
            <Navbar></Navbar>
            {children}
        </div>
    );
};

export default AuthPageLayout;