export interface Film {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  poster: string;
  producer: string;
  release_date: string;
  characters: number[];
  planets: number[];
  starships: number[];
  vehicles: number[];
  species: number[];
  planetList?: Planet[];
  id: number;
}

export interface Planet {
  name: string;
  rotation_period: string;
  orbital_period: string;
  diameter: string;
  climate: string;
  gravity: string;
  terrain: string;
  surface_water: string;
  population: string;
  photo: string;
  residents: number[];
  films: number[];
  id: number;
}
