import { NormalFishType } from '../enums/NormalFishType.ts';
import { NormalFish } from '../types/NormalFish.ts';
import { BaitType } from '../enums/BaitType.ts';

export const NORMAL_FISH_DATA: NormalFish[] = [
  // ARR
  {
    id: NormalFishType.MERLTHOR_GOBY,
    name: 'Merlthor Goby',
    patch: '2.0',
    baits: [BaitType.LUGWORM],
  },
  { id: NormalFishType.OCEAN_CLOUD, name: 'Ocean Cloud', patch: '2.0', baits: [BaitType.PILL_BUG] },
  {
    id: NormalFishType.HARBOR_HERRING,
    name: 'Harbor Herring',
    patch: '2.0',
    baits: [BaitType.PILL_BUG],
  },
  { id: NormalFishType.OGRE_BARRACUDA, name: 'Ogre Barracuda', patch: '2.0', baits: [] },
  {
    id: NormalFishType.FULLMOON_SARDINE,
    name: 'Fullmoon Sardine',
    patch: '2.0',
    baits: [BaitType.SPOON_WORM],
  },
  { id: NormalFishType.WAHOO, name: 'WAHOO', patch: '2.0', baits: [BaitType.LUGWORM] },
  {
    id: NormalFishType.LITTLE_THALAOS,
    name: 'Little Thalaos',
    patch: '2.0',
    baits: [BaitType.NORTHERN_KRILL],
  },
  { id: NormalFishType.GIANT_SQUID, name: 'GIANT_SQUID', patch: '2.0', baits: [] },
  {
    id: NormalFishType.STRIPED_GOBY,
    name: 'Striped Goby',
    patch: '2.0',
    baits: [BaitType.MOTH_PUPA],
  },
  {
    id: NormalFishType.ABALATHIAN_SMELT,
    name: 'Abalathian Smelt',
    patch: '2.0',
    baits: [BaitType.HONEY_WORM],
  },
  {
    id: NormalFishType.ALA_MHIGAN_FIGHTING_FISH,
    name: 'Ala Mhigan Fighting Fish',
    patch: '2.0',
    baits: [BaitType.MIDGE_BASKET],
  },
  { id: NormalFishType.COPPERFISH, name: 'COPPERFISH', patch: '2.0', baits: [BaitType.BUTTERWORM] },
  { id: NormalFishType.SILVERFISH, name: 'SILVERFISH', patch: '2.0', baits: [BaitType.HONEY_WORM] },
  {
    id: NormalFishType.COMMON_SCULPIN,
    name: 'Common Sculpin',
    patch: '2.0',
    baits: [BaitType.SPINNER],
  },
  {
    id: NormalFishType.ASSASSIN_BETTA,
    name: 'Assassin Betta',
    patch: '2.0',
    baits: [BaitType.HONEY_WORM],
  },
  {
    id: NormalFishType.BOXING_PLECO,
    name: 'Boxing Pleco',
    patch: '2.0',
    baits: [BaitType.GLOWWORM],
  },
  { id: NormalFishType.GOLDFISH, name: 'GOLDFISH', patch: '2.0', baits: [] },
  { id: NormalFishType.JUNGLE_CATFISH, name: 'JUNGLE_CATFISH', patch: '2.0', baits: [] },
  {
    id: NormalFishType.STORM_RIDER,
    name: 'Storm Rider',
    patch: '2.0',
    baits: [BaitType.SAND_LEECH],
  },
  {
    id: NormalFishType.CLOUD_CUTTER,
    name: 'Cloud Cutter',
    patch: '2.0',
    baits: [BaitType.HOVERWORM],
  },
  {
    id: NormalFishType.LAMP_MARIMO,
    name: 'Lamp Marimo',
    patch: '2.0',
    baits: [BaitType.CHOCOBO_FLY],
  },

  // HW
  {
    id: NormalFishType.ICE_FAERIE,
    name: 'Ice Faerie',
    patch: '3.0',
    baits: [BaitType.CADDISFLY_LARVA, BaitType.PURSE_WEB_SPIDER],
  },
  {
    id: NormalFishType.BLUECLAW_SHRIMP,
    name: 'Blueclaw Shrimp',
    patch: '3.0',
    baits: [BaitType.STONEFLY_NYMPH],
  },
  {
    id: NormalFishType.GLACIER_CORE,
    name: 'Glacier Core',
    patch: '3.0',
    baits: [BaitType.RED_BALLOON],
  },
  {
    id: NormalFishType.BULLFROG,
    name: 'Bullfrog',
    patch: '3.0',
    baits: [BaitType.BLADED_STEEL_JIG],
  },
  {
    id: NormalFishType.SKY_FAERIE,
    name: 'Sky Faerie',
    patch: '3.0',
    baits: [BaitType.METAL_SPINNER],
  },
  {
    id: NormalFishType.GRANITE_CRAB,
    name: 'Granite Crab',
    patch: '3.0',
    baits: [BaitType.METAL_SPINNER],
  },
  {
    id: NormalFishType.HEDGEMOLE_CRICKET,
    name: 'Hedgemole Cricket',
    patch: '3.0',
    baits: [BaitType.STONEFLY_NYMPH, BaitType.PURSE_WEB_SPIDER],
  },
  {
    id: NormalFishType.PLATINUM_FISH,
    name: 'Platinum Fish',
    patch: '3.0',
    baits: [BaitType.FIEND_WORM],
  },
  {
    id: NormalFishType.AETHER_EYE,
    name: 'Aether Eye',
    patch: '3.0',
    baits: [BaitType.PURSE_WEB_SPIDER],
  },
  {
    id: NormalFishType.SWEETFISH,
    name: 'Sweetfish',
    patch: '3.0',
    baits: [BaitType.BLADED_STEEL_JIG],
  },
  {
    id: NormalFishType.FOSSILTONGUE,
    name: 'Fossiltongue',
    patch: '3.0',
    baits: [BaitType.MAGMA_WORM],
  },
  { id: NormalFishType.RUDDERFISH, name: 'RUDDERFISH', patch: '3.0', baits: [] },
  { id: NormalFishType.SCORPIONFLY, name: 'SCORPIONFLY', patch: '3.0', baits: [] },
  {
    id: NormalFishType.FUNCTIONAL_PROTO_HROPKEN,
    name: 'Functional Proto-Hropken',
    patch: '3.0',
    baits: [BaitType.FIEND_WORM],
  },

  // STB
  {
    id: NormalFishType.ROCK_SALTFISH,
    name: 'Rock Saltfish',
    patch: '4.0',
    baits: [BaitType.SILKWORM],
  },
  { id: NormalFishType.SCULPTOR, name: 'Sculptor', patch: '4.0', baits: [] },
  {
    id: NormalFishType.GYR_ABANIAN_TROUT,
    name: 'Gyr Abanian Trout',
    patch: '4.0',
    baits: [BaitType.MIDGE_LARVA],
  },
  {
    id: NormalFishType.BALLOON_FROG,
    name: 'Balloon Frog',
    patch: '4.0',
    baits: [BaitType.SALMON_ROE],
  },
  {
    id: NormalFishType.RUBY_SHRIMP,
    name: 'Ruby Shrimp',
    patch: '4.0',
    baits: [BaitType.LIVE_SHRIMP],
  },
  {
    id: NormalFishType.ZAGAS_KHAAL,
    name: 'Zagas Khaal',
    patch: '4.0',
    baits: [BaitType.NIGHTCRAWLER],
  },
  {
    id: NormalFishType.FIRELIGHT_GOLDFISH,
    name: 'Firelight Goldfish',
    patch: '4.0',
    baits: [],
  },
  {
    id: NormalFishType.INDIGO_PRISMFISH,
    name: 'Indigo Prismfish',
    patch: '4.0',
    baits: [],
  },
  {
    id: NormalFishType.GREEN_PRISMFISH,
    name: 'Green Prismfish',
    patch: '4.0',
    baits: [BaitType.STONEFLY_LARVA],
  },
];

export const NORMAL_FISH_BY_ID = NORMAL_FISH_DATA.reduce(
  (r, f) => {
    r[f.id] = f;
    return r;
  },
  {} as Record<NormalFishType, NormalFish>
);
