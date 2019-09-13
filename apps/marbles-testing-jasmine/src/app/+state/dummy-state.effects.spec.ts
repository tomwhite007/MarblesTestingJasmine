import { TestBed, async } from '@angular/core/testing';

import { Observable } from 'rxjs';

import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { provideMockActions } from '@ngrx/effects/testing';

import { NxModule, DataPersistence } from '@nrwl/angular';
import { hot } from '@nrwl/angular/testing';

import { DummyStateEffects } from './dummy-state.effects';
import { LoadDummyState, DummyStateLoaded } from './dummy-state.actions';

describe('DummyStateEffects', () => {
  let actions: Observable<any>;
  let effects: DummyStateEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        NxModule.forRoot(),
        StoreModule.forRoot({}),
        EffectsModule.forRoot([])
      ],
      providers: [
        DummyStateEffects,
        DataPersistence,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(DummyStateEffects);
  });

  describe('loadDummyState$', () => {
    it('should work', () => {
      actions = hot('-a-|', { a: new LoadDummyState() });
      expect(effects.loadDummyState$).toBeObservable(
        hot('-a-|', { a: new DummyStateLoaded([]) })
      );
    });
  });
});
