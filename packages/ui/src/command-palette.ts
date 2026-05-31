/**
 * Subpath entry — `@cyanideui/ui/command-palette`
 *
 * For bundle-size-conscious consumers: importing only this entry pulls
 * cmdk (~30 KB) without dragging in the full library. Useful for apps
 * that need the palette but not most other components.
 *
 * The main `@cyanideui/ui` entry still re-exports these names for convenience.
 */
export {
  CommandPalette,
  CommandPaletteInput,
  CommandPaletteList,
  CommandPaletteEmpty,
  CommandPaletteGroup,
  CommandPaletteItem,
  CommandPaletteSeparator,
  CommandPaletteFooter,
  type CommandPaletteProps,
  type CommandPaletteItemProps,
  type CommandPaletteGroupProps,
} from "./components/command-palette"
