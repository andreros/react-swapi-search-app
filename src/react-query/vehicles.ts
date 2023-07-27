import { IGetBaseItemParams, IGetBaseListParams } from '@/models/Base';
import { IGetVehiclesApiResponse, IVehicle } from '@/models/Vehicle';
import { getVehicleApi, getVehiclesApi } from '@/services/vehicleService';

export const vehicleKeys = {
    all: ['vehicles'] as const,
    getVehiclesQuery: (extraKeys: unknown[] = []) => [...vehicleKeys.all, ...extraKeys] as const,
    getVehicleQuery: (extraKeys: unknown[] = []) => [...vehicleKeys.all, ...extraKeys] as const
};

export const getVehiclesQuery = async (params?: IGetBaseListParams): Promise<IGetVehiclesApiResponse> => {
    try {
        const response = await getVehiclesApi(params);
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};

export const getVehicleQuery = async (params: IGetBaseItemParams): Promise<IVehicle> => {
    try {
        const response = await getVehicleApi(params);
        return response.data;
    } catch (error: unknown) {
        throw error;
    }
};
