import clsx from 'clsx';
import React from 'react';
import { useParams } from 'react-router-dom';

import lightsaberImage from '@/assets/lightsaber.png';
import peopleLogo from '@/assets/people.png';
import planetsLogo from '@/assets/planets.png';
import starshipsLogo from '@/assets/starships.png';
import vehiclesLogo from '@/assets/vehicles.png';
import { NoResults } from '@/components/NoResults/NoResults';
import { ResultItemCharacteristics } from '@/components/ResultItemCharacteristics/ResultItemCharacteristics';
import { SearchingResults } from '@/components/SearchingResults/SearchingResults';
import { useResultItem } from '@/hooks/useResultItem';
import { ECategory } from '@/models/Base';

export interface IResultItemDetailsProps {
    className?: string;
}

export const ResultItemDetails: React.FC<IResultItemDetailsProps> = ({ className }) => {
    const params = useParams();
    const { category: resultCategory, id: resultId } = params;
    const category = resultCategory as ECategory;
    const id = Number.parseInt(resultId ?? '0');

    const { resultItem, isFetching, isLoading, isError } = useResultItem(category, id);

    const rootClasses = clsx('sw-result-item-details', className);

    if (isFetching || isLoading) return <SearchingResults />;

    if (!resultItem || isError) return <NoResults message="Looks like what you were searching for doesn't exist in the whole universe." bottomLine="May the force be with you!" />;

    return (
        <div className={rootClasses}>
            <div className="sw-result-item-details__title">
                {category === ECategory.PEOPLE && <img className="sw-result-item-details__category-logo" src={peopleLogo} alt="People category logo" />}
                {category === ECategory.PLANETS && <img className="sw-result-item-details__category-logo" src={planetsLogo} alt="Planets category logo" />}
                {category === ECategory.STARSHIPS && <img className="sw-result-item-details__category-logo" src={starshipsLogo} alt="Starships category logo" />}
                {category === ECategory.VEHICLES && <img className="sw-result-item-details__category-logo" src={vehiclesLogo} alt="Vehicles category logo" />}
                <div className="sw-result-item-details__title-text">
                    {category} - {resultItem.name}
                </div>
                <div className="sw-result-item-details__lightsaber">
                    <img src={lightsaberImage} alt="Lightsaber image" />
                </div>
            </div>
            <ResultItemCharacteristics category={category} resultItem={resultItem} />
        </div>
    );
};
