import type {
  Destination,
  DestinationType,
  LocalDestination,
} from "../components/destinationCard";
import { ASSETS } from "../assets";

export const localDestinations: LocalDestination[] = [
  {
    id: 1,
    type: "local",
    flag: ASSETS.turkey,
    country: "Турция",
    price: "от 100 000 UZS",
  },
  {
    id: 2,
    type: "local",
    flag: ASSETS.oae,
    country: "ОАЭ",
    price: "от 100 000 UZS",
  },
  {
    id: 3,
    type: "local",
    flag: ASSETS.usa,
    country: "Италия",
    price: "от 100 000 UZS",
  },
  {
    id: 4,
    type: "local",
    flag: ASSETS.turkey,
    country: "Испания",
    price: "от 100 000 UZS",
  },
  {
    id: 5,
    type: "local",
    flag: ASSETS.turkey,
    country: "Германия",
    price: "от 100 000 UZS",
  },
  {
    id: 6,
    type: "local",
    flag: ASSETS.oae,
    country: "Нидерланды",
    price: "от 100 000 UZS",
  },
  {
    id: 7,
    type: "local",
    flag: ASSETS.usa,
    country: "Казахстан",
    price: "от 100 000 UZS",
  },
  {
    id: 8,
    type: "local",
    flag: ASSETS.turkey,
    country: "США",
    price: "от 100 000 UZS",
  },
  {
    id: 9,
    type: "local",
    flag: ASSETS.turkey,
    country: "Греция",
    price: "от 100 000 UZS",
  },
  {
    id: 10,
    type: "local",
    flag: ASSETS.oae,
    country: "Португалия",
    price: "от 100 000 UZS",
  },
  {
    id: 11,
    type: "local",
    flag: ASSETS.usa,
    country: "Канада",
    price: "от 100 000 UZS",
  },
  {
    id: 12,
    type: "local",
    flag: ASSETS.turkey,
    country: "Узбекистан",
    price: "от 100 000 UZS",
  },
];

const regionalDestinations: Destination[] = [
  {
    id: 13,
    type: "regional",
    flag: ASSETS.world,
    name: "Юго-Восточная Азия",
    label: "18 стран",
  },
  {
    id: 14,
    type: "regional",
    flag: ASSETS.world,
    name: "Африка",
    label: "18 стран",
  },
  {
    id: 15,
    type: "regional",
    flag: ASSETS.world,
    name: "Европа+",
    label: "18 стран",
  },
  {
    id: 16,
    type: "regional",
    flag: ASSETS.world,
    name: "Ближний Восток",
    label: "18 стран",
  },

  
  
];

const globalDestinations: Destination[] = [
  {
    id: 17,
    type: "global",
    flag: ASSETS.world,
    name: "Европа",
    label: "18 стран",
  },
  {
    id: 18,
    type: "global",
    flag: ASSETS.world,
    name: "Африка",
    label: "18 стран",
  },
  {
    id: 19,
    type: "global",
    flag: ASSETS.world,
    name: "Евразия",
    label: "18 стран",
  },
];

export const tabConfig: Record<
  DestinationType,
  { label: string; data: Destination[] }
> = {
  local: { label: "local", data: localDestinations as Destination[] },
  regional: { label: "regional", data: regionalDestinations },
  global: { label: "global", data: globalDestinations },
};