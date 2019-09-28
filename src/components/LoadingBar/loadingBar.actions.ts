import TStore from "./loadingBar.types";
import { random } from "lodash";

let interval: NodeJS.Timeout;

export const start = (store: TStore) => {
  const { progress, count } = store.state;
  store.setState({
    progress: count === 0 ? random(20, 30, false) : progress,
    count: count + 1
  });
  if (count === 0) {
    interval = setInterval(() => add(store), 1000);
  }
};

const add = (store: TStore) => {
  const value: number = random(2, 10, false);
  const { progress } = store.state;
  const updated = progress + value;
  store.setState({ progress: updated > 95 ? 95 : updated });
};

export const complete = (store: TStore) => {
  const { progress, count } = store.state;
  const updatedCount = count - 1 <= 0 ? 0 : count - 1;
  if (!!interval) {
    clearInterval(interval);
  }
  store.setState({
    progress: updatedCount === 0 ? 100 : progress,
    count: updatedCount
  });
};
