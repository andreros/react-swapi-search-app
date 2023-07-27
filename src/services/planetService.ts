import { AxiosPromise } from 'axios';

import { IGetBaseItemParams, IGetBaseListParams } from '@/models/Base';
import { IGetPlanetsApiResponse, IPlanet } from '@/models/Planet';
import { api } from '@/services/api';

export const getPlanetsApi = (params?: IGetBaseListParams): AxiosPromise<IGetPlanetsApiResponse> => {
    const { page = 1, search } = params || {};
    return api({ method: 'get', url: '/planets', params: { page, search } });
};

export const getPlanetApi = (params: IGetBaseItemParams): AxiosPromise<IPlanet> => {
    const { id } = params;
    return api({ method: 'get', url: `/planets/${id}` });
};
