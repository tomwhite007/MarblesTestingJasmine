import { TestBed } from '@angular/core/testing';

import { Observable, of, throwError } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule, Action } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule } from '@nrwl/angular';

import { DummyStateEffects } from './dummy-state.effects';
import {
  LoadDummyState,
  DummyStateLoaded,
  DummyStateLoadError
} from './dummy-state.actions';
import { FakeRestService } from '../services/fake-rest.service';
import { TestScheduler } from 'rxjs/testing';

describe('DummyStateEffects', () => {
  let actions$: Observable<Action>;
  let effects: DummyStateEffects;
  const dummyApiError = new Error('Oops! Api request failed');
  let apiSpy;
  let returnCounter = 0;

  beforeAll(() => {
    apiSpy = jasmine.createSpyObj('FakeRestService', ['getDummyData']);
    apiSpy.getDummyData.and.callFake(() => {
      if (returnCounter === 0) {
        returnCounter++;
        return of(['Mocked']);
      }
      return throwError(dummyApiError);
    });
  });

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        DummyStateEffects,
        provideMockActions(() => actions$),
        { provide: FakeRestService, useValue: apiSpy }
      ]
    });

    effects = TestBed.get(DummyStateEffects);
  });

  it('should trigger loaded action', () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      // asserting the two objects are equal
      // required for all Marbles assertions to be asserted by Jest or Jasmine
      expect(actual).toEqual(expected);
    });

    testScheduler.run(({ hot, expectObservable }) => {
      actions$ = hot('-a-|', { a: new LoadDummyState() });

      expectObservable(effects.loadDummyState$).toBe('-a-|', {
        a: new DummyStateLoaded(['Mocked'])
      });
    });
  });

  it('should trigger load error action', () => {
    const testScheduler = new TestScheduler((actual, expected) => {
      // asserting the two objects are equal
      // required for all Marbles assertions to be asserted by Jest or Jasmine
      expect(actual).toEqual(expected);
    });

    testScheduler.run(({ hot, expectObservable }) => {
      actions$ = hot('-a-|', { a: new LoadDummyState() });

      expectObservable(effects.loadDummyState$).toBe('(a|)', {
        a: new DummyStateLoadError(dummyApiError)
      });
    });
  });
});
