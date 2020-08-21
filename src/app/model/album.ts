import { Artist } from './artist';

export interface Album {
    _id: string,
    title: string,
    artist?: Artist,
    artistId?: string,
    coverUrl: string,
    year: number,
    genre: string
}