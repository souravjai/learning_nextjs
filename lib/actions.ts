'use server';

import { revalidatePath } from "next/cache";
import { saveMeal } from "./meals";
import { redirect } from 'next/navigation'

function isInvalidText(value:string){
  return !value || value.trim()==='';
}


export async function shareMeal(curState:FormData|null,formData: FormData) {

  const name = formData.get('name');
  const email = formData.get('email');
  const title = formData.get('title');
  const summary = formData.get('summary');
  const instructions = formData.get('instructions');
  const image = formData.get('image') as File;

  
  if(isInvalidText(name as string) || isInvalidText(email as string) ||
     isInvalidText(title as string) ||
     isInvalidText(summary as string) || image.size===0){
    throw new Error('Invalid input - please check your data.');
  }
  
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

  revalidatePath('/meals');
  redirect('/meals');
  

  return formData;
}