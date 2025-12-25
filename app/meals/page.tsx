import Link from 'next/link';
import classes from './page.module.css';
import { MealsGrid } from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';
import { Suspense } from 'react';

const Meal = () => {
  const meals = getMeals();
  return <MealsGrid meals={meals} />;
};
export default async function MealsPage() {
  return (
    <>
      <header className={classes.header}>
        <h1>
          Discover <span className={classes.highlight}>delicious meals</span> from around the world
        </h1>
        <div className={classes.cta}>
          <p>Share your favorite recipes with the community!</p>
          <Link href="/meals/share">Share Meals</Link>
        </div>
      </header>
      <main className={classes.main}>
        <Suspense fallback={<p>Loading meals...</p>}>
          <Meal />
        </Suspense>
      </main>
    </>
  );
}
