import DefaultTracking from "./impls/default";
import ExampleEmitTracking from "./impls/example_emit";
import { Agent } from "./tool/Agent";

const agent = new Agent<any>();

// use controller 使用 agent 调用埋点api
// 埋点各家实现
agent.use(() => new DefaultTracking());
agent.use(() => new ExampleEmitTracking());

// 初始化
agent.duration.createGroup("pageStay");

export default agent;
