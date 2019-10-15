export type TStore<S> = {
  actions: { [key: string]: (store: TStore<S>, ...p: any[]) => void };
  listeners: Function[];
  setState: (s: { [key: string]: any }) => void;
  state: S;
};
