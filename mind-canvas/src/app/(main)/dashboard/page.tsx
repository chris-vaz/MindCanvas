'use client';
import React from 'react';
import { createServerComponentClient } from '@supabase/auth-helpers-nextjs';

import { cookies } from 'next/headers';
import db from '@/lib/supabase/db';
import { redirect } from 'next/navigation';
import DashboardSetup from '@/components/dashboard-setup/dashboard-setup';
import { getUserSubscriptionStatus } from '@/lib/supabase/queries';
// import DashboardSetup from '@/components/dashboard-setup/dashboard-setup';
// import { getUserSubscriptionStatus } from '@/lib/supabase/queries';

const DashboardPage = async () => {
    // Creates a Supabase client instance specifically for Server Components, using the cookies object to potentially include authentication information.
    const supabase = createServerComponentClient({ cookies });

    // Fetches the currently logged-in user's information using Supabase's auth.getUser() method. The code destructures the response, extracting the user object from the nested data property.
    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Checks if a user was found. If not, the function exits without rendering anything.
    if (!user) return;

    const workspace = await db.query.workspaces.findFirst({
        where: (workspace, { eq }) => eq(workspace.workspaceOwner, user.id),
    });

    const { data: subscription, error: subscriptionError } =
        await getUserSubscriptionStatus(user.id);

    // If an error occurred while fetching the subscription status, the function exits without rendering anything.
    if (subscriptionError) return;

    if (!workspace)
        return (
            <div className="bg-background h-screen w-screen flex justify-center items-center">
                <DashboardSetup user={user} subscription={subscription}></DashboardSetup>
            </div>
        );

    redirect(`/dashboard/${workspace.id}`);
};

// Checks if a workspace was found for the user:

// If not, Dashboard setup component
// redirect(/dashboard/${workspace.id});: Otherwise, it redirects the user to a specific URL path within the /dashboard route, using the ID of the retrieved workspace.

export default DashboardPage;