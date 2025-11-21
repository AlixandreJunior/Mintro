export function magnitude(x: number, y: number, z: number): number {
  return Math.sqrt(x * x + y * y + z * z);
}

export function smooth(prev: number, current: number, alpha: number): number {
  return (1 - alpha) * prev + alpha * current;
}
