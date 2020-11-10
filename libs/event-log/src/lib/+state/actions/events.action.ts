import { createAction, props } from '@ngrx/store';
import { Filter } from '../../+common/filters.model';
import { Pagination } from '../../+common/pagination.model';

//get filters

export const applyFilter = createAction(
    '[Home Facade] Filter Events', 
    props<{filters: Filter}>()
  );

export const applyPagination = createAction(
    '[Home Facade] Change Pagination', 
    props<{pagination: Pagination}>()
  );