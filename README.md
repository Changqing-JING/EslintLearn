# eslint-plugin-eslint-learn

a learning project

## Installation

```shell
npm install
npm run bundle
```

## Usage

Add `eslint-learn` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
    "plugins": [
        "eslint-learn"
    ]
}
```

Then configure the rules you want to use under the rules section.

```json
{
    "rules": {
        "eslint-learn/subscribe": "error"
    }
}
```

## Test

```shell
npm run coverage
```

## Rules

<!-- begin auto-generated rules list -->

TODO: Run eslint-doc-generator to generate the rules list.

<!-- end auto-generated rules list -->

# Additional info

## Create a new eslint project

```shell
npm install -g yo generator-eslint
yo eslint:plugin
yo eslint:rule
```

## Documentation

https://astexplorer.net/
