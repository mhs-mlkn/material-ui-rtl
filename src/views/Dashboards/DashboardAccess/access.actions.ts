import { Store } from "use-global-hook";
import { errorHandler } from "utility";
import {
  AccessService as Access,
  TAccess,
  TActions,
  TShareItem,
  TUser
} from ".";

export function getUsers(
  store: Store<TAccess, TActions>,
  dashboardId: number,
  bypassCache?: boolean
) {
  store.setState({ ...store.state, loading: true, error: false });
  const { q } = store.state;
  Access.getUsers(q, dashboardId, bypassCache)
    .then(users => {
      store.setState({
        ...store.state,
        users,
        dashboardId: dashboardId,
        loading: false
      });
    })
    .catch(errorHandler<TAccess, TActions>(store, "دسترسی امکان پذیر نیست"));
}

export function changeSearch(store: Store<TAccess, TActions>, q: string) {
  store.setState({ ...store.state, q });
}

export function subscribe(store: Store<TAccess, TActions>, user: TShareItem) {
  const { dashboardId } = store.state;
  const subscribePromise = Access.subscribe(user, dashboardId);
  store.setState({ ...store.state, q: "" });

  subscribePromise
    .then(users => store.setState({ ...store.state, users }))
    .catch(error => {
      store.setState({ ...store.state, users: Access.users });
      return errorHandler<TAccess, TActions>(
        store,
        "کاربر مورد نظر یافت نشد"
      )(error);
    });
}

export function unSubscribe(store: Store<TAccess, TActions>, user: TUser) {
  store.setState({ ...store.state, error: false });
  Access.unSubscribe(user)
    .then(users => store.setState({ ...store.state, users }))
    .catch(error => {
      store.setState({ ...store.state, users: Access.users });
      errorHandler<TAccess, TActions>(store, "خطای سرور")(error);
    });
}
