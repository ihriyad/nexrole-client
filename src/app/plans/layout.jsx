import Navbar from '@/components/nav/Navbar';
import React from 'react';

const PlansLayout = ({children}) => {
    return (
        <div>
            <Navbar />
            {children}
        </div>
    );
};

export default PlansLayout;