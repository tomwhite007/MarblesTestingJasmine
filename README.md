# MarblesTestingJasmine

A simple project to demonstrate best practice unit testing on Observables.

See [dummy-state.effects.spec.ts](https://github.com/tomwhite007/MarblesTestingJasmine/blob/master/apps/marbles-testing-jasmine/src/app/%2Bstate/dummy-state.effects.spec.ts) and [dummy.service.spec.ts](https://github.com/tomwhite007/MarblesTestingJasmine/blob/master/apps/marbles-testing-jasmine/src/app/services/dummy.service.spec.ts)

## dummy-state.effects

Originally, I built this demo with an NgRx Effect that used the operator `withLatestFrom` to get a value from the Store. It turns out this causes problems when trying to mock the input to it after the Effect has been instantiated. See [withLastestFrom-mocking-issue demo](https://github.com/tomwhite007/withLastestFrom-mocking-issue) or [rxjs/issues/5159](https://github.com/ReactiveX/rxjs/issues/5159)

I have since refactored to to use `switchMap` to avoid this issue whilst demonstrating Angular best practive unit testing.

## Other notes

This project was generated using [Nx](https://nx.dev).
