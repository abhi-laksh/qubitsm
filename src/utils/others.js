import { v4 as uuidv4 } from 'uuid';

export const getUuid = () => uuidv4();
export const rand = (min = 0, max = 100) => Math.floor(Math.random() * (max - min + 1) + min)
