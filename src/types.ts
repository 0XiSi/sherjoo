// types.ts
export type Book = {
  slug: string;
  title: string;
  filePath: string;
};

export type BookListProps = {
  params?: never;
  searchParams?: never;
};

export type BookPageProps = {
  params: {
    slug: string;
  };
};