export function setIntersect<T>(a: T[] | Set<T>, b: T[] | Set<T>): Set<T> {
  const bSet = new Set([...b]);
  return new Set([...a].filter((aVal) => bSet.has(aVal)));
}

export function setDifference<T>(a: T[] | Set<T>, b: T[] | Set<T>): Set<T> {
  const bSet = new Set([...b]);
  return new Set([...a].filter((aVal) => !bSet.has(aVal)));
}

export function setUnion<T>(a: T[] | Set<T>, b: T[] | Set<T>): Set<T> {
  return new Set([...a, ...b]);
}

export function alphabeticalSort(a: { name: string }, b: { name: string }): number {
  if (a.name < b.name) {
    return -1;
  }
  if (a.name > b.name) {
    return 1;
  }
  return 0;
}
