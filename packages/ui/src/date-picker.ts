/**
 * Subpath entry — `@atrium/ui/date-picker`
 *
 * For bundle-size-conscious consumers: importing only this entry pulls
 * react-day-picker (~80 KB) without dragging in the full library.
 *
 * The main `@atrium/ui` entry still re-exports these names for convenience.
 */
export { DatePicker, type DatePickerProps } from "./components/date-picker"
export { DateField, type DateFieldProps } from "./components/date-field"
export type { DateRange } from "react-day-picker"
