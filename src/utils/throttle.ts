export function throttle<T extends (...args: any[]) => void>(
  func: T,
  delay: number,
): T {
  let lastCall = 0;

  return function (...args: Parameters<T>) {
    const now = new Date().getTime();

    if (now - lastCall >= delay) {
      lastCall = now;
      func(...args);
    }
  } as T;
}
