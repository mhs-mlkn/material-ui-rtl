import TStore from "./access.types";
import { AccessService as Access } from ".";
import { get } from "lodash";

function handleError(store: TStore, message: string) {
  return (error: any) =>
    store.setState({
      error: get(error, "response.data.message", message),
      loading: false
    });
}

export function getUsers(
  store: TStore,
  reportId: number,
  bypassCache?: boolean
) {
  store.setState({ loading: true, error: false });
  const { q } = store.state;
  Access.getUsers(q, reportId, bypassCache)
    .then(users => {
      store.setState({ users, reportId, loading: false });
    })
    .catch(handleError(store, "دسترسی امکان پذیر نیست"));
}

export function changeSearch(store: TStore, q: string) {
  store.setState({ q });
}

export function subscribe(store: TStore, username: string) {
  const { reportId } = store.state;
  const subscribePromise = Access.subscribe(username, reportId);
  store.setState({ q: "" });

  subscribePromise
    .then(users => store.setState({ users }))
    .catch(error => {
      store.setState({ users: Access.users });
      return handleError(store, "کاربر مورد نظر یافت نشد")(error);
    });
}

export function unSubscribe(store: TStore, userId: number) {
  store.setState({ error: false });
  const { reportId } = store.state;
  Access.unSubscribe(userId, reportId)
    .then(users => store.setState({ users }))
    .catch(error => {
      store.setState({ users: Access.users });
      handleError(store, "خطای سرور")(error);
    });
}
