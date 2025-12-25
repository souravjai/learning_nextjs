import { Meal } from '@/utility/types';
import { delay } from '@/utility/utils';
import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'fs';

const db = sql('meals.db');

export function getMeals(): Meal[] {
  return db.prepare(`SELECT * FROM meals`).all() as Meal[];
}

export function getMeal(slug: string): Meal | undefined {
  const meal = db.prepare(`SELECT * FROM meals WHERE slug = ?`).get(slug) as Meal | undefined;
  return meal;
}

export async function saveMeal(meal: Omit<Meal, 'id' | 'slug' | 'image'>, image: File) { 
  const newMeal = { ...meal } as Meal;
  newMeal.slug = slugify(meal.title, { lower: true, strict: true });
  newMeal.instructions = xss(meal.instructions);

  const extension = image.name.split('.').pop();
  const fileName = `${newMeal.slug}.${extension}`;
  newMeal.image = `/images/${fileName}`;

  const stream = fs.createWriteStream(`public/images/${fileName}`);
  const bufferedImage = await image.arrayBuffer();
  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error('Saving image failed!');
    }
  });

  db.prepare(
    `INSERT INTO meals (title, summary, instructions, image, slug, creator, creator_email) VALUES (@title, @summary, @instructions, @image, @slug, @creator, @creator_email)`,
  ).run(newMeal);

  return newMeal;
}