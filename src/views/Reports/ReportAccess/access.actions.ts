import { Store } from "use-global-hook";
import { errorHandler } from "utility";
import { AccessService as Access, TAccess, TActions } from ".";

export function getUsers(
  store: Store<TAccess, TActions>,
  reportId: number,
  bypassCache?: boolean
) {
  store.setState({ ...store.state, loading: true, error: false });
  const { q } = store.state;
  Access.getUsers(q, reportId, bypassCache)
    .then(users => {
      store.setState({ ...store.state, users, reportId, loading: false });
    })
    .catch(errorHandler<TAccess, TActions>(store, "دسترسی امکان پذیر نیست"));
}

export function changeSearch(store: Store<TAccess, TActions>, q: string) {
  store.setState({ ...store.state, q });
}

export function subscribe(store: Store<TAccess, TActions>, username: string) {
  const { reportId } = store.state;
  const subscribePromise = Access.subscribe(username, reportId);
  store.setState({ ...store.state, q: "" });

  subscribePromise
    .then(users => store.setState({ ...store.state, users }))
    .catch(error => {
      store.setState({ ...store.state, users: Access.users });
      return errorHandler<TAccess, TActions>(store, "کاربر مورد نظر یافت نشد")(
        error
      );
    });
}

export function unSubscribe(store: Store<TAccess, TActions>, userId: number) {
  store.setState({ ...store.state, error: false });
  const { reportId } = store.state;
  Access.unSubscribe(userId, reportId)
    .then(users => store.setState({ ...store.state, users }))
    .catch(error => {
      store.setState({ ...store.state, users: Access.users });
      errorHandler<TAccess, TActions>(store, "خطای سرور")(error);
    });
}
