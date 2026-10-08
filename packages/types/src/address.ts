/**
 * Address representation for shipping and store locations.
 */
export interface IAddress {
  id: string;
  userId?: string;
  storeId?: string;
  label: string;
  recipientName: string;
  phone: string;
  street: string;
  district: string;
  city: string;
  province: string;
  postalCode: string;
  latitude?: number;
  longitude?: number;
  isDefault?: boolean;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

export interface CreateAddressDto {
  label: string;
  recipientName: string;
  phone: string;
  street: string;
  district: string;
  city: string;
  province: string;
  postalCode: string;
  latitude?: number;
  longitude?: number;
  isDefault?: boolean;
}

export interface UpdateAddressDto extends Partial<CreateAddressDto> {
  id?: string;
}
