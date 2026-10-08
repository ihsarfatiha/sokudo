/**
 * Product Category entity interface.
 */
export interface ICategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  iconUrl?: string;
  imageUrl?: string;
  parentId?: string | null;
  parent?: ICategory | null;
  children?: ICategory[];
  level?: number;
  displayOrder?: number;
  isActive: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CreateCategoryDto {
  name: string;
  slug?: string;
  description?: string;
  iconUrl?: string;
  imageUrl?: string;
  parentId?: string | null;
  displayOrder?: number;
}

export interface UpdateCategoryDto extends Partial<CreateCategoryDto> {
  isActive?: boolean;
}
