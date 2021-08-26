import { pick, pickMap } from './pick'

describe('util > pick >', () => {
  describe('pick', () => {
    it('picks keys from object', () => {
      expect(pick({ a: 1, b: 2, c: 3 }, ['a', 'c']))
        .toEqual({ a: 1, c: 3 })
    })
  })
  describe('pickMap', () => {
    it('picks keys from array of objects', () => {
      expect(pickMap([
        { a: 1, b: 2 },
        { a: 1, c: 3 },
        { a: 1, b: 2, c: 3}
      ], ['a', 'b']))
        .toEqual([
          { a: 1, b: 2 },
          { a: 1 },
          { a: 1, b: 2}
        ])
    })
  })
})
