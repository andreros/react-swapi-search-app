import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

import lightsaberImage from '@/assets/lightsaber.png';
import vehiclesLogo from '@/assets/vehicles.png';
import { NoResults } from '@/components/NoResults/NoResults';
import { ResultItem } from '@/components/ResultItem/ResultItem';
import { SearchingResults } from '@/components/SearchingResults/SearchingResults';
import { ECategory } from '@/models/Base';
import { getVehiclesQuery, vehicleKeys } from '@/react-query/vehicles';

export interface IVehicleResultsListProps {
    className?: string;
}

export const VehicleResultsList: React.FC<IVehicleResultsListProps> = ({ className }) => {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('search') ?? '';

    const {
        data: vehicles,
        isFetching,
        isLoading,
        isError
    } = useQuery({
        queryKey: vehicleKeys.getVehiclesQuery([{ search: searchTerm }]),
        queryFn: () => getVehiclesQuery({ search: searchTerm }),
        refetchOnWindowFocus: false
    });

    const rootClasses = clsx('sw-vehicle-results-list', className);

    return (
        <div className={rootClasses}>
            {(isFetching || isLoading) && <SearchingResults />}

            {!isFetching && !isLoading && (vehicles?.results.length === 0 || isError) && (
                <NoResults message="There is no vehicle matching the term you searched for." bottomLine="Looks like you're on foot!" />
            )}

            {!isFetching && !isLoading && !!vehicles?.results.length && vehicles?.results.length > 0 && (
                <>
                    <div className="sw-vehicle-results-list__category-title">
                        <img className="sw-vehicle-results-list__category-logo" src={vehiclesLogo} alt="Vehicles category logo" />
                        Vehicles
                        <div className="sw-vehicle-results-list__lightsaber">
                            <img src={lightsaberImage} alt="Lightsaber image" />
                        </div>
                    </div>
                    <div className="sw-vehicle-results-list__category-group">
                        {vehicles?.results.map((vehicle) => {
                            return <ResultItem key={vehicle.url} resultItem={vehicle} category={ECategory.VEHICLES} />;
                        })}
                    </div>
                </>
            )}
        </div>
    );
};
