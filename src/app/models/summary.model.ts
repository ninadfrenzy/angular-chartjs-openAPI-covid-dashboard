import { Global } from './global.model';
import { CountryData } from './countryData.model';

export interface SummaryModel{
    Global: Global;
    Countries: Array<CountryData>;
    Date: Date;
}
