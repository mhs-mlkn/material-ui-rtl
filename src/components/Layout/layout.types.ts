export type TLayoutItem = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  maxW?: number;
  minH?: number;
  maxH?: number;
  static?: boolean;
  moved: boolean;
};

export type TBreakPoint = "lg" | "md" | "sm" | "xs" | "xxs";

export type TLayouts = {
  [key in TBreakPoint]: TLayoutItem[];
};

export type TLayout = {
  editable: boolean;
};

export type TActions = {
  toggleEditable: () => void;
};
