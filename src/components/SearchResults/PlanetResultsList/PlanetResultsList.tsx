import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

import lightsaberImage from '@/assets/lightsaber.png';
import planetsLogo from '@/assets/planets.png';
import { NoResults } from '@/components/NoResults/NoResults';
import { ResultItem } from '@/components/ResultItem/ResultItem';
import { SearchingResults } from '@/components/SearchingResults/SearchingResults';
import { ECategory } from '@/models/Base';
import { getPlanetsQuery, planetKeys } from '@/react-query/planets';

export interface IPlanetResultsListProps {
    className?: string;
}

export const PlanetResultsList: React.FC<IPlanetResultsListProps> = ({ className }) => {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('search') ?? '';

    const {
        data: planets,
        isFetching,
        isLoading,
        isError
    } = useQuery({
        queryKey: planetKeys.getPlanetsQuery([{ search: searchTerm }]),
        queryFn: () => getPlanetsQuery({ search: searchTerm }),
        refetchOnWindowFocus: false
    });

    const rootClasses = clsx('sw-planet-results-list', className);

    return (
        <div className={rootClasses}>
            {(isFetching || isLoading) && <SearchingResults />}

            {!isFetching && !isLoading && (planets?.results.length === 0 || isError) && (
                <NoResults message="There is no planet matching the term you searched for in this or any far away galaxy." bottomLine="May the force be with you!" />
            )}

            {!isFetching && !isLoading && !!planets?.results.length && planets?.results.length > 0 && (
                <>
                    <div className="sw-planet-results-list__category-title">
                        <img className="sw-planet-results-list__category-logo" src={planetsLogo} alt="Planets category logo" />
                        Planets
                        <div className="sw-planet-results-list__lightsaber">
                            <img src={lightsaberImage} alt="Lightsaber image" />
                        </div>
                    </div>
                    <div className="sw-planet-results-list__category-group">
                        {planets?.results.map((planet) => {
                            return <ResultItem key={planet.url} resultItem={planet} category={ECategory.PLANETS} />;
                        })}
                    </div>
                </>
            )}
        </div>
    );
};
