import { IGetPeopleApiResponse, IPeople } from '@/models/People';
import { IGetPlanetsApiResponse, IPlanet } from '@/models/Planet';
import { IGetStarshipsApiResponse, IStarship } from '@/models/Starship';
import { IGetVehiclesApiResponse, IVehicle } from '@/models/Vehicle';

export interface IGetBaseListParams {
    page?: number;
    search?: string;
}

export interface IGetBaseListApiResponse {
    count: number;
    previous?: string;
    next?: string;
}

export interface IGetBaseItemParams {
    id: number;
}

export enum ECategory {
    ALL = 'all',
    PEOPLE = 'people',
    PLANETS = 'planets',
    STARSHIPS = 'starships',
    VEHICLES = 'vehicles'
}

export type TResult = IGetPeopleApiResponse | IGetPlanetsApiResponse | IGetStarshipsApiResponse | IGetVehiclesApiResponse;

export type TResultItem = IPeople | IPlanet | IStarship | IVehicle;

export interface IResultListItem {
    key: ECategory;
    value: TResult;
}
