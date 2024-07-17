import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('containers:remove', () => {
  it('runs containers:remove cmd', async () => {
    const {stdout} = await runCommand('containers:remove')
    expect(stdout).to.contain('hello world')
  })

  it('runs containers:remove --name oclif', async () => {
    const {stdout} = await runCommand('containers:remove --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
