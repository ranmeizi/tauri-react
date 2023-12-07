import Taro from '@tarojs/taro';
// eslint-disable-next-line
import axios from 'taro-axios';
import { TrackingProperties } from '../index';
import { Stack } from '../tool/LinkNode';
import { SetGlobal, TrackingTrait } from '../tool/abstract';

let globalData = {};
const app = 5004;

const envVersion = Taro.getAccountInfoSync().miniProgram.envVersion || '';

function upload(params: any) {
  if (envVersion !== 'release') {
    // 只有线上版才提交，不污染数据
    return;
  }
  // axios 会过滤 undefined
  axios.get('https://tj.licaimofang.com/v.gif', { params });
}

export default class extends TrackingTrait<TrackingProperties> {
  initialize(): void {}
  track(data: TrackingProperties): void {
    const d = composeData(data);

    console.log(
      `%cgif 埋点日志`,
      'background:rgb(15,51,228);color:#fff;border-radius:4px;padding:4px 12px',
      `event = ${d.event}, data=`,
      d
    );
    upload(d);
  }
  setGlobal(arg: SetGlobal): void {
    if (typeof arg === 'function') {
      globalData = arg(globalData);
    } else {
      globalData = arg;
    }
  }
  setAccount(arg: SetGlobal): void {
    if (typeof arg === 'function') {
      globalData = arg(globalData);
    } else {
      globalData = arg;
    }
  }
}

function composeData(data: any) {
  return {
    app: app,
    ts: Date.now(),
    pageid: Stack.curr?.val,
    ref: Stack.curr?.prev?.val,
    ...globalData,
    ...data,
  };
}
