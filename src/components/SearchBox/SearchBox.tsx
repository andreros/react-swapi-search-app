import clsx from 'clsx';
import React, { ChangeEvent, KeyboardEvent, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';

import { ECategory } from '@/models/Base';

export interface ISearchBoxProps {
    className?: string;
}

export const SearchBox: React.FC<ISearchBoxProps> = ({ className }) => {
    const params = useParams();
    const { id } = params;
    const formRef = React.createRef<HTMLFormElement>();
    const [searchParams, setSearchParams] = useSearchParams();
    const [searchTerm, setSearchTerm] = useState(searchParams.get('search') ?? '');

    /**
     * Form key down event handler, responsible for validating the search term before submitting the form.
     * @param e {KeyboardEvent} Keyboard event.
     */
    const handleFormKeyDown = (e: KeyboardEvent) => {
        const searchTerm = formRef.current?.search.value.trim();
        if (searchTerm === '' && e.key === 'Enter') e.preventDefault();
        if (e.key === 'Enter') {
            e.preventDefault();
            triggerSearch();
        }
    };

    /**
     * Change event handler for the search input element.
     * @param e {ChangeEvent<HTMLInputElement>} Change event.
     */
    const handleSearchInputOnChange = (e: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target?.value);
    };

    /**
     * Method responsible for triggering a new search.
     */
    const triggerSearch = () => {
        const searchTerm = formRef.current?.search.value.trim();
        const category = formRef.current?.category.value as ECategory;

        if (!searchTerm || searchTerm === '') return;

        if (id) window.location.href = `/?search=${searchTerm}&category=${category}`;
        setSearchParams({ search: searchTerm, category });
    };

    const isCategoryChecked = (category: ECategory) => searchParams.get('category') === category;

    const rootClasses = clsx('sw-search-box', className);

    return (
        <form className={rootClasses} ref={formRef} onKeyDown={handleFormKeyDown}>
            <div className="sw-search-box__search-input-group">
                <input className="sw-search-box__search-input" type="text" name="search" placeholder="i.e.: luke skywalker" value={searchTerm} onChange={handleSearchInputOnChange} />
                <button className="sw-search-box__search-button" type="button" onClick={triggerSearch}>
                    Search
                </button>
            </div>
            <div className="sw-search-box__category-radio-group">
                <div className="sw-search-box__category-radio-button">
                    <input type="radio" id="search-category-all" name="category" value={ECategory.ALL} defaultChecked />
                    <label htmlFor="search-category-all">All</label>
                </div>
                <div className="sw-search-box__category-radio-button">
                    <input type="radio" id="search-category-people" name="category" value={ECategory.PEOPLE} defaultChecked={isCategoryChecked(ECategory.PEOPLE)} />
                    <label htmlFor="search-category-people">People</label>
                </div>
                <div className="sw-search-box__category-radio-button">
                    <input type="radio" id="search-category-planets" name="category" value={ECategory.PLANETS} defaultChecked={isCategoryChecked(ECategory.PLANETS)} />
                    <label htmlFor="search-category-planets">Planets</label>
                </div>
                <div className="sw-search-box__category-radio-button">
                    <input type="radio" id="search-category-starships" name="category" value={ECategory.STARSHIPS} defaultChecked={isCategoryChecked(ECategory.STARSHIPS)} />
                    <label htmlFor="search-category-starships">Starships</label>
                </div>
                <div className="sw-search-box__category-radio-button">
                    <input type="radio" id="search-category-vehicles" name="category" value={ECategory.VEHICLES} defaultChecked={isCategoryChecked(ECategory.VEHICLES)} />
                    <label htmlFor="search-category-vehicles">Vehicles</label>
                </div>
            </div>
        </form>
    );
};
