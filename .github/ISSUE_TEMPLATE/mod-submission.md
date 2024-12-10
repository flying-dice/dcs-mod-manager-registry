---
name: Mod Submission
about: Issue Template for Submitting a new mod or amendment to existing mod
title: "[SUBMISSION] - Mod Name"
labels: mod-submission
assignees: ''

---

## Mod Submission

Before submitting your mod, please ensure the following:

- [ ] **Index Data**: Contains metadata and description for your mod.
- [ ] **Release Data**: Includes the latest release version details and download links.
- [ ] **Image File**: A preview image (`index.png` or `index.jpg`) is included in the mod folder.

---

## Mod Details

### Mod Name
[Enter the name of your mod]

### Description
[Provide a brief description of your mod, including its purpose and key features.]

### Homepage
[Provide the homepage URL for your mod]

### Authors
[List the authors of your mod. Include name, avatar URL, and homepage URL for each author if applicable.]

### Tags
[List tags for your mod to assist with filtering in the mod browser.]

### Category
[Enter the category for your mod (e.g., Aircraft, Tools, Missions).]

### License
[Specify the license under which your mod is distributed.]

### Preview Image
Attach or provide the image file representing your mod (e.g., `index.png` or `index.jpg`).

---

## Latest Version Details

### Release Name
[Enter the name of the release]

### Version Number
[Enter the version number of your mod, e.g., `1.0.0`]

### Release Page
[Provide the release page URL for your mod.]

### Release Date
[Enter the release date of your mod.]

### Executable Path (Optional)
[Specify the path to an executable file if applicable.]

### Assets
[List the assets included in this release. For each asset, specify the source (e.g., file URL) and target installation path.]

Example:
```
assets:
  - source: https://github.com/flying-dice/dcs-hot-loader/releases/download/v1.0.2/dcs-hot-loader.lua
    target: '{{DCS_WRITE_DIR}}/Scripts/Hooks/dcs-hot-loader.lua'
```

---

## Additional Information

### Dependencies
[List any dependencies your mod requires to function correctly.]

### Notes
[Add any additional notes or comments about your mod submission.]

---

Thank you for your contribution to the DCS DROPZONE Registry!
