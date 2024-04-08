type AppTagsStatic = {
  // 命名空间
  namespace: string;
  // 当前活动的 key 的index
  current: number;
  // tags
  tags: AppTag[];
};

type AppTag = {
  // url / key
  key: string;
  // title
  title: string;
  // 排序
  order: number;
};
