export interface Article {
  _id: string;
  _type: string;
  title: string;
  author: string;
  tags?: string[];
  status: 'pending' | 'approved' | 'rejected';
  rejectionReason?: string;
  mainImage?: {
    _type: 'image';
    asset: {
      _type: 'reference';
      _ref: string;
    };
  };
  publishedAt: string;
  body: {
    _type: string;
    children: {
      _type: string;
      text: string;
    }[];
  }[];
} 