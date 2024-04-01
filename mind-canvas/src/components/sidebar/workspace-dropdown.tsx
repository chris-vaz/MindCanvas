'use client';
import { useAppState } from '@/lib/providers/state-provider';
import { workspace } from '@/lib/supabase/supabase.types';
import React, { useEffect, useState } from 'react'
import SelectedWorkspace from './selected-workspace';

interface WorkspaceDropdownProps {
    privateWorkspaces: workspace[] | [];
    sharedWorkspaces: workspace[] | [];
    collaboratingWorkspaces: workspace[] | [];
    defaultValue: workspace | undefined;
}

const WorkspaceDropdown: React.FC<WorkspaceDropdownProps> = ({
    privateWorkspaces,
    collaboratingWorkspaces,
    sharedWorkspaces,
    defaultValue,
}) => {

    const { dispatch, state } = useAppState();
    const [selectedOption, setSelectedOption] = useState(defaultValue);
    const [isOpen, setIsOpen] = useState(false);

    // This useEffect ensures that whenever you receive new workspace data (private, shared, collaborating), it gets added to the global state (state.workspaces) after processing it to include an empty folders array. This centralized state then becomes accessible to other components in your application.

    useEffect(() => {
        if (!state.workspaces.length) {
            dispatch({
                type: 'SET_WORKSPACES',
                payload: {
                    workspaces: [
                        ...privateWorkspaces,
                        ...sharedWorkspaces,
                        ...collaboratingWorkspaces,
                    ].map((workspace) => ({ ...workspace, folders: [] })),
                },
            });
        }
    }, [privateWorkspaces, collaboratingWorkspaces, sharedWorkspaces]);

    const handleSelect = (option: workspace) => {
        setSelectedOption(option);
        setIsOpen(false);
    };

    // This useEffect helps in setting the initial selected workspace based on the provided defaultValue. When the application loads or the defaultValue changes, it ensures the selectedOption state reflects the corresponding workspace object.

    useEffect(() => {
        const findSelectedWorkspace = state.workspaces.find(
            (workspace) => workspace.id === defaultValue?.id
        );
        if (findSelectedWorkspace) setSelectedOption(findSelectedWorkspace);
    }, [state, defaultValue]);

    return (
        <div className="relative inline-block text-left">
            <div>
                <span onClick={() => setIsOpen(!isOpen)}>
                    {selectedOption ? (<SelectedWorkspace workspace={selectedOption} />) : ('Select a workspace')}
                </span>
            </div>
            {isOpen && (
                <div className="origin-top-right absolute w-full rounded-md shadow-md z-50 h-[190px] bg-black/10 backdrop-blur-lg group overflow-scroll border-[1px] border-muted">
                    <div className='rounded-md'></div>
                </div>
            )}
        </div>
    )
}

export default WorkspaceDropdown