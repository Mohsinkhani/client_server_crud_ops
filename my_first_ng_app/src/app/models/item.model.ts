export interface Student {
  _id?: number;
  name?: string;
  shape?: string;
}

export interface PaginatedResponse {
  totalCount: number;
  students: Student[];
}
