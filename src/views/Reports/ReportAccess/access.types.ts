import { TStore } from "store";

export type TUser = {
  id: number;
  username: string;
  loading?: boolean;
};

export type TAccess = {
  loading: boolean;
  error: boolean | string;
  reportId: number;
  users: TUser[];
  q: string;
};

type t = TStore<TAccess>;

export default t;
