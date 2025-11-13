import AsyncStorage from "@react-native-async-storage/async-storage";
import { Dish } from "../types/index";

const STORAGE_KEY = "chef_menu_items_v1";

export const loadMenu = async (): Promise<Dish[]> => {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as Dish[];
    return Array.isArray(parsed) ? parsed : [];
  } catch (e) {
    console.warn("Failed to load menu", e);
    return [];
  }
};

export const saveMenu = async (items: Dish[]): Promise<void> => {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.warn("Failed to save menu", e);
  }
};

export const clearMenu = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.warn("Failed to clear menu", e);
  }
};


