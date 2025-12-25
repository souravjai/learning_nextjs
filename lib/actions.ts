'use server';

import { saveMeal } from "./meals";

export async function shareMeal(formData: FormData) {

  const name = formData.get('name');
  const email = formData.get('email');
  const title = formData.get('title');
  const summary = formData.get('summary');
  const instructions = formData.get('instructions');
  const image = formData.get('image');

  await saveMeal(
    {
      title: title as string,
      summary: summary as string,
      instructions: instructions as string,
      creator: name as string,
      creator_email: email as string,
    },
    image as File
  );
}