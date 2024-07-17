import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('containers:stop', () => {
  it('runs containers:stop cmd', async () => {
    const {stdout} = await runCommand('containers:stop')
    expect(stdout).to.contain('hello world')
  })

  it('runs containers:stop --name oclif', async () => {
    const {stdout} = await runCommand('containers:stop --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
