export type TLoadingBar = {
  progress: number;
  count: number;
};

export type TActions = {
  start: () => void;
  complete: () => void;
};
