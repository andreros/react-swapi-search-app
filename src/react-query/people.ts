import { IGetBaseItemParams, IGetBaseListParams } from '@/models/Base';
import { IGetPeopleApiResponse, IPeople } from '@/models/People';
import { getPeopleApi, getPersonApi } from '@/services/peopleService';

export const peopleKeys = {
    all: ['people'] as const,
    getPeopleQuery: (extraKeys: unknown[] = []) => [...peopleKeys.all, ...extraKeys] as const,
    getPersonQuery: (extraKeys: unknown[] = []) => [...peopleKeys.all, ...extraKeys] as const
};

export const getPeopleQuery = async (params?: IGetBaseListParams): Promise<IGetPeopleApiResponse> => {
    try {
        const response = await getPeopleApi(params);
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const getPersonQuery = async (params: IGetBaseItemParams): Promise<IPeople> => {
    try {
        const response = await getPersonApi(params);
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};
