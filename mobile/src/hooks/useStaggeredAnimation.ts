import { useMemo } from 'react';

export function useStaggeredAnimation(
  index: number,
  options: { base?: number; step?: number } = {},
) {
  const { base = 200, step = 80 } = options;
  return useMemo(() => base + index * step, [index, base, step]);
}
