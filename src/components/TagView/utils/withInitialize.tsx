import React, { useEffect, useState } from "react";

type Options = {
  namespace: String;
};

const withInitialize: (options: Options) => HOC_Inject<any> = ({
  namespace: string,
}) => {
  return (Component: any) => (props: any) => {
    // 初始化 apptags namespace 存储
    useEffect(() => {}, []);
    return <Component {...props} />;
  };
};

export default withInitialize;
