import React from 'react';
import { ECategory, TResultItem } from '@/models/Base';
import { useQuery } from '@tanstack/react-query';
import { getPersonQuery, peopleKeys } from '@/react-query/people';
import { getPlanetQuery, planetKeys } from '@/react-query/planets';
import { getStarshipQuery, starshipKeys } from '@/react-query/starships';
import { getVehicleQuery, vehicleKeys } from '@/react-query/vehicles';

export interface IUseResultItem {
    resultItem: TResultItem | null;
    isFetching: boolean;
    isLoading: boolean;
    isError: boolean;
}

export const useResultItem = (category: ECategory, id: number): IUseResultItem => {
    let resultItem: TResultItem | null = null;
    let isFetching = false;
    let isLoading = false;
    let isError = false;

    switch (category) {
        case ECategory.PEOPLE:
            const {
                data: people,
                isFetching: isFetchingPeople,
                isLoading: isLoadingPeople,
                isError: isErrorPeople
            } = useQuery({
                queryKey: peopleKeys.getPersonQuery([{ id }]),
                queryFn: () => getPersonQuery({ id }),
                refetchOnWindowFocus: false
            });
            if (people) resultItem = people;
            isFetching = isFetchingPeople;
            isLoading = isLoadingPeople;
            isError = isErrorPeople;
            break;
        case ECategory.PLANETS:
            const {
                data: planet,
                isFetching: isFetchingPlanet,
                isLoading: isLoadingPlanet,
                isError: isErrorPlanet
            } = useQuery({
                queryKey: planetKeys.getPlanetQuery([{ id }]),
                queryFn: () => getPlanetQuery({ id }),
                refetchOnWindowFocus: false
            });
            if (planet) resultItem = planet;
            isFetching = isFetchingPlanet;
            isLoading = isLoadingPlanet;
            isError = isErrorPlanet;
            break;
        case ECategory.STARSHIPS:
            const {
                data: starship,
                isFetching: isFetchingStarship,
                isLoading: isLoadingStarship,
                isError: isErrorStarship
            } = useQuery({
                queryKey: starshipKeys.getStarshipQuery([{ id }]),
                queryFn: () => getStarshipQuery({ id }),
                refetchOnWindowFocus: false
            });
            if (starship) resultItem = starship;
            isFetching = isFetchingStarship;
            isLoading = isLoadingStarship;
            isError = isErrorStarship;
            break;
        case ECategory.VEHICLES:
            const {
                data: vehicle,
                isFetching: isFetchingVehicle,
                isLoading: isLoadingVehicle,
                isError: isErrorVehicle
            } = useQuery({
                queryKey: vehicleKeys.getVehicleQuery([{ id }]),
                queryFn: () => getVehicleQuery({ id }),
                refetchOnWindowFocus: false
            });
            if (vehicle) resultItem = vehicle;
            isFetching = isFetchingVehicle;
            isLoading = isLoadingVehicle;
            isError = isErrorVehicle;
            break;
    }

    return { resultItem, isFetching, isLoading, isError };
};
