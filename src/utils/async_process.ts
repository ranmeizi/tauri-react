// 处理异步流程
export class AsyncProcess {
  process: any[] = [];

  use(fn: any) {
    this.process.push(() => fn(this.next));
  }

  next = async () => {
    try {
      const action = this.process.shift();
      action && (await action());
    } catch (e) {
      console.log(e);
    }
  };

  async start() {
    await this.next();
  }
}
