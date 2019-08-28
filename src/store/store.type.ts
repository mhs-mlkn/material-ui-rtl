export type Store<S> = {
  actions: { [key: string]: (store: Store<S>, p: any) => void };
  listeners: Function[];
  setState: (s: { [key: string]: any }) => void;
  state: S;
};
