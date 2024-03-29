import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(req: NextRequest) {
    const requestUrl = new URL(req.url);
    const code = requestUrl.searchParams.get('code');

    if (code) {
        const supabase = createRouteHandlerClient({ cookies });
        await supabase.auth.exchangeCodeForSession(code);
    }
    return NextResponse.redirect(`${requestUrl.origin}/dashboard`);
}

// This code snippet defines a Next.js API route handler function named GET that handles the logic for user authentication through Supabase after an authorization flow.

// This code acts as a callback route after a user successfully authenticates through Supabase's login flow. It receives the authorization code in the URL, exchanges it for a user session, and redirects the user to the dashboard if successful.
