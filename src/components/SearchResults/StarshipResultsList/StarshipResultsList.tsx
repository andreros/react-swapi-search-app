import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

import lightsaberImage from '@/assets/lightsaber.png';
import starshipsLogo from '@/assets/starships.png';
import { NoResults } from '@/components/NoResults/NoResults';
import { ResultItem } from '@/components/ResultItem/ResultItem';
import { SearchingResults } from '@/components/SearchingResults/SearchingResults';
import { ECategory } from '@/models/Base';
import { getStarshipsQuery, starshipKeys } from '@/react-query/starships';

export interface IStarshipResultsListProps {
    className?: string;
}

export const StarshipResultsList: React.FC<IStarshipResultsListProps> = ({ className }) => {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('search') ?? '';

    const {
        data: starships,
        isFetching,
        isLoading,
        isError
    } = useQuery({
        queryKey: starshipKeys.getStarshipsQuery([{ search: searchTerm }]),
        queryFn: () => getStarshipsQuery({ search: searchTerm }),
        refetchOnWindowFocus: false
    });

    const rootClasses = clsx('sw-starship-results-list', className);

    return (
        <div className={rootClasses}>
            {(isFetching || isLoading) && <SearchingResults />}

            {!isFetching && !isLoading && (starships?.results.length === 0 || isError) && <NoResults message="There is no starship matching the term you searched for." bottomLine="Itchin' a ride?" />}

            {!isFetching && !isLoading && !!starships?.results.length && starships?.results.length > 0 && (
                <>
                    <div className="sw-starship-results-list__category-title">
                        <img className="sw-starship-results-list__category-logo" src={starshipsLogo} alt="Starships category logo" />
                        Starships
                        <div className="sw-starship-results-list__lightsaber">
                            <img src={lightsaberImage} alt="Lightsaber image" />
                        </div>
                    </div>
                    <div className="sw-starship-results-list__category-group">
                        {starships?.results.map((starship) => {
                            return <ResultItem key={starship.url} resultItem={starship} category={ECategory.STARSHIPS} />;
                        })}
                    </div>
                </>
            )}
        </div>
    );
};
