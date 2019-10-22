import { useEffect } from "react";
import { useHistory } from "react-router-dom";

type TProps = {
  error: boolean | string;
  children: any;
};

const Error = (props: TProps) => {
  let history = useHistory();
  const { error, children } = props;

  useEffect(() => {
    if (!!error) {
      history.push("/user/error", { message: error.toString() });
    }
  }, [error, history]);

  return children;
};

export default Error;
