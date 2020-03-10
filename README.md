<p align="center">
  <a href="https://github.com/actions/typescript-action/actions"><img alt="typescript-action status" src="https://github.com/actions/typescript-action/workflows/build-test/badge.svg"></a>
</p>

# Setting up

Add the following yaml to your `.github/workflows` folder:

```
name: WIP
on:
  pull_request:
    types: [ opened, synchronize, reopened, edited, labeled, unlabeled]

jobs:
  wip:
    runs-on: ubuntu-latest
    env:
      GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
    steps:
      - uses: gcarpenter-chain/wip-check@master
```

## Structure

Based on <https://github.com/actions/typescript-action>, see there for more details

## Publish to a release branch

Run [ncc](https://github.com/zeit/ncc) and push the results:

```bash
$ npm run pack
$ git add dist
$ git commit -a -m "prod dependencies"
$ git push origin releases/v1
```

A new version is now published! :rocket:

See the [versioning documentation](https://github.com/actions/toolkit/blob/master/docs/action-versioning.md)
