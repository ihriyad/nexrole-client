import Navbar from '@/components/nav/Navbar';
import React from 'react';

const BrowseJobsLayout = ({children}) => {
    return (
        <div>
            <Navbar></Navbar>
            {children}
        </div>
    );
};

export default BrowseJobsLayout;