import { requiredRole } from '@/lib/core/session';
import React from 'react';

const SeekerLayout =async ({children}) => {
    await requiredRole("seeker");
    return (
        <div>
            {children}
        </div>
    );
};

export default SeekerLayout;