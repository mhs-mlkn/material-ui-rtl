import { TBreakPoint } from "./layout.types";

type t = { [key in TBreakPoint]: number };

export const LAYOUT = "DU_LAUOUT";

export const BreakPoints: t = { lg: 1920, md: 1280, sm: 960, xs: 600, xxs: 0 };
export const RowHights: t = { lg: 10, md: 10, sm: 20, xs: 40, xxs: 40 };
export const Cols: t = { lg: 48, md: 32, sm: 24, xs: 2, xxs: 1 };
export const MIN_W: t = { lg: 6, md: 6, sm: 6, xs: 1, xxs: 1 };
export const MIN_H: t = { lg: 12, md: 10, sm: 8, xs: 4, xxs: 4 };
