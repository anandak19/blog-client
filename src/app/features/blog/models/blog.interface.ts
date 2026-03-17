export interface ICreateBlog {
  title: string;
  content: string;
  image: File;
}

export type IUpdateBlog = ICreateBlog;

export interface IBlog extends Omit<ICreateBlog, 'image'> {
  image: string;
  id: string;
  userId: string;
  createdAt: string;
}

export interface IListBlog extends Pick<IBlog, 'title' | 'image' | 'id' | 'createdAt'> {
  writerName: string;
}

export interface IBlogDetails extends IListBlog {
  content: string;
}
