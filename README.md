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

- **Config File:** `index.yaml` YAML file containing metadata for your mod.
- **Content File** `index.md` Markdown file that will be seen by users in the mod manager when they view your mod.
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

A JSON schema is available for the Registry Files at `/registry.schema.json`.

- **Main:** [JSON Schema Viewer](https://json-schema.app/view/%23?url=https%3A%2F%2Fdcs-mod-manager-registry.pages.dev%2Fregistry.schema.json)
- **Local:** [JSON Schema Viewer](https://json-schema.app/view/%23?url=http%3A%2F%2F127.0.0.1%3A8080%2Fregistry.schema.json)

---

Thank you for contributing to the DCS DROPZONE Registry! We look forward to seeing your amazing creations!
