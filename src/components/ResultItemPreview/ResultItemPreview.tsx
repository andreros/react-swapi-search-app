import clsx from 'clsx';
import React from 'react';

import lightsaberImage from '@/assets/lightsaber.png';
import peopleLogo from '@/assets/people.png';
import planetsLogo from '@/assets/planets.png';
import starshipsLogo from '@/assets/starships.png';
import vehiclesLogo from '@/assets/vehicles.png';
import { ResultItemCharacteristics } from '@/components/ResultItemCharacteristics/ResultItemCharacteristics';
import { useResultItem } from '@/hooks/useResultItem';
import { ECategory } from '@/models/Base';

export interface IResultItemDetailsProps {
    className?: string;
    category: ECategory;
    id: number;
}

export const ResultItemPreview: React.FC<IResultItemDetailsProps> = ({ className, category, id }) => {
    const { resultItem, isFetching, isLoading, isError } = useResultItem(category, id);

    const rootClasses = clsx('sw-result-item-preview', className);

    if (!resultItem || isFetching || isLoading || isError) return <></>;

    return (
        <div className={rootClasses}>
            <div className="sw-result-item-preview__title">
                {category === ECategory.PEOPLE && <img className="sw-result-item-preview__category-logo" src={peopleLogo} alt="People category logo" />}
                {category === ECategory.PLANETS && <img className="sw-result-item-preview__category-logo" src={planetsLogo} alt="Planets category logo" />}
                {category === ECategory.STARSHIPS && <img className="sw-result-item-preview__category-logo" src={starshipsLogo} alt="Starships category logo" />}
                {category === ECategory.VEHICLES && <img className="sw-result-item-preview__category-logo" src={vehiclesLogo} alt="Vehicles category logo" />}
                <div className="sw-result-item-preview__title-text">{resultItem.name}</div>
                <div className="sw-result-item-preview__lightsaber">
                    <img src={lightsaberImage} alt="Lightsaber image" />
                </div>
            </div>
            <ResultItemCharacteristics category={category} resultItem={resultItem} />
        </div>
    );
};
