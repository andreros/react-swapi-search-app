import { AxiosPromise } from 'axios';

import { IGetBaseItemParams, IGetBaseListParams } from '@/models/Base';
import { IGetVehiclesApiResponse, IVehicle } from '@/models/Vehicle';
import { api } from '@/services/api';

export const getVehiclesApi = (params?: IGetBaseListParams): AxiosPromise<IGetVehiclesApiResponse> => {
    const { page = 1, search } = params || {};
    return api({ method: 'get', url: '/vehicles', params: { page, search } });
};

export const getVehicleApi = (params: IGetBaseItemParams): AxiosPromise<IVehicle> => {
    const { id } = params;
    return api({ method: 'get', url: `/vehicles/${id}` });
};
