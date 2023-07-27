import clsx from 'clsx';
import React from 'react';

import { ECategory, TResultItem } from '@/models/Base';
import { IPeople } from '@/models/People';
import { IPlanet } from '@/models/Planet';
import { IStarship } from '@/models/Starship';
import { IVehicle } from '@/models/Vehicle';
import { getFeaturingFilms } from '@/tools/tools';

export interface IResultItemCharacteristicsProps {
    className?: string;
    category: ECategory;
    resultItem: TResultItem;
}

export const ResultItemCharacteristics: React.FC<IResultItemCharacteristicsProps> = ({ className, category, resultItem }) => {
    const rootClasses = clsx('sw-result-item-characteristics', className);

    const getPeopleDetails = (): React.ReactElement => {
        const person = resultItem as IPeople;
        return (
            <>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Birth Year: </span>
                    <span className="sw-result-item-characteristics__value">{person.birth_year}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Gender: </span>
                    <span className="sw-result-item-characteristics__value">{person.gender}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Height: </span>
                    <span className="sw-result-item-characteristics__value">{person.height}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Mass: </span>
                    <span className="sw-result-item-characteristics__value">{person.mass}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Eye Color: </span>
                    <span className="sw-result-item-characteristics__value">{person.eye_color}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Hair Color: </span>
                    <span className="sw-result-item-characteristics__value">{person.hair_color}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Skin Color: </span>
                    <span className="sw-result-item-characteristics__value">{person.skin_color}</span>
                </div>
            </>
        );
    };

    const getPlanetDetails = (): React.ReactElement => {
        const planet = resultItem as IPlanet;
        return (
            <>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Diameter: </span>
                    <span className="sw-result-item-characteristics__value">{planet.diameter}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Terrain: </span>
                    <span className="sw-result-item-characteristics__value">{planet.terrain}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Climate: </span>
                    <span className="sw-result-item-characteristics__value">{planet.climate}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Gravity: </span>
                    <span className="sw-result-item-characteristics__value">{planet.gravity}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Population: </span>
                    <span className="sw-result-item-characteristics__value">{planet.population}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Orbital Period: </span>
                    <span className="sw-result-item-characteristics__value">{planet.orbital_period}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Rotation Period: </span>
                    <span className="sw-result-item-characteristics__value">{planet.rotation_period}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Surface Water: </span>
                    <span className="sw-result-item-characteristics__value">{planet.surface_water}</span>
                </div>
            </>
        );
    };

    const getStarshipDetails = (): React.ReactElement => {
        const starship = resultItem as IStarship;
        return (
            <>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Model: </span>
                    <span className="sw-result-item-characteristics__value">{starship.model}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Manufacturer: </span>
                    <span className="sw-result-item-characteristics__value">{starship.manufacturer}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Length: </span>
                    <span className="sw-result-item-characteristics__value">{starship.length}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Passengers: </span>
                    <span className="sw-result-item-characteristics__value">{starship.passengers}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Crew: </span>
                    <span className="sw-result-item-characteristics__value">{starship.crew}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Consumables: </span>
                    <span className="sw-result-item-characteristics__value">{starship.consumables}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Cargo Capacity: </span>
                    <span className="sw-result-item-characteristics__value">{starship.cargo_capacity}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Maximum Atmosphering Speed: </span>
                    <span className="sw-result-item-characteristics__value">{starship.max_atmosphering_speed}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Cost in Credits: </span>
                    <span className="sw-result-item-characteristics__value">{starship.cost_in_credits}</span>
                </div>
            </>
        );
    };

    const getVehicleDetails = (): React.ReactElement => {
        const vehicle = resultItem as IVehicle;
        return (
            <>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Model: </span>
                    <span className="sw-result-item-characteristics__value">{vehicle.model}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Manufacturer: </span>
                    <span className="sw-result-item-characteristics__value">{vehicle.manufacturer}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Class: </span>
                    <span className="sw-result-item-characteristics__value">{vehicle.vehicle_class}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Length: </span>
                    <span className="sw-result-item-characteristics__value">{vehicle.length}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Passengers: </span>
                    <span className="sw-result-item-characteristics__value">{vehicle.passengers}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Crew: </span>
                    <span className="sw-result-item-characteristics__value">{vehicle.crew}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Consumables: </span>
                    <span className="sw-result-item-characteristics__value">{vehicle.consumables}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Cargo Capacity: </span>
                    <span className="sw-result-item-characteristics__value">{vehicle.cargo_capacity}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Maximum Atmosphering Speed: </span>
                    <span className="sw-result-item-characteristics__value">{vehicle.max_atmosphering_speed}</span>
                </div>
                <div className="sw-result-item-characteristics__characteristic">
                    <span className="sw-result-item-characteristics__label">Cost in Credits: </span>
                    <span className="sw-result-item-characteristics__value">{vehicle.cost_in_credits}</span>
                </div>
            </>
        );
    };

    return (
        <div className={rootClasses}>
            {category === ECategory.PEOPLE && getPeopleDetails()}
            {category === ECategory.PLANETS && getPlanetDetails()}
            {category === ECategory.STARSHIPS && getStarshipDetails()}
            {category === ECategory.VEHICLES && getVehicleDetails()}
            <div className="sw-result-item-characteristics__characteristic">
                <span className="sw-result-item-characteristics__label">Featured in movies: </span>
                <span className="sw-result-item-characteristics__value">{getFeaturingFilms(resultItem)}</span>
            </div>
        </div>
    );
};
