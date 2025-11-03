import { Sign } from '../models/sign.model.js';
import { config } from '../config/index.js';

export async function getAllSignsService() {
  try {
    const signs = await Sign.find();
    return signs.map(s => ({
      ...s.toObject(),
      image_path: `${config?.baseURL}/${s.image_path.replace(/^\/+/, '')}`,
    }));
  } catch (error) {
    console.error('Error in getAllSignsService:', error);
    throw new Error('Failed to fetch signs');
  }
}
