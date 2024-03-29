import { Injectable } from '@angular/core';
import { Effect, Actions, ofType } from '@ngrx/effects';
import {
  DummyStateLoaded,
  DummyStateLoadError,
  DummyStateActionTypes,
  DummyStateAction
} from './dummy-state.actions';
import { Observable, of } from 'rxjs';
import { Action } from '@ngrx/store';
import { map, withLatestFrom, catchError, switchMap } from 'rxjs/operators';
import { FakeRestService } from '../services/fake-rest.service';

@Injectable()
export class DummyStateEffects {
  @Effect() loadDummyState$: Observable<Action> = this.actions$.pipe(
    ofType<DummyStateAction>(DummyStateActionTypes.LoadDummyState),
    switchMap(() => this.api.getDummyData()),
    map(apiResult => new DummyStateLoaded(apiResult)),
    catchError(e => of(new DummyStateLoadError(e)))
  );

  constructor(private actions$: Actions, public api: FakeRestService) {}
}
