# DCS DROPZONE Registry

This is the registry for the DCS DROPZONE community mod manager.

It contains all the mods that are available for download in DCS DROPZONE.

## Contributing

If you want to add your mod to the registry, please raise an issue or a PR with the following changes:

1. Add a new folder to the `registry` folder with the name of your mod
2. Add a `index.md` file to the folder you just created
3. Add a `latest.md` file to the folder you just created
4. Add an `index.png` or `index.jpg` file to the folder you just created

Once your pull request is merged, your mod will be available for download in DCS DROPZONE.

## GitHub Integration

Adding this means that you can use GitHub to host your mod files and releases
and the registry will automatically update when you create a new release.

To do this, you need to create a new repository in GitHub with the name of your mod, then create a new release
with the version of your mod and the release files.

You should then add a webhook to your repository with the following settings:

- **Payload URL:** https://dcs-mod-manager-registry.pages.dev/integrations/github
- **Content Type:** application/json
- **Secret:** PROVIDED AS PART OF THE PULL REQUEST APPROVAL 
  - *This is a signed JWT. The JWT Contains the folder to be updated and the action event contains the GH Repo to get releases from so use the issued token per mod/repo combo*
- **SSL verification** should be enabled.
- **Which events would you like to trigger this webhook?:** Let me select individual events. > Releases

## Markdown Files

The markdown files are used to provide information to the user about your mod, they contain an index
and a latest file.

They are read using https://www.npmjs.com/package/gray-matter which parses the yaml front matter and
the markdown content.

Anything valid for the library gray-matter is valid for the markdown files including the ability to
use TOML, JSON, YAML or any other format that can be parsed by gray-matter.

The files must follow the front matter format as below.

```markdown
---yml
THESE ARE YOUR METADATA FIELDS
---
THIS IS YOUR CONTENT
```

For a complete example of a markdown file, see the [example-mod](registry/example-mod) folder.

### index.md

The `index.md` file contains the metadata for your mod. It should be in the following format:

| Field Name  | Type                                 | Description                                                                      |
|-------------|--------------------------------------|----------------------------------------------------------------------------------|
| name        | string                               | The name of the mod                                                              |
| description | string                               | A short description of the mod to be displayed in the mod tile                   |
| homepage    | string (URL)                         | The homepage of the mod                                                          |
| authors     | array(string \| {name, avatar, url}) | The authors of the mod either as a string or an object with name, avatar and url |
| tags        | array(string)                        | The tags of the mod, these are used to filter mods in the mod browser            |
| category    | string                               | The category of the mod, this is used to group mods in the mod browser           |
| license     | string                               | The license of the mod                                                           |

The Content of the file is the content that is displayed to the user when they open the mod page.

### latest.md

The `latest.md` file contains the latest version of your mod. It should be in the following format:

| Field Name | Type              | Description             |
|------------|-------------------|-------------------------|
| name       | string            | The name of the version |
| version    | string            | The version of the mod  |
| date       | string (ISO 8601) | The date of the version |

The Content of the file is the content that is displayed to the user when they open the release info
modal.

## Image Files

The image files are used to provide a preview of your mod to the user. It should either be a PNG or
JPG file located in the root of your mod folder.