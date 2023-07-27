import clsx from 'clsx';
import React from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { ECategory, TResultItem } from '@/models/Base';
import { getFeaturingFilms, getIdFromUrl } from '@/tools/tools';

export interface IResultItemProps {
    className?: string;
    resultItem: TResultItem;
    category: ECategory;
}

export interface IResultItemMouseEvent {
    category: ECategory;
    id: number;
}

export enum EResultItemEvents {
    MOUSEOVER = 'onResultItemMouseOver',
    MOUSEOUT = 'onResultItemMouseOut'
}

export const ResultItem: React.FC<IResultItemProps> = ({ className, resultItem, category }) => {
    const [searchParams] = useSearchParams();
    const id = getIdFromUrl(resultItem.url);
    const mouseOverEvent = new CustomEvent<IResultItemMouseEvent>(EResultItemEvents.MOUSEOVER, {
        detail: {
            category,
            id
        }
    });
    const mouseOutEvent = new CustomEvent<IResultItemMouseEvent>(EResultItemEvents.MOUSEOUT, {
        detail: {
            category,
            id
        }
    });

    const handleItemMouseOver = () => document.dispatchEvent(mouseOverEvent);

    const handleItemMouseOut = () => document.dispatchEvent(mouseOutEvent);

    const rootClasses = clsx('sw-result-item', className);

    return (
        <div className={rootClasses} onClick={handleItemMouseOut}>
            <Link
                className="sw-result-item__anchor"
                to={`/${category}/${id}/?search=${searchParams.get('search')}&category=${searchParams.get('category')}`}
                onMouseOver={handleItemMouseOver}
                onMouseOut={handleItemMouseOut}>
                {resultItem.name} (appears in movies: {getFeaturingFilms(resultItem)})
            </Link>
        </div>
    );
};
