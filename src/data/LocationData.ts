import { LocationType } from '../enums/LocationType.ts';
import { Location } from '../types/Location.ts';

export const LOCATION_DATA: Location[] = [
  { id: LocationType.LIMSA_LOMINSA_UPPER_DECKS, name: 'Limsa Lominsa Upper Decks' },
  { id: LocationType.LIMSA_LOMINSA_LOWER_DECKS, name: 'Limsa Lominsa Lower Decks' },
  { id: LocationType.MIDDLE_LA_NOSCEA, name: 'Middle La Noscea' },
  { id: LocationType.LOWER_LA_NOSCEA, name: 'Lower La Noscea' },
  { id: LocationType.EASTERN_LA_NOSCEA, name: 'Eastern La Noscea' },
  { id: LocationType.WESTERN_LA_NOSCEA, name: 'Western La Noscea' },
  { id: LocationType.UPPER_LA_NOSCEA, name: 'Upper La Noscea' },
  { id: LocationType.OUTER_LA_NOSCEA, name: 'Outer La Noscea' },
  { id: LocationType.MIST, name: 'Mist' },
  { id: LocationType.NEW_GRIDANIA, name: 'New Gridania' },
  { id: LocationType.OLD_GRIDANIA, name: 'Old Gridania' },
  { id: LocationType.CENTRAL_SHROUD, name: 'Central Shroud' },
  { id: LocationType.EAST_SHROUD, name: 'East Shroud' },
  { id: LocationType.SOUTH_SHROUD, name: 'South Shroud' },
  { id: LocationType.NORTH_SHROUD, name: 'North Shroud' },
  { id: LocationType.THE_LAVENDER_BEDS, name: 'The Lavender Beds' },
  { id: LocationType.ULDAH_STEPS_OF_NALD, name: "Ul'dah - Steps of Nald" },
  { id: LocationType.ULDAH_STEPS_OF_THAL, name: "Ul'dah - Steps of Thal" },
  { id: LocationType.WESTERN_THANALAN, name: 'Western Thanalan' },
  { id: LocationType.CENTRAL_THANALAN, name: 'Central Thanalan' },
  { id: LocationType.EASTERN_THANALAN, name: 'Eastern Thanalan' },
  { id: LocationType.SOUTHERN_THANALAN, name: 'Southern Thanalan' },
  { id: LocationType.NORTHERN_THANALAN, name: 'Northern Thanalan' },
  { id: LocationType.GOBLET, name: 'Goblet' },
  { id: LocationType.FOUNDATION, name: 'Foundation' },
  { id: LocationType.THE_PILLARS, name: 'The Pillars' },
  { id: LocationType.THE_FIRMAMENT, name: 'The Firmament' },
  { id: LocationType.COERTHAS_CENTRAL_HIGHLANDS, name: 'Coerthas Central Highlands' },
  { id: LocationType.COERTHAS_WESTERN_HIGHLANDS, name: 'Coerthas Western Highlands' },
  { id: LocationType.EMPYREUM, name: 'Empyreum' },
  { id: LocationType.MOR_DHONA, name: 'Mor Dhona' },
  { id: LocationType.THE_SEA_OF_CLOUDS, name: 'The Sea of Clouds' },
  { id: LocationType.AZYS_LLA, name: 'Azys Lla' },
  { id: LocationType.IDYLLSHIRE, name: 'Idyllshire' },
  { id: LocationType.THE_DRAVANIAN_FORELANDS, name: 'The Dravanian Forelands' },
  { id: LocationType.THE_DRAVANIAN_HINTERLANDS, name: 'The Dravanian Hinterlands' },
  { id: LocationType.THE_CHURNING_MISTS, name: 'The Churning Mists' },
  { id: LocationType.RHALGRS_REACH, name: "Rhalgr's Reach" },
  { id: LocationType.THE_FRINGES, name: 'The Fringes' },
  { id: LocationType.THE_PEAKS, name: 'The Peaks' },
  { id: LocationType.THE_LOCHS, name: 'The Lochs' },
  { id: LocationType.KUGANE, name: 'Kugane' },
  { id: LocationType.SHIROGANE, name: 'Shirogane' },
  { id: LocationType.THE_RUBY_SEA, name: 'The Ruby Sea' },
  { id: LocationType.YANXIA, name: 'Yanxia' },
  { id: LocationType.THE_AZIM_STEPPE, name: 'The Azim Steppe' },
  { id: LocationType.THE_DOMAN_ENCLAVE, name: 'The Doman Enclave' },
];

export const LOCATION_BY_ID = LOCATION_DATA.reduce(
  (r, l) => {
    r[l.id] = l.name;
    return r;
  },
  {} as Record<LocationType, string>
);
