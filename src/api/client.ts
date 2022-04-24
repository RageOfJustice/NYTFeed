import axios from 'axios';
import { BASE_URL } from 'configs/api';

export const client = axios.create({ baseURL: BASE_URL });
