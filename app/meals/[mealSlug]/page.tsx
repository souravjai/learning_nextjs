import Image from 'next/image';
import { notFound } from 'next/navigation';

import { getMeal } from '@/lib/meals';
import classes from './page.module.css';
import { ReactPromise } from 'react';

type MealDetailsPageProps = {
  params: Promise<{ mealSlug: string }>;
};

export default async function MealDetailsPage({ params }: MealDetailsPageProps) {
  const { mealSlug } = await params;
  const meal = getMeal(mealSlug);

  if (!meal) {
    notFound();
  }

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image src={meal.image} alt={meal.title} fill />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <ol className={classes.instructions}>
          {meal.instructions
            .split('\n')
            .map((line, index) => (line.trim() ? <li key={index}>{line}</li> : <br key={index} />))}
        </ol>
      </main>
    </>
  );
}
