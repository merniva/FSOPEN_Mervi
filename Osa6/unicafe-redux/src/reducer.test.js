import deepFreeze from "deep-freeze";
import counterReducer from "./reducer";

describe("Unicafe reducer", () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  test("Palauttaa alkutilan, kun state on undefined", () => {
    const state = {};
    const action = {
      type: "DO_NOTHING",
    };

    const newState = counterReducer(undefined, action);
    expect(newState).toEqual(initialState);
  });

  test("Hyvä kasvaa yhdellä", () => {
    const action = {
      type: "GOOD",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });
  });

  test("Huono kasvaa yhdellä", () => {
    const action = {
      type: "BAD",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    });
  });

  test("Ok kasvaa yhdellä", () => {
    const action = {
      type: "OK",
    };
    const state = initialState;

    deepFreeze(state);
    const newState = counterReducer(state, action);
    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    });
  });

  test("Tyhjennä nollaa luvut", () => {
    const okAction = {
      type: "OK",
    };
    const zeroAction = {
      type: "ZERO",
    };
    const state = initialState;

    deepFreeze(state);
    const okState = counterReducer(state, okAction);
    expect(okState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    });
    const newState = counterReducer(okState, zeroAction);
    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0,
    });
  });
});
