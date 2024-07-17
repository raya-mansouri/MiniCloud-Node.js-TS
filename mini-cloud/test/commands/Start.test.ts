import {runCommand} from '@oclif/test'
import {expect} from 'chai'

describe('Start', () => {
  it('runs Start cmd', async () => {
    const {stdout} = await runCommand('Start')
    expect(stdout).to.contain('hello world')
  })

  it('runs Start --name oclif', async () => {
    const {stdout} = await runCommand('Start --name oclif')
    expect(stdout).to.contain('hello oclif')
  })
})
