import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom';

import { EResultItemEvents, IResultItemMouseEvent } from '@/components/ResultItem/ResultItem';
import { ResultItemDetails } from '@/components/ResultItemDetails/ResultItemDetails';
import { ResultItemPreview } from '@/components/ResultItemPreview/ResultItemPreview';
import { SearchBox } from '@/components/SearchBox/SearchBox';
import { AllResultsList } from '@/components/SearchResults/AllResultsList/AllResultsList';
import { PeopleResultsList } from '@/components/SearchResults/PeopleResultsList/PeopleResultsList';
import { PlanetResultsList } from '@/components/SearchResults/PlanetResultsList/PlanetResultsList';
import { StarshipResultsList } from '@/components/SearchResults/StarshipResultsList/StarshipResultsList';
import { VehicleResultsList } from '@/components/SearchResults/VehicleResultsList/VehicleResultsList';
import { ECategory } from '@/models/Base';

export interface ISearchPageProps {
    className?: string;
}

const SearchPage: React.FC<ISearchPageProps> = ({ className }) => {
    const params = useParams();
    const { category, id } = params;
    const [searchParams] = useSearchParams();

    const [resultItemCategory, setResultItemCategory] = useState<ECategory | null>(null);
    const [resultItemId, setResultItemId] = useState<number | null>(null);

    const hasParams = (): boolean => !!category && !!id;

    const hasSearchParams = (): boolean => searchParams.size > 0;

    const isCategoryChecked = (category: ECategory) => searchParams.get('category') === category;

    const onResultItemMouseOver = (event: Event) => {
        const resultItemMouseEvent = event as CustomEvent<IResultItemMouseEvent>;
        setResultItemCategory(resultItemMouseEvent.detail.category);
        setResultItemId(resultItemMouseEvent.detail.id);
    };

    const onResultItemMouseOut = (event: Event) => {
        setResultItemCategory(null);
        setResultItemId(null);
    };

    useEffect(() => {
        document.addEventListener(EResultItemEvents.MOUSEOVER, onResultItemMouseOver);
        document.addEventListener(EResultItemEvents.MOUSEOUT, onResultItemMouseOut);

        return () => {
            document.removeEventListener(EResultItemEvents.MOUSEOVER, onResultItemMouseOver);
            document.removeEventListener(EResultItemEvents.MOUSEOUT, onResultItemMouseOut);
        };
    }, []);

    const rootClasses = clsx('sw-search-page', { 'sw-is-searching': hasParams() || hasSearchParams() }, className);

    return (
        <div className={rootClasses}>
            {resultItemCategory && resultItemId && (
                <div className="sw-search-page__result-item-preview">
                    <ResultItemPreview category={resultItemCategory} id={resultItemId} />
                </div>
            )}
            <div className="sw-search-page__search-container">
                <SearchBox />
            </div>
            {!hasParams() && hasSearchParams() && (
                <div className="sw-search-page__search-results">
                    {isCategoryChecked(ECategory.ALL) && <AllResultsList />}
                    {isCategoryChecked(ECategory.PEOPLE) && <PeopleResultsList />}
                    {isCategoryChecked(ECategory.PLANETS) && <PlanetResultsList />}
                    {isCategoryChecked(ECategory.STARSHIPS) && <StarshipResultsList />}
                    {isCategoryChecked(ECategory.VEHICLES) && <VehicleResultsList />}
                </div>
            )}
            {hasParams() && (
                <div className="sw-search-page__result-item-details">
                    <Link className="sw-search-page__back-to-search" to={`/?search=${searchParams.get('search') ?? ''}&category=${searchParams.get('category') ?? ECategory.ALL}`}>
                        {`<< Back to search results`}
                    </Link>
                    <ResultItemDetails />
                </div>
            )}
        </div>
    );
};

export default SearchPage;
