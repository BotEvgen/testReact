const transferArticleKeys = {
   all: ['TransferArticles'],
   lists: () => [...transferArticleKeys.all, 'list'] as const,
   list: (filters: string, filterName: string) =>
      [...transferArticleKeys.lists(), filterName, { filters }] as const,
   details: () => [...transferArticleKeys.all, 'detail'] as const,
   detail: (id: string) => [...transferArticleKeys.details(), id] as const,
} as const


export {
   transferArticleKeys,
}
