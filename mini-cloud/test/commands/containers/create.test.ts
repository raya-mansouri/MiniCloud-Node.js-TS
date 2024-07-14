import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('containers:create', () => {
  it('runs containers:create cmd', async () => {
    const {stdout} = await runCommand('containers:create')
    expect(stdout).to.contain('hello world')
  })

  it('runs containers:create --name oclif', async () => {
    const {stdout} = await runCommand('containers:create --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
