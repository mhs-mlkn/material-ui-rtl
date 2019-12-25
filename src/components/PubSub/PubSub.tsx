import { useRef, useEffect } from "react";
import { Subject } from "rxjs/internal/Subject";
import { filter } from "rxjs/internal/operators/filter";
import { Subscription } from "rxjs/internal/Subscription";
import { Categories } from ".";

type subscribeType = {
  category: Categories;
  id: number;
  payload: any;
};

const subject = new Subject<subscribeType>();

export function publish(data: subscribeType) {
  subject.next(data);
}

type propsType = {
  listener: (data: any) => any;
  children: JSX.Element;
} & Omit<subscribeType, "payload">;

export const Subscriber = (props: propsType) => {
  const { category, id, listener, children } = props;
  const unsub = useRef<Subscription>();

  useEffect(() => {
    unsub.current = subject
      .pipe(filter(f => f.category === category && f.id === id))
      .subscribe(s => listener(s.payload));

    return () => {
      if (unsub.current) {
        unsub.current.unsubscribe();
      }
    };
    // eslint-disable-next-line
  }, []);

  return children;
};
