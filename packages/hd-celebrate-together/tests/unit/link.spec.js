import {DATE_DETAIL} from '@/api/link'

describe('link', () => {
  it('test link', () => {
    expect(DATE_DETAIL).toMatch('schedule/PAGE_SCHEDULE_PC')
  })
})
