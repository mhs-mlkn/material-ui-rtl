import { useEffect } from "react";
import { useThemeStore } from "components/Theme";

const FullScreen = (props: { children: any }) => {
  const actions = useThemeStore()[1];

  useEffect(() => {
    actions.toggleFullContent(true);

    return () => {
      actions.toggleFullContent(false);
    };
  }, [actions]);

  return props.children;
};

export default FullScreen;
