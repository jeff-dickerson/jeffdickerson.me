export const blogKeys = {
  all: ['blog'] as const,
  publication: () => [...blogKeys.all, 'publication'] as const,
  postsInfinite: () => [...blogKeys.all, 'posts', 'infinite'] as const,
  postsAll: () => [...blogKeys.all, 'posts', 'all'] as const,
};
