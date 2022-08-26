import { evaluate } from './permutation';

describe('Permutation tests', () => {
    it('should result 4 permutations for 101*011*1', () => {
        const expectedResult = [ '101001101', '101101101', '101001111', '101101111' ]
        expect(evaluate('101*011*1')).toEqual(expectedResult);
    })
});
