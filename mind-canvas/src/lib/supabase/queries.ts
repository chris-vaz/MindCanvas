'use server';

import db from "./db";
// Make sure the Supabase import are from 'Supabase Types' 
import { File, Folder, Subscription, User, workspace } from './supabase.types';
import { files, folders, users, workspaces } from '../../../migrations/schema';

export const getUserSubscriptionStatus = async (userId: string) => {
    try {
        // Fetch subscription data from Supabase
        const data = await db.query.subscriptions.findFirst({
            where: (s, { eq }) => eq(s.userId, userId),
        });
        // Return data or null with an error message if not found
        if (data) return { data: data as Subscription, error: null };
        else return { data: null, error: null };
    } catch (error) {
        console.log(error);
        return { data: null, error: `Error` };
    }
};

export const createWorkspace = async (workspace: workspace) => {
    try {
        const response = await db.insert(workspaces).values(workspace);
        return { data: null, error: null };
    } catch (error) {
        console.log(error);
        return { data: null, error: 'Error' };
    }
};