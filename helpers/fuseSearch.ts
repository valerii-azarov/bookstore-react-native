import Fuse, { IFuseOptions } from "fuse.js";

const DEFAULT_FUSE_OPTIONS = {
  includeScore: true,
  threshold: 0.4,
  minMatchCharLength: 2,
  shouldSort: true,
  ignoreLocation: true,
  useExtendedSearch: true,
};

export const fuseSearch = <T>(items: T[], keys: string[], options: IFuseOptions<T> = DEFAULT_FUSE_OPTIONS): Fuse<T> => {
  return new Fuse(items, { ...options, keys });
};
