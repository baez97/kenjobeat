import { Album } from './Album';

export interface Artist {
    _id: string,
    name: string,
    photoUrl: string,
    birthdate: string,
    deathdate: string,
    albums?: Array<Album>
}