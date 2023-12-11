// eslint-disable-next-line
import { Stack } from '../tool/LinkNode';
import { SetGlobal, TrackingTrait } from '../tool/abstract';

let globalData = {};

function upload(params: any) {
  // console.log(params)
}

export default class extends TrackingTrait<any> {
  initialize(): void {}
  track(data: any): void {
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
    ts: Date.now(),
    pageid: Stack.curr?.val,
    ref: Stack.curr?.prev?.val,
    ...globalData,
    ...data,
  };
}
