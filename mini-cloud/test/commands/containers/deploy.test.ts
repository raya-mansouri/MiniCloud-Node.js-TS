import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('containers:deploy', () => {
  it('runs containers:deploy cmd', async () => {
    const {stdout} = await runCommand('containers:deploy')
    expect(stdout).to.contain('hello world')
  })

  it('runs containers:deploy --name oclif', async () => {
    const {stdout} = await runCommand('containers:deploy --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
