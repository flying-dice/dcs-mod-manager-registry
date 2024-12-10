# DCS DROPZONE Registry

Welcome to the DCS DROPZONE Registry! This is the central hub for all mods available in the DCS DROPZONE community mod manager. 

## How to Contribute

We're excited about your interest in contributing to the DCS DROPZONE! 

To add your mod to the registry, follow these simple steps:

1. **Create a New Folder**: Inside the `registry` folder, create a new folder named after your mod.
2. **Add Key Files**: In your new folder, add the following files:
  - `index.md`: For your mod's metadata and description.
  - `latest.md`: To detail the latest version of your mod.
  - An image file (`index.png` or `index.jpg`): To visually represent your mod.

Check out the [example-mod](registry/example-mod) folder as a guide for setting up your mod's directory.

Once your pull request is merged, your mod will be available for download in DCS DROPZONE.

Alternatively, you can submit your mod through the Issue Tracker. Just create a new issue with the `mod-submission` label and attach your mod information.

## Testing

To test your mod locally once it has been added, you can run the following command:

```bash
npm run dev
```

This will start a local server at `http://127.0.0.1:8080/` where you can view your mod.

Load DCS DROPZONE and change the registry URL to `http://127.0.0.1:8080/` to see your mod within the mod manager.

## Schemas and Docs

## Registry API

For the Registry API, we produce OpenAPI documentation. This is build and accessible from `/schema.json`.

To view the Swagger UI open https://petstore.swagger.io/?url=http://127.0.0.1:8080/schema.json

## Registry File Schema

For the Registry MD files, we produce a JSON schema. This is build and accessible from `/registry.schema.json`.

To view the schema, open https://json-schema.app/view/%23?url=http%3A%2F%2F127.0.0.1%3A8080%2Fregistry.schema.json

## About Markdown Files

The markdown files (`index.md` and `latest.md`) serve as the primary source of information for users about your mod. We use [gray-matter](https://www.npmjs.com/package/gray-matter) for parsing these files, supporting various formats like TOML, JSON, YAML, etc.

### Structure of Markdown Files:
Use the following front matter format in your markdown files:
```markdown
---yml
# Metadata Fields
---
# Content
```
Refer to the [example-mod](registry/example-mod) for a detailed markdown file example.

### index.md

The `index.md` file contains the metadata for your mod. Check the Docs for the available fields.

The Content of the file is the content that is displayed to the user when they open the mod page.

### latest.md

The `latest.md` file contains the latest version of your mod including assets to be downloaded and installed. Check the Docs for the available fields.

The `target` field takes a string that can be templated with the DCS variables i.e. `{{DCS_WRITE_DIR}}`.

This variable is replaced with the DCS installation directory when the mod is installed.

The available variables are:
- `{{DCS_INSTALL_DIR}}`: The DCS installation directory. i.e. `C:\Program Files\Eagle Dynamics\DCS World`
- `{{DCS_USER_DIR}}`: The DCS user directory. i.e. `%USERPROFILE%\Saved Games\DCS` where `%USERPROFILE%` is the user's home directory like `C:\Users\JohnDoe`

The Content of the file is the content that is displayed to the user when they open the release info
modal.

## Image Files

The image files are used to provide a preview of your mod to the user. It should either be a PNG or
JPG file located in the root of your mod folder.