import { AxiosPromise } from 'axios';

import { IGetBaseItemParams, IGetBaseListParams } from '@/models/Base';
import { IGetStarshipsApiResponse, IStarship } from '@/models/Starship';
import { api } from '@/services/api';

export const getStarshipsApi = (params?: IGetBaseListParams): AxiosPromise<IGetStarshipsApiResponse> => {
    const { page = 1, search } = params || {};
    return api({ method: 'get', url: '/starships', params: { page, search } });
};

export const getStarshipApi = (params: IGetBaseItemParams): AxiosPromise<IStarship> => {
    const { id } = params;
    return api({ method: 'get', url: `/starships/${id}` });
};
