# DCS DROPZONE Registry

Welcome to the **DCS DROPZONE Registry**! This is the central hub for all mods available in the DCS DROPZONE community mod manager. Whether you're here to share your creation or explore others' mods, this guide will help you get started.

---

## 📥 How to Contribute

We’re thrilled about your interest in contributing to the DCS DROPZONE! Follow these simple steps to add your mod to the registry:

### Step 1: Create a New Folder
1. Navigate to the `registry` folder.
2. Create a new folder named after your mod.

### Step 2: Add Key Files
In your new folder, include the following files:
- **`index.md`**: Metadata and description of your mod.
- **`latest.md`**: Details of the latest version of your mod.
- **Image File** (`index.png` or `index.jpg`): A preview image representing your mod.

> **Example**: Refer to the [example-mod](registry/example-mod) folder for a simple example.

### Step 3: Submit Your Mod
- **Preferred Method**: Submit a pull request to this repository. Once approved, your mod will be added to the registry.
- **Alternative Method**: Use the **Issue Tracker**. Create a new issue using the `Mod Submission` template.

---

## 🛠️ Testing Your Mod Locally

To test your mod after adding it to the registry:

1. Run the following command to start a local server:
   ```bash
   npm run dev
   ```

2. Access the server at `http://127.0.0.1:8080/` to preview your mod.

3. Open DCS DROPZONE and update the registry URL to `http://127.0.0.1:8080/` to view your mod in the mod manager.

---

## 📜 Schemas and Documentation

### Registry API
We provide OpenAPI documentation for the Registry API, accessible at `/schema.json`.

- **Main:** [Swagger UI](https://petstore.swagger.io/?url=https://dcs-mod-manager-registry.pages.dev/schema.json)
- **Local:** [Swagger UI](https://petstore.swagger.io/?url=http://127.0.0.1:8080/schema.json)

### Registry File Schema
A JSON schema is available for the Registry MD files at `/registry.schema.json`.

- **Main:** [JSON Schema Viewer](https://json-schema.app/view/%23?url=https%3A%2F%2Fdcs-mod-manager-registry.pages.dev%2Fregistry.schema.json)
- **Local:** [JSON Schema Viewer](https://json-schema.app/view/%23?url=http%3A%2F%2F127.0.0.1%3A8080%2Fregistry.schema.json)

---

## 📝 Markdown Files

The `index.md` and `latest.md` markdown files serve as the primary source of information for your mod. These files are parsed using [gray-matter](https://www.npmjs.com/package/gray-matter) and support formats like TOML, JSON, and YAML.

### Markdown Structure
Use the following front matter format in your markdown files:
```markdown
---
# Metadata Fields
---
# Content
```
Refer to the [example-mod](registry/example-mod) for detailed examples.

### `index.md`
This file contains your mod’s metadata and serves as the description displayed to users when they view your mod’s page. Check the documentation for available metadata fields.

### `latest.md`
This file defines the latest version of your mod, including:
- **Assets**: Files to be downloaded and installed.
- **Target Field**: Specify installation paths using templated DCS variables:
    - `{{DCS_INSTALL_DIR}}`: DCS installation directory (e.g., `C:\Program Files\Eagle Dynamics\DCS World`).
    - `{{DCS_USER_DIR}}`: DCS user directory (e.g., `%USERPROFILE%\Saved Games\DCS`).

The content of this file is displayed to users when they open the release information modal.

---

## 🖼️ Image Files

Include a preview image (`index.png` or `index.jpg`) in the root of your mod folder. This image will visually represent your mod to users.

---

Thank you for contributing to the DCS DROPZONE Registry! We look forward to seeing your amazing creations!

