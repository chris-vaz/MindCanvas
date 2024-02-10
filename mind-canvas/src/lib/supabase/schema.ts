import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

// Creating tables here and all these properties would be a column

export const workspaces = pgTable('workspaces', {
    id: uuid('id').defaultRandom().primaryKey().notNull(),
    createdAt: timestamp('created_at', {
        withTimezone: true,
        mode: 'string',
    }),
    workspaceOwner: uuid('workspace_owner').notNull(),
    title: text('title').notNull(),
    iconId: text('icon_id').notNull(),
    data: text('in_trash'),
    inTrash: text('in_trash'),
    logo: text('logo'),
    bannerUrl: text('banner_url'),

});