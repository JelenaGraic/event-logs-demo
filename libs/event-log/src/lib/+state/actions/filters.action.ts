import { createAction, props } from '@ngrx/store';
import { Filter } from '../../+common/filters.model';
import { Pagination } from '../../+common/pagination.model';
import { Sort } from '../../+common/sort.model';

//get filters

export const applyFilter = createAction(
    '[Ui-Event-Filters Component] Filter Events', 
    props<{filters: Filter}>()
  );

export const applyPagination = createAction(
    '[Event-list Component] Change Pagination', 
    props<{pagination: Pagination}>()
  );

export const applySort = createAction(
  '[Event-list Component] Change Sort',
  props<{sort: Sort}>()
)
