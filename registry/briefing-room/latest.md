---yml
releasepage: https://github.com/akaAgar/briefing-room-for-dcs/releases/tag/release-202410.08-241008-171098-11240268625-1
downloadLink: https://github.com/DCS-BR-Tools/briefing-room-for-dcs/releases/download/release-202410.08-241008-171098-11240268625-1/BriefingRoom-V0.5.202410.08.zip
name: Version 0.5.202410.08
tag: "0.5.202410.08"
version: "release-202410.08-241008-171098-11240268625-1"
date: 2024-10-08T12:00:00Z
exe: Tools/BriefingRoom/BriefingRoomDesktop.exe
assets:
  - source: BriefingRoom-V0.5.202410.08.zip/#/BriefingRoom
    target: Tools/BriefingRoom
---
**Old Templates using the Mk1 Progresion system may no longer work**

Added: Progression Mk2
Added: Snapshot auto-saving and reloading state for generators (Toggled by a new icon next to the light and dark mode)
Added:  Don Rudi’s Lase anything script
Added: Task options can now be added to presets
Added: Progression Logic to Campaign missions
Added: Better logic checking for progression
Added: Nearby task support

Fix: Objectives revealing before ready
Fix: Progression not activated when CustomCondition set
Fix: UI issues with Progression
Fix: Laser designation comes with IR laser that comes from satellite
Fix: added missing takeoff waypoint
Fix: grammar (#1004)
Fix: Tabs not being set right after snapshot load
Fix: Cargo objects not getting correct names causing auto task completes
Fixed: Added static and cargo unit spacing
Fix: Ships and statics only spawn one no matter the setting
Fix: The target count of ships was always 1
Fix: Correct KC135MPRS type (can't do boom ops)
Fix: The Airbase coalition is not being reset properly when changing the situation
Fix: ScrambleStart didn't override the uncontrolled setting on the aircraft
Fix: Enemy Cap now orbits properly when in ground start

UI: Added Nearby task support for QuickBuilder
UI: make nearby tasks a little more clearer
UI: Added Fog Of War to Quick builder options
UI: Minor UI issues in quick builder
UI: Ban/Unban by Unit Family
UI: Copy the base task progression settings button

Misc: Debugger can now destroy units of specific objectives

Upgrade: Bump Microsoft.Maui.Graphics from 8.0.90 to 8.0.91 in /Source (#1009)