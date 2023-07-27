import { IGetBaseItemParams, IGetBaseListParams } from '@/models/Base';
import { IGetStarshipsApiResponse, IStarship } from '@/models/Starship';
import { getStarshipApi, getStarshipsApi } from '@/services/starshipService';

export const starshipKeys = {
    all: ['starships'] as const,
    getStarshipsQuery: (extraKeys: unknown[] = []) => [...starshipKeys.all, ...extraKeys] as const,
    getStarshipQuery: (extraKeys: unknown[] = []) => [...starshipKeys.all, ...extraKeys] as const
};

export const getStarshipsQuery = async (params?: IGetBaseListParams): Promise<IGetStarshipsApiResponse> => {
    try {
        const response = await getStarshipsApi(params);
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const getStarshipQuery = async (params: IGetBaseItemParams): Promise<IStarship> => {
    try {
        const response = await getStarshipApi(params);
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};
