export interface PokemonBasicData {
  name: string;
  url: string;
}

export interface PokemonAPIResponse {
  count: number;
  next: string;
  previous: string;
  results: PokemonBasicData[];
}

export interface PokemonDetailData {
  abilities: Ability[];
  base_experience: number;
  forms: Species[];
  game_indices: GameIndex[];
  height: number;
  held_items: string[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: Move[];
  name: string;
  order: number;
  past_abilities: string[];
  past_types: string[];
  species: Species;
  sprites: Sprites;
  stats: Stat[];
  types: Type[];
  weight: number;
  url: string;
  error: boolean;
}

export interface Ability {
  ability: Species;
  is_hidden: boolean;
  slot: number;
}

export interface Species {
  name: string;
  url: string;
}

export interface GameIndex {
  game_index: number;
  version: Species;
}

export interface Move {
  move: Species;
  version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: Species;
  version_group: Species;
}

export interface GenerationV {
  'black-white': Sprites;
}

export interface GenerationIv {
  'diamond-pearl': Sprites;
  'heartgold-soulsilver': Sprites;
  platinum: Sprites;
}

export interface Versions {
  'generation-i': GenerationI;
  'generation-ii': GenerationIi;
  'generation-iii': GenerationIii;
  'generation-iv': GenerationIv;
  'generation-v': GenerationV;
  'generation-vi': { [key: string]: Home };
  'generation-vii': GenerationVii;
  'generation-viii': GenerationViii;
}

export interface Sprites {
  back_default: string;
  back_female: null;
  back_shiny: string;
  back_shiny_female: null;
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
  other?: Other;
  versions?: Versions;
  animated?: Sprites;
}

export interface GenerationI {
  'red-blue': RedBlue;
  yellow: RedBlue;
}

export interface RedBlue {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
}

export interface GenerationIi {
  crystal: Crystal;
  gold: Gold;
  silver: Gold;
}

export interface Crystal {
  back_default: string;
  back_shiny: string;
  back_shiny_transparent: string;
  back_transparent: string;
  front_default: string;
  front_shiny: string;
  front_shiny_transparent: string;
  front_transparent: string;
}

export interface Gold {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent?: string;
}

export interface GenerationIii {
  emerald: OfficialArtwork;
  'firered-leafgreen': Gold;
  'ruby-sapphire': Gold;
}

export interface OfficialArtwork {
  front_default: string;
  front_shiny: string;
}

export interface Home {
  front_default: string;
  front_female: null;
  front_shiny: string;
  front_shiny_female: null;
}

export interface GenerationVii {
  icons: DreamWorld;
  'ultra-sun-ultra-moon': Home;
}

export interface DreamWorld {
  front_default: string;
  front_female: null;
}

export interface GenerationViii {
  icons: DreamWorld;
}

export interface Other {
  dream_world: DreamWorld;
  home: Home;
  'official-artwork': OfficialArtwork;
}

export interface Stat {
  base_stat: number;
  effort: number;
  stat: Species;
}

export interface Type {
  slot: number;
  type: Species;
}

export interface EvolutionChain {
  id: number;
  baby_trigger_item: string;
  chain: ChainLink | null;
}

export interface ChainLink {
  evolution_details: EvolutionDetail[];
  evolves_to: ChainLink[];
  is_baby: boolean;
  species: Species;
}

export interface EvolutionDetail {
  gender: string | null;
  held_item: string | null;
  item: string | null;
  known_move: string | null;
  known_move_type: string | null;
  location: string | null;
  min_affection: number | null;
  min_beauty: number | null;
  min_happiness: number | null;
  min_level: number | null;
  needs_overworld_rain: boolean | null;
  party_species: string | null;
  party_type: string | null;
  relative_physical_stats: number | null;
  time_of_day: string | null;
  trade_species: string | null;
  trigger: EvolutionTrigger | null;
  turn_upside_down: boolean | null;
}

export interface EvolutionTrigger {
  name: string;
  url: string;
}

export interface SpeciesDetail {
  base_happiness: number;
  capture_rate: number;
  color: Color;
  egg_groups: Color[];
  evolution_chain: EvolutionChainSimple;
  evolves_from_species: null;
  flavor_text_entries: FlavorTextEntry[];
  form_descriptions: string[];
  forms_switchable: boolean;
  gender_rate: number;
  genera: Genus[];
  generation: Color;
  growth_rate: Color;
  habitat: Color;
  has_gender_differences: boolean;
  hatch_counter: number;
  id: number;
  is_baby: boolean;
  is_legendary: boolean;
  is_mythical: boolean;
  name: string;
  names: Name[];
  order: number;
  pal_park_encounters: PalParkEncounter[];
  pokedex_numbers: PokedexNumber[];
  shape: Color;
  varieties: Variety[];
}

export interface Color {
  name: string;
  url: string;
}

export interface EvolutionChainSimple {
  url: string;
}

export interface Variety {
  is_default: boolean;
  pokemon: Color;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: Color;
  version: Color;
}

export interface Genus {
  genus: string;
  language: Color;
}

export interface Name {
  language: Color;
  name: string;
}

export interface PalParkEncounter {
  area: Color;
  base_score: number;
  rate: number;
}

export interface PokedexNumber {
  entry_number: number;
  pokedex: Color;
}
