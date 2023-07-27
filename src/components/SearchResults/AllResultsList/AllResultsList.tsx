import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import React, { Fragment } from 'react';
import { useSearchParams } from 'react-router-dom';

import lightsaberImage from '@/assets/lightsaber.png';
import peopleLogo from '@/assets/people.png';
import planetsLogo from '@/assets/planets.png';
import starshipsLogo from '@/assets/starships.png';
import vehiclesLogo from '@/assets/vehicles.png';
import { NoResults } from '@/components/NoResults/NoResults';
import { ResultItem } from '@/components/ResultItem/ResultItem';
import { SearchingResults } from '@/components/SearchingResults/SearchingResults';
import { ECategory, IResultListItem } from '@/models/Base';
import { getPeopleQuery, peopleKeys } from '@/react-query/people';
import { getPlanetsQuery, planetKeys } from '@/react-query/planets';
import { getStarshipsQuery, starshipKeys } from '@/react-query/starships';
import { getVehiclesQuery, vehicleKeys } from '@/react-query/vehicles';
import { sortSearchResults } from '@/tools/tools';

export interface IAllResultsListProps {
    className?: string;
}

export const AllResultsList: React.FC<IAllResultsListProps> = ({ className }) => {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('search') ?? '';
    let results: IResultListItem[] = [];

    const {
        data: people,
        isFetching: isFetchingPeople,
        isLoading: isLoadingPeople,
        isError: isErrorPeople
    } = useQuery({
        queryKey: peopleKeys.getPeopleQuery([{ search: searchTerm }]),
        queryFn: () => getPeopleQuery({ search: searchTerm }),
        refetchOnWindowFocus: false
    });

    const {
        data: planets,
        isFetching: isFetchingPlanets,
        isLoading: isLoadingPlanets,
        isError: isErrorPlanets
    } = useQuery({
        queryKey: planetKeys.getPlanetsQuery([{ search: searchTerm }]),
        queryFn: () => getPlanetsQuery({ search: searchTerm }),
        refetchOnWindowFocus: false
    });

    const {
        data: starships,
        isFetching: isFetchingStarships,
        isLoading: isLoadingStarships,
        isError: isErrorStarships
    } = useQuery({
        queryKey: starshipKeys.getStarshipsQuery([{ search: searchTerm }]),
        queryFn: () => getStarshipsQuery({ search: searchTerm }),
        refetchOnWindowFocus: false
    });

    const {
        data: vehicles,
        isFetching: isFetchingVehicles,
        isLoading: isLoadingVehicles,
        isError: isErrorVehicles
    } = useQuery({
        queryKey: vehicleKeys.getVehiclesQuery([{ search: searchTerm }]),
        queryFn: () => getVehiclesQuery({ search: searchTerm }),
        refetchOnWindowFocus: false
    });

    const isLoading = (): boolean => {
        return isFetchingPeople || isLoadingPeople || isFetchingPlanets || isLoadingPlanets || isFetchingStarships || isLoadingStarships || isFetchingVehicles || isLoadingVehicles;
    };

    const isError = (): boolean => {
        return isErrorPeople || isErrorPlanets || isErrorStarships || isErrorVehicles;
    };

    const hasResults = (): boolean => {
        let hasResults = false;
        results.forEach((result) => {
            if (result.value.count > 0) hasResults = true;
        });
        return hasResults;
    };

    const rootClasses = clsx('sw-all-results-list', className);

    if (!isLoading() && !isError()) {
        results.push({ key: ECategory.PEOPLE, value: people! });
        results.push({ key: ECategory.PLANETS, value: planets! });
        results.push({ key: ECategory.STARSHIPS, value: starships! });
        results.push({ key: ECategory.VEHICLES, value: vehicles! });
        results = sortSearchResults(results);
    }

    return (
        <div className={rootClasses}>
            {isLoading() && <SearchingResults />}

            {!isLoading() && (!hasResults() || isError()) && (
                <NoResults message="There is nothing matching the term you searched for in the whole universe." bottomLine="May you find all you need within yourself!" />
            )}

            {!isLoading() &&
                results.map((result, index) => {
                    return (
                        <Fragment key={`result-${index}`}>
                            {result.value.results.length > 0 && (
                                <>
                                    <div className="sw-all-results-list__category-title">
                                        {result.key === ECategory.PEOPLE && <img className="sw-all-results-list__category-logo" src={peopleLogo} alt="People category logo" />}
                                        {result.key === ECategory.PLANETS && <img className="sw-all-results-list__category-logo" src={planetsLogo} alt="Planets category logo" />}
                                        {result.key === ECategory.STARSHIPS && <img className="sw-all-results-list__category-logo" src={starshipsLogo} alt="Starships category logo" />}
                                        {result.key === ECategory.VEHICLES && <img className="sw-all-results-list__category-logo" src={vehiclesLogo} alt="Vehicles category logo" />}
                                        {result.key}
                                        <div className="sw-all-results-list__lightsaber">
                                            <img src={lightsaberImage} alt="Lightsaber image" />
                                        </div>
                                    </div>
                                    <div className="sw-all-results-list__category-group">
                                        {result.value.results.map((resultItem) => (
                                            <ResultItem key={resultItem.url} resultItem={resultItem} category={result.key} />
                                        ))}
                                    </div>
                                </>
                            )}
                        </Fragment>
                    );
                })}
        </div>
    );
};
