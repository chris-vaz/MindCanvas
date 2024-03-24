'use client';
import { AuthUser } from '@supabase/supabase-js';
import React, { useState } from 'react';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '../ui/card';
import EmojiPicker from '../global/emoji-picker';
import { Label } from '../ui/label';
import { Input } from '../ui/input';


interface DashboardSetupProps {
  user: AuthUser;
  subscription: {} | null;
}

const DashboardSetup: React.FC<DashboardSetupProps> = ({
  subscription,
  user,
}) => {

  const [selectedEmoji, setSelectedEmoji] = useState('');

  return (
    <Card className="w-[800px] h-screen sm:h-auto">
      <CardHeader>
        <CardTitle>Create A Workspace</CardTitle>
        <CardDescription>
          Lets create a private workspace to get you started.You can add
          collaborators later from the workspace settings tab.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={() => { }}>
          <div className='flex flex-col gap-4'>
            <div className='text-5xl'>
              <EmojiPicker getValue={(emoji) => setSelectedEmoji(emoji)}>{selectedEmoji}</EmojiPicker>
              <div className='w-full'>
                <Label htmlFor='workspaceName' className='text-sm text-muted-foreground'>Name</Label>
                <Input id="workspaceName" type='text' placeholder='Workspace Name' className='bg-transparent'></Input>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default DashboardSetup;