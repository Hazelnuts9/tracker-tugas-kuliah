// Custom Promise: menunggu sekian milidetik, lalu resolve
export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}