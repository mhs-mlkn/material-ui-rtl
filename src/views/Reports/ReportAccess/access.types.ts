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

export type TActions = {
  getUsers: (reportId: number, bypassCache?: boolean) => void;
  changeSearch: (q: string) => void;
  subscribe: (username: string) => void;
  unSubscribe: (userId: number) => void;
};
