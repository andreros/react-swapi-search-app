import clsx from 'clsx';
import React from 'react';

import yodaImage from '@/assets/yoda.png';

export interface INoResultsProps {
    className?: string;
    message: string;
    bottomLine: string;
}

export const NoResults: React.FC<INoResultsProps> = ({ className, message, bottomLine }) => {
    const rootClasses = clsx('sw-no-results', className);

    return (
        <div className={rootClasses}>
            <img className="sw-no-results__image" src={yodaImage} alt="Yoda Jedi Master image" />
            Sorry we are, young padawan!
            <br />
            {message}
            <br />
            {bottomLine}
        </div>
    );
};
