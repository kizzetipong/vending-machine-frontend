import { mount } from '@vue/test-utils'
import MachinesTable from '@/components/MachinesTable.vue'

describe('MachinesTable', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(MachinesTable)
    expect(wrapper.vm).toBeTruthy()
  })
})
