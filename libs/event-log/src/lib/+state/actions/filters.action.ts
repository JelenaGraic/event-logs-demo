import { createAction, props } from '@ngrx/store';
import { Filter } from '../../+common/filters.model';

//get filters

export const filterEvents = createAction(
    '[Event-list Component] Filter Events', 
    props<{filters: Filter}>()
  );