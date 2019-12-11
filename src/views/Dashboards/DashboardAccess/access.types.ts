export type TShareItem = {
  identity: string;
  expire: string;
  editable: boolean;
};

export type TUser = {
  id: number;
  user: {
    id: number;
    ssoId: number;
    firstName: string;
    lastName: string;
    username: string;
  };
  expire: string;
  editable: boolean;
};

export type TAccess = {
  loading: boolean;
  error: boolean | string;
  dashboardId: number;
  users: TUser[];
  q: string;
};

export type TActions = {
  getUsers: (dashboardId: number, bypassCache?: boolean) => void;
  changeSearch: (q: string) => void;
  subscribe: (user: TShareItem) => void;
  unSubscribe: (user: TUser) => void;
};
