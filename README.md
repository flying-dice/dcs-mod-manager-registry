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

## GitHub Integration

Enhance your mod's accessibility and update process by integrating with GitHub! Follow these steps:

1. **Host Your Mod on GitHub**: Ensure your mod releases are hosted in a GitHub repository.
2. **Set Up a Webhook**: In your repository settings, add a webhook with these configurations:
  - **Payload URL:** `https://develop.dcs-mod-manager-registry.pages.dev/integrations/github?token=YOUR_TOKEN`
  - **Content Type:** `application/json`
  - **Secret:** Leave this field empty.
  - **SSL Verification:** Enable this option.
  - **Trigger Events:** Select 'Releases'.

### TOKEN Guidelines:
- **Requesting a Token**: Obtain your token through an initial setup MR or a dedicated issue.
- **Security and Use**: Tokens are unique JWTs linked to your mod folder and GitHub repository. They are meant for single-use and should not be shared.
- **Verification**: You can verify your token's contents at any time on [jwt.io](https://jwt.io/).

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