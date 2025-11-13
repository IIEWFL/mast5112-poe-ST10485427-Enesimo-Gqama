export type Course = "Appetizer" | "Main" | "Dessert" | "Side" | "Drink";

export interface Dish {
  id: string;
  name: string;
  description?: string;
  price: number; // decimal unit, e.g. 120.0
  course: Course;
  image?: string; // not used now but reserved for assets/data URL
}


