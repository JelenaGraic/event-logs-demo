import { createAction, props } from '@ngrx/store';
import { Filter } from '../../+common/filters.model';

//get filters

export const filterEvents = createAction(
    '[Home Component] Filter Events', 
    props<{filters: Filter}>()
  );

export const changePage = createAction(
    '[Event-list Component] Filter Events', 
    props<{page: number}>()
  );
