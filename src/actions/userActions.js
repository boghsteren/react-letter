import React, { useContext, useEffect } from "react";
import { LoaderContext } from "./LoaderComponent";
import { getActiveUser } from "./AuthActions";

export const UserActions = ({ children }) => {
  const { setLoading } = useContext(LoaderContext);
  useEffect(() => {
    const getData = async () => {
      await getActiveUser();
      setLoading(false);
    };
    getData();
  }, [setLoading]);
  return <div>{children}</div>;
};

export default UserActions;
