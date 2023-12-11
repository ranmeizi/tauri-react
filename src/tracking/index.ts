
import DefaultTracking from './impls/default';
import { Agent } from './tool/Agent';

// 埋点各家实现
const df = new DefaultTracking();

const agent = new Agent<any>();

// use controller 使用 agent 调用埋点api
agent.use(() => df);

// 初始化
agent.duration.createGroup('pageStay');

export default agent;
