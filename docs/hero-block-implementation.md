Hero Block added to Payload CMS
This implementation contains the changes for adding a `HeroBlock` to the `Pages` collection in Payload CMS.

1.  **New Block Definition**: `src/blocks/HeroBlock.ts` defines the structure (title, text, media, buttons) of the Hero block.
2.  **Pages Collection Update**: `src/collections/Pages.ts` imports and registers `HeroBlock` within the `layout` blocks array.
3.  **Frontend Component**: `src/components/blocks/HeroBlock.tsx` implements the visual rendering of the Hero block using Tailwind CSS and Next.js Image component.
4.  **RenderBlocks Update**: `src/components/blocks/RenderBlocks.tsx` maps the `hero` block type to the new React component.

**Reason for Change**:
The user requested a Hero block for the homepage to be managed via the Payload admin panel.

**Testing Instructions for User**:

1.  Run the migration (this PR includes the migration file).
2.  Start the dev server (`npm run dev`).
3.  Go to the Admin Panel -> Pages -> Edit "Home" (or any page).
4.  In the "Content" tab, add a new block and select "Hero".
5.  Fill in the fields (Title, Text, Background Image, Buttons).
6.  Save and view the page on the frontend to verify rendering.

**Note**:
If you experience issues with the admin panel (blank page), please ensure migrations are run: `npm run migrate`.
This change modifies the database schema by adding a new block type to the `layout` field of the `pages` table.
