import { NgModule } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { readFirst } from '@nrwl/angular/testing';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Store } from '@ngrx/store';

import { NxModule } from '@nrwl/angular';

import { EventLogsEntity } from './event-logs.models';
import { EventLogsEffects } from './event-logs.effects';
import { EventLogsFacade } from './event-logs.facade';

import * as EventLogsSelectors from './event-logs.selectors';
import * as EventLogsActions from './event-logs.actions';
import {
  EVENTLOGS_FEATURE_KEY,
  State,
  initialState,
  reducer,
} from './event-logs.reducer';

interface TestSchema {
  eventLogs: State;
}

describe('EventLogsFacade', () => {
  let facade: EventLogsFacade;
  let store: Store<TestSchema>;
  const createEventLogsEntity = (id: string, name = '') =>
    ({
      id,
      name: name || `name-${id}`,
    } as EventLogsEntity);

  beforeEach(() => {});

  describe('used in NgModule', () => {
    beforeEach(() => {
      @NgModule({
        imports: [
          StoreModule.forFeature(EVENTLOGS_FEATURE_KEY, reducer),
          EffectsModule.forFeature([EventLogsEffects]),
        ],
        providers: [EventLogsFacade],
      })
      class CustomFeatureModule {}

      @NgModule({
        imports: [
          NxModule.forRoot(),
          StoreModule.forRoot({}),
          EffectsModule.forRoot([]),
          CustomFeatureModule,
        ],
      })
      class RootModule {}
      TestBed.configureTestingModule({ imports: [RootModule] });

      store = TestBed.get(Store);
      facade = TestBed.get(EventLogsFacade);
    });

    /**
     * The initially generated facade::loadAll() returns empty array
     */
    it('loadAll() should return empty list with loaded == true', async (done) => {
      try {
        let list = await readFirst(facade.allEventLogs$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(EventLogsActions.loadEventLogs());

        list = await readFirst(facade.allEventLogs$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });

    /**
     * Use `loadEventLogsSuccess` to manually update list
     */
    it('allEventLogs$ should return the loaded list; and loaded flag == true', async (done) => {
      try {
        let list = await readFirst(facade.allEventLogs$);
        let isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(0);
        expect(isLoaded).toBe(false);

        facade.dispatch(
          EventLogsActions.loadEventLogsSuccess({
            eventLogs: [
              createEventLogsEntity('AAA'),
              createEventLogsEntity('BBB'),
            ],
          })
        );

        list = await readFirst(facade.allEventLogs$);
        isLoaded = await readFirst(facade.loaded$);

        expect(list.length).toBe(2);
        expect(isLoaded).toBe(true);

        done();
      } catch (err) {
        done.fail(err);
      }
    });
  });
});
