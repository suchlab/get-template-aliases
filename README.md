# Aliases for get-template
Aliases to be used in the [get-templates](https://github.com/get-template/get-template) npx tool.

Anyone can [suggest a new alias](https://github.com/get-template/aliases/issues/new?assignees=itaibo&labels=alias-suggestion&template=suggest-a-new-alias.md&title=New+alias%3A+your-alias-name) and it will be immediatly avaiable for everyone to be used.

## Usage in get-templates
Instead of using the username/repo structure, just use the alias. Example:

```sh
npx get-template package new-package
```

This command will download the [itaibo/package-template](https://github.com/itaibo/package-template) template in the `new-package` directory without having to specify the whole route.

---

## Admin
To use the CLI to update the aliases first go into the directory and install the package globally:
```sh
npm i -g
```

Keep in mind this is for the repo collaborators only. If you don't have write permissions you won't be able to update the aliases with the CLI (you can still [suggest a new alias](https://github.com/get-template/aliases/issues/new?assignees=itaibo&labels=alias-suggestion&template=suggest-a-new-alias.md&title=New+alias%3A+your-alias-name))

Once installed, you can perform these commands and follow the indications:

### Add new alias
```sh
gtal {add | new | create}
```
