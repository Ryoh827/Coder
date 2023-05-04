namespace AtCoder {
  class Scanner {
    private buffer = '';
    private stdinQueue: any = [];

    constructor() {
      process.stdin.resume();
      process.stdin.setEncoding('utf8');
      process.stdin.on('data', (chunk): void => {
        this.buffer += chunk;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        while (this.stdinQueue.length > 0) {
          const i = this.buffer.indexOf('\n');
          if (i < 0) {
            break;
          }
          let line = this.buffer.substr(0, i);
          if (line.endsWith('\r')) {
            line = line.slice(0, -1);
          }
          this.buffer = this.buffer.substr(i + 1);

          // eslint-disable-next-line @typescript-eslint/no-unsafe-call , @typescript-eslint/no-unsafe-member-access
          this.stdinQueue.shift()(line);
        }
      });
    }
    public getLine(): Promise<string> {
      return new Promise((resolve, reject) => {
        const i = this.buffer.indexOf('\n');
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        if (i >= 0 && this.stdinQueue.length === 0) {
          let line = this.buffer.substr(0, i);
          if (line.endsWith('\r')) {
            line = line.slice(0, -1);
          }
          this.buffer = this.buffer.substr(i + 1);
          resolve(line);
        } else {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
          this.stdinQueue.push(resolve);
        }
      });
    }

    public close(): void {
      process.stdin.pause();
    }
  }

  const fn: () => Promise<void> = async function solve() {
    const sc = new Scanner();

    const table: string[] = 'abcdefgh'.split('');

    for (let i = 7; i >= 0; i--) {
      const line: string = await sc.getLine();
      const idx = line.indexOf('*');
      if (idx >= 0) {
        console.log(table[idx] + (i + 1).toString());
        return;
      }
    }

    sc.close();
  };

  void fn();
}
