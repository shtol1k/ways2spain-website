---
description: Register or update icons from `src/assets/icons/input` into the icon system.
---

1. List all SVG files in `src/assets/icons/input/`.
2. For each SVG file found:
   a. Check if the filename follows the naming convention: `icon-name.svg`, `icon-name-md.svg`, or `icon-name-lg.svg`.
   b. Read the SVG file content.
   c. Validate the `viewBox` in the SVG content: - If filename ends in `-md.svg`, ensure `viewBox="0 0 20 20"`. If not, STOP and warn the user about potential export error. - If filename ends in `-lg.svg`, ensure `viewBox="0 0 24 24"`. If not, STOP and warn the user about potential export error. - If filename is generic (no size suffix), check if it is 24x24 or 20x20 and proceed, or warn if strange size.
   d. Determine Component Name & Path: - Component Name: PascalCase of the filename (e.g., `calendar-md.svg` -> `CalendarMd`). - Target Directory: `src/components/ui/icons/custom/<icon-name>/`. - Target File: `src/components/ui/icons/custom/<icon-name>/<ComponentName>.tsx`.
   e. Generate React component: - Content: - React functional component. - Spreads props (`...props`). - Removes `width` and `height` attributes from root `<svg>`. - Preserves `viewBox`. - Replaces hardcoded stroke/fill colors with `currentColor`.
   f. File Operation (Create or Update): - Check if the target file already exists. - If it exists, OVERWRITE it with the new content (this handles the update case). - If it doesn't exist, CREATE it.
   g. Update `src/components/ui/icons/registry.tsx`: - Import the new component (if not already imported). - Add or Update the `iconsRegistry` object entry: - If adding a specific size variant (e.g., `md`), check if the other variant (`lg`) exists (file check or import check). - Ensure the registry entry reflects the current state: - `{ md: ComponentMd, lg: ComponentLg }` if both exist. - `{ md: ComponentMd }` if only `md` exists. - `Component` if generic. - Do not duplicate imports or keys.
3. Move the processed SVG files from `src/assets/icons/input/` to `src/assets/icons/archive/`.
   - If a file with the same name exists in archive, overwrite it or rename the archived version (e.g., `icon-name-md_v1.svg`). Overwriting is acceptable to keep archive clean, or timestamping for history. For now, overwrite is fine.
4. Run `npm run lint` (or relevant lint command) to ensure imports formatted correctly.
