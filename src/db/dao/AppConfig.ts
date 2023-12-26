import { db } from "@/db";
import * as C from "@/CONSTANTS";

export const Query = {
  // 获取主题色
  get_primary() {
    console.log(db.collections, "collections");
    return db.collections["appConfig"].findOne({
      selector: {
        key: C.APP_CONFIG_STORAGE_KEY_PRIMARY,
      },
    });
  },
};

export const Mutation = {};
