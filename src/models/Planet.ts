import { IGetBaseListApiResponse } from '@/models/Base';

export interface IPlanet {
    name: string;
    diameter: string;
    rotation_period: string;
    orbital_period: string;
    gravity: string;
    population: string;
    climate: string;
    terrain: string;
    surface_water: string;
    residents: string[];
    films: string[];
    url: string;
}

export interface IGetPlanetsApiResponse extends IGetBaseListApiResponse {
    results: IPlanet[];
}

