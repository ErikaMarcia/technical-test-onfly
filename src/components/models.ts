export interface Todo {
  id: number;
  content: string;
}

export interface Meta {
  totalCount: number;
}

interface Address {
  street: string,
  number: string,
  district: string,
  city: string,
  state: string,
  country: string,
  zipCode: any,
  fullAddress: string,
}

export interface Hotel {
  id: number,
  favorite: boolean,
  name: string,
  description: string,
  stars: string,
  thumb: string,
  amenities: {key: string, label: string}[],
  hasBreakFast: boolean,
  hasRefundableRoom: boolean,
  hasAgreement: boolean,
  nonRefundable: any,
  address: Address,
  images: string[],
  deals: any,
  roomsQuantity: number
}

export interface Place {
  name: string,
  state: {
    name: string,
    shortname: string
  },
  placeId: number
}

export interface HotelPlace {
  hotels: [],
  placeId: number
}
