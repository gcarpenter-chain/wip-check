import * as core from '@actions/core'
import * as github from '@actions/github'
import {Octokit} from '@octokit/action'

export function getRegExp(inputLabels: string): RegExp {
  const labels = inputLabels.split(',')
  return new RegExp(`\\b(${labels.join('|')})\\b`, 'i')
}

async function run(): Promise<void> {
  try {
    const kit = new Octokit()

    const wipRegex = getRegExp(core.getInput('labels'))
    const isTitledWip = wipRegex.test(github.context.payload.pull_request?.title)
    const prLabels = (<{name: string}[]>github.context.payload.pull_request?.labels).map(l => l.name)
    const isLabeledWip = prLabels.some(l => wipRegex.test(l))
    const checkStatus = isTitledWip || isLabeledWip ? 'pending' : 'success'

    core.info(`WIP regex: ${wipRegex}`)
    core.info(`Title: ${github.context.payload.pull_request?.title}`)
    core.info(`Title is blocking: ${isTitledWip}`)
    core.info(`Labels: ${prLabels}`)
    core.info(`Labels are blocking: ${isLabeledWip}`)

    const status = {
      state: checkStatus,
      // eslint-disable-next-line @typescript-eslint/camelcase
      target_url: 'https://github.com/gcarpenter-chain/wip-check',
      description: isTitledWip ? 'blocked' : 'ready',
      context: 'WIP check'
    }
    core.info('Setting status:')
    core.info(JSON.stringify(status))

    // eslint-disable-next-line @typescript-eslint/camelcase
    await kit.request(`POST ${github.context.payload.pull_request?.statuses_url}`, status)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
