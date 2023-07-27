import { AxiosPromise } from 'axios';

import { IGetBaseItemParams, IGetBaseListParams } from '@/models/Base';
import { IGetPeopleApiResponse, IPeople } from '@/models/People';
import { api } from '@/services/api';

export const getPeopleApi = (params?: IGetBaseListParams): AxiosPromise<IGetPeopleApiResponse> => {
    const { page = 1, search } = params || {};
    return api({ method: 'get', url: '/people', params: { page, search } });
};

export const getPersonApi = (params: IGetBaseItemParams): AxiosPromise<IPeople> => {
    const { id } = params;
    return api({ method: 'get', url: `/people/${id}` });
};
