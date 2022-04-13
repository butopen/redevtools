export function findLastTarget(e: MouseEvent) {
  try {
    if (e.target && (e.target as HTMLElement).className?.indexOf('redevtools') < 0) {
      return e.target as any;
    }
  } catch {
  }
}
