import {getRegExp} from '../src/main'

test.each([
  ['wip', true],
  ['Do Not Merge', true],
  ['wips', false],
  ['Dontmerge', false]
])("defaults match '%s': %o", (input, match) => {
  expect(getRegExp('wip,do not merge').test(<string>input)).toBe(match)
  // expect(reg.test('wip')).toBe()
  // expect(reg.test('wips')).toBeFalsy()
  // expect(reg.test('Do Not Merge')).toBeTruthy()
  // expect(reg.test('donotmerge')).toBeFalsy()
})
