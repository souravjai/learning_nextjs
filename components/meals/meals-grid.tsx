import { Meal } from '@/utility/types';
import classes from './meals-grid.module.css';
import MealItem from './meal-item';
interface MealsGridProps {
  meals: Meal[];
}
export const MealsGrid: React.FC<MealsGridProps> = ({ meals }) => {
  return (
    <ul className={classes.meals}>
      {meals.map(meal => (
        <li key={meal.id}>
          <MealItem {...meal} />
        </li>
      ))}
    </ul>
  );
};
