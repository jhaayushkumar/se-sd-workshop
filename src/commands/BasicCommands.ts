export class BasicCommands {
  greet(name: string): void {
    console.log(`Hello ${name}`);
  }

  add(a: number, b: number): void {
    console.log(a + b);
  }

  subtract(a: number, b: number): void {
    console.log(a - b);
  }
}
