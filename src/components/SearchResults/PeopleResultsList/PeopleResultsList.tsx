import { useQuery } from '@tanstack/react-query';
import clsx from 'clsx';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

import lightsaberImage from '@/assets/lightsaber.png';
import peopleLogo from '@/assets/people.png';
import { NoResults } from '@/components/NoResults/NoResults';
import { ResultItem } from '@/components/ResultItem/ResultItem';
import { SearchingResults } from '@/components/SearchingResults/SearchingResults';
import { ECategory } from '@/models/Base';
import { getPeopleQuery, peopleKeys } from '@/react-query/people';

export interface IPeopleResultsListProps {
    className?: string;
}

export const PeopleResultsList: React.FC<IPeopleResultsListProps> = ({ className }) => {
    const [searchParams] = useSearchParams();
    const searchTerm = searchParams.get('search') ?? '';

    const {
        data: people,
        isFetching,
        isLoading,
        isError
    } = useQuery({
        queryKey: peopleKeys.getPeopleQuery([{ search: searchTerm }]),
        queryFn: () => getPeopleQuery({ search: searchTerm }),
        refetchOnWindowFocus: false
    });

    const rootClasses = clsx('sw-people-results-list', className);

    return (
        <div className={rootClasses}>
            {(isFetching || isLoading) && <SearchingResults />}

            {!isFetching && !isLoading && (people?.results.length === 0 || isError) && (
                <NoResults message="There is no one matching the term you searched for in the whole galaxy." bottomLine="May the force be with you!" />
            )}

            {!isFetching && !isLoading && !!people?.results.length && people?.results.length > 0 && (
                <>
                    <div className="sw-people-results-list__category-title">
                        <img className="sw-people-results-list__category-logo" src={peopleLogo} alt="People category logo" />
                        People
                        <div className="sw-people-results-list__lightsaber">
                            <img src={lightsaberImage} alt="Lightsaber image" />
                        </div>
                    </div>
                    <div className="sw-people-results-list__category-group">
                        {people?.results.map((people) => {
                            return <ResultItem key={people.url} resultItem={people} category={ECategory.PEOPLE} />;
                        })}
                    </div>
                </>
            )}
        </div>
    );
};
