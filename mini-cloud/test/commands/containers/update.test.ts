import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('containers:update', () => {
  it('runs containers:update cmd', async () => {
    const {stdout} = await runCommand('containers:update')
    expect(stdout).to.contain('hello world')
  })

  it('runs containers:update --name oclif', async () => {
    const {stdout} = await runCommand('containers:update --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
