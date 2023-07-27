import clsx from 'clsx';
import React from 'react';
import { useSearchParams } from 'react-router-dom';

import yodaImage from '@/assets/yoda.png';

export interface INoResultsProps {
    className?: string;
}

export const SearchingResults: React.FC<INoResultsProps> = ({ className }) => {
    const [searchParams] = useSearchParams();

    const rootClasses = clsx('sw-searching-results', className);

    return (
        <div className={rootClasses}>
            <img className="sw-searching-results__image" src={yodaImage} alt="Yoda Jedi Master image" />
            Searching the whole universe for "{searchParams.get('search')}" ...
        </div>
    );
};
