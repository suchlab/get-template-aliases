# Aliases for get-template
Aliases to be used in the [get-templates](https://npmjs.com/get-template) npx tool.

Anyone can [suggest a new alias](https://github.com/suchlab/get-template-aliases/issues/new?assignees=itaibo&labels=alias-suggestion&template=suggest-a-new-alias.md&title=New+alias%3A+your-alias-name) and it will be immediatly available for everyone to be used.

## Usage in get-templates
Instead of using the username/repo structure, just use the alias. Example:

```sh
npx get-template package new-package
```

This command will download the [suchlab/package-template](https://github.com/suchlab/package-template) template in the `new-package` directory without having to specify the whole route.

---

## CLI for collaborators
To use the CLI to update the aliases first go into the directory and install the package globally:
```sh
npm i -g
```

Keep in mind this is for the repo collaborators only. If you don't have write permissions you won't be able to update the aliases with the CLI (you can still [suggest a new alias](https://github.com/suchlab/get-template-aliases/issues/new?assignees=itaibo&labels=alias-suggestion&template=suggest-a-new-alias.md&title=New+alias%3A+your-alias-name))

Once installed, you can perform these commands and follow the indications:

### Add new alias
```sh
gtal {add | new | create}
```
