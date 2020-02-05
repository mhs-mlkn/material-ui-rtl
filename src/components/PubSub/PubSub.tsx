import { useRef, useEffect } from "react";
import { Subject } from "rxjs/internal/Subject";
import { Subscription } from "rxjs/internal/Subscription";

export type subscribeType = {
  id: number;
  payload: any;
};

const subject = new Subject<subscribeType>();

export function publish(data: subscribeType) {
  subject.next(data);
}

type propsType = {
  listener: (data: subscribeType) => any;
  children: JSX.Element;
};

export const Subscriber = (props: propsType) => {
  const { listener, children } = props;
  const unsub = useRef<Subscription>();

  useEffect(() => {
    unsub.current = subject.subscribe(s => listener(s));

    return () => {
      if (unsub.current) {
        unsub.current.unsubscribe();
      }
    };
    // eslint-disable-next-line
  }, []);

  return children;
};
