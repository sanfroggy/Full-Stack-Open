//Importing the deep-freeze library and the reducer component.
import deepFreeze from 'deep-freeze'
import counterReducer from './reducer'

describe('unicafe reducer', () => {

    //Creating a state with values at 0 for test comparison.
    const initialState = {
        good: 0,
        ok: 0,
        bad: 0
    }

    /*Testing that when the reducer is called with undefined state or an empty object,
    but with no action a proper state object is returned. */
    test('should return a proper initial state when called with undefined state', () => {
        const state = {}
        const action = {
            type: 'DO_NOTHING'
        }

        let newState = counterReducer(undefined, action)
        expect(newState).toEqual(initialState)

        newState = counterReducer(state, action)
        expect(newState).toEqual(initialState)

        newState = counterReducer(initialState, action)
        expect(newState).toEqual(initialState)

    })

    /*Testing that when the reducer is called with the action "GOOD", the value of
    the good field in the returned state is incremented by 1. */
    test('good is incremented', () => {
        const action = {
            type: 'GOOD'
        }
        const state = initialState

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 1,
            ok: 0,
            bad: 0
        })
    })

    /*Testing that when the reducer is called with the action "OK", the value of
    the ok field in the returned state is incremented by 1. */
    test('ok is incremented', () => {
        const action = {
            type: 'OK'
        }
        const state = initialState

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 0,
            ok: 1,
            bad: 0
        })
    })

    /*Testing that when the reducer is called with the action "BAD", the value of
    the bad field in the returned state is incremented by 1. */
    test('bad is incremented', () => {
        const action = {
            type: 'BAD'
        }
        const state = initialState

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual({
            good: 0,
            ok: 0,
            bad: 1
        })
    })

    test('zero resets the reviews', () => {
        const action = {
            type: 'ZERO'
        }
        const state = initialState

        deepFreeze(state)
        const newState = counterReducer(state, action)
        expect(newState).toEqual(initialState)
    })
})
