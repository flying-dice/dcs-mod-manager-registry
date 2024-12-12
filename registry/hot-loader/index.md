[![Join Discord](https://img.shields.io/badge/Join-blue?logo=discord&label=Discord)](https://discord.gg/bT7BEHn5RD)
[![Discord](https://img.shields.io/discord/738118932937834566?logo=discord&label=Discord)](https://discord.com/channels/738118932937834566/1178991295260278785)
[![tslua-codebot](https://img.shields.io/badge/CodeBot-tslua%20dcs-blue?logo=openai)](https://chat.openai.com/g/g-6643nUbup-tslua-dcs-codebot)
[![patreon](https://img.shields.io/badge/Patreon-flyingdice-red?logo=patreon)](https://patreon.com/flyingdice)

![logo](https://github.com/flying-dice/dcs-hot-loader/blob/main/.dropzone/index.png?raw=true)

DCS Hot Loader is a tool to allow for hot loading of lua scripts in DCS World.

It exposes a REST API to allow for the execution of lua scripts.

## Usage

> To run the below tests, create a file called `hello-world.lua` in your `DCS\Scripts` folder with the following contents
>
> ```lua
> -- C:\Users\username\Saved Games\DCS.openbeta\Scripts\hello-world.lua
> if (log and log.info) then
>     log.info("Hello World!")
> else
>     print("Hello World!")
> end
> ```

The server will automatically start when you start DCS World.

To use the server, make a request to the following endpoint

```shell
curl --location 'http://127.0.0.1:7943/dofile' \
--header 'Content-Type: application/json' \
--data '{
    "path": "{WRITE_DIR}\\Scripts\\hello-world.lua",
    "target": "gui"
}'
```

### Target

The target parameter should be one of the following

- `gui` (GameGUI)
- `mission` (Mission Scripting Environment)

### Variables

The following variables are available for path replacements, ofc you can also use absolute paths

| Key         | Function           | Example                                                   |
| ----------- | ------------------ | --------------------------------------------------------- |
| WRITE_DIR   | `lfs.writedir()`   | `C:\\Users\\jonat\\Saved Games\\DCS.openbeta\\`           |
| INSTALL_DIR | `lfs.currentdir()` | `D:\\Program Files\\Eagle Dynamics\\DCS World OpenBeta\\` |
| TEMP_DIR    | `lfs.tempdir()`    | `C:\\Users\\jonat\\AppData\\Local\\Temp\\DCS.openbeta\\`  |

To get an active list of variables, make a request to the following endpoint

```shell
curl --location 'http://127.0.0.1:7943/health'
```

### Response

Once executed the response will be the resolved URL or any errors

> **Note:** When using the `mission` target, the response may not indicate errors with resolving the path, but you will receive an alert in mission

```json
{
    "status": "OK",
    "path": "C:/Users/username/Saved Games/DCS.openbeta//Scripts/hello-world.lua",
    "target": "gui"
}
```
