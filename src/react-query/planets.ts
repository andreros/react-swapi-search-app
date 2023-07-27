import { IGetBaseItemParams, IGetBaseListParams } from '@/models/Base';
import { IGetPlanetsApiResponse, IPlanet } from '@/models/Planet';
import { getPlanetApi, getPlanetsApi } from '@/services/planetService';

export const planetKeys = {
    all: ['planets'] as const,
    getPlanetsQuery: (extraKeys: unknown[] = []) => [...planetKeys.all, ...extraKeys] as const,
    getPlanetQuery: (extraKeys: unknown[] = []) => [...planetKeys.all, ...extraKeys] as const
};

export const getPlanetsQuery = async (params?: IGetBaseListParams): Promise<IGetPlanetsApiResponse> => {
    try {
        const response = await getPlanetsApi(params);
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const getPlanetQuery = async (params: IGetBaseItemParams): Promise<IPlanet> => {
    try {
        const response = await getPlanetApi(params);
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};
