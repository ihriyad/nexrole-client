import { getApplicationsByApplicant } from '@/lib/api/applications';
import { getUserSession } from '@/lib/core/session';
import React from 'react';

const ApplicationPage =async () => {
    const user = await getUserSession();
    const applications =  await getApplicationsByApplicant(user?.email);
    console.log(applications);
    return (
        <div>
            <h3>My Applications: {applications.length}</h3>
        </div>
    );
};

export default ApplicationPage;