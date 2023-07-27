import { IResultListItem, TResultItem } from '@/models/Base';

/**
 * Function responsible for retrieving an environment variable declared in the .env file.
 * @param envVariable {string} The environment variable key.
 * @return {string | undefined} The environment variable, if the variable key exists. `undefined` otherwise.
 */
export const getEnvironmentVariables = (envVariable: string): string | undefined => {
    return process.env[envVariable];
};

/**
 * Function responsible for extracting the id from an item URL.
 * @param itemUrl {string} The item URL.
 * @return {number} The item ID, 0 otherwise.
 */
export const getIdFromUrl = (itemUrl: string): number => {
    const tokens = itemUrl.split('/');
    if (tokens.length > 2) return Number.parseInt(tokens[tokens.length - 2]);
    return 0;
};

/**
 * Function responsible for returning the featuring movies of a given item.
 * @param item {TResultItem | null} A given result item.
 * @return {string} The featuring films list, separated by commas.
 */
export const getFeaturingFilms = (item?: TResultItem | null): string => {
    let response = '';
    if (!item || item.films.length === 0) return 'none';
    item.films.forEach((it) => (response += `${getIdFromUrl(it)}, `));
    return response.substring(0, response.length - 2);
};

/**
 * Function responsible for sorting a list of results by total results descendingly.
 * @param results {IResultListItem[]} The unordered results list.
 * @return {IResultListItem[]} The ordered results list.
 */
export const sortSearchResults = (results: IResultListItem[]): IResultListItem[] => {
    // custom sort function to sort the results array by total results (count) descendingly.
    const compareFn = (resultA: IResultListItem, resultB: IResultListItem) => {
        if (resultA.value.count < resultB.value.count) return 1;
        if (resultA.value.count > resultB.value.count) return -1;
        return 0;
    };
    return results.sort(compareFn);
};
