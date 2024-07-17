import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('containers:start', () => {
  it('runs containers:start cmd', async () => {
    const {stdout} = await runCommand('containers:start')
    expect(stdout).to.contain('hello world')
  })

  it('runs containers:start --name oclif', async () => {
    const {stdout} = await runCommand('containers:start --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
