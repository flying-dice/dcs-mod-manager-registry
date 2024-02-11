---yml
releasepage: https://github.com/Kinkkujuustovoileipa/uh-60l/releases/tag/1.4
name: UH-60L 1.4
tag: "1.4"
version: "1.4"
date: 2023-01-07T12:00:00Z
assets:
  - source: uh-60l-1.4.zip/#/UH-60L
    target: Mods/aircraft/UH-60L 
---

UH-60L 1.4
Fixes
System Fixes
Fixed: ASN-128B would decrement from waypoint 0 to waypoint 69 - credit: Sniporbob
Fixed: ASN-128B would always edit the waypoint being navigated to instead of the waypoint selected to edit - credit: Sniporbob
Fixed: ARC-186 MAN and PRE mode would not match the position of the AM/FM/MAN/PRE switch - credit: Sniporbob
Fixed: Key binding for formation light decrease had invalid logic preventing use - credit: Tanuki44
Fixed: Situation where key binding for Stabilator Auto - ON and Stabilator Auto - OFF could have inverted functionality - credit: Sniporbob
Fixed: HSI course deviation bar only worked flying towards VOR, not away - credit: Sniporbob
Fixed: HSI km readout digits could all turn independently of each other - credit: Sniporbob
Fixed: HSI km readout digits would spin backwards when crossing from 9 to 0 - credit: Sniporbob
Fixed: HSI displayed true north instead of magnetic north - credit: twanmal
Fixed: Ground crew would only talk to the pilot through the pilot's door instead of other open doors - credit: Sniporbob

Sound Fixes
Fixed: Typo in APR39 sound file names caused errors to appear in DCS log file - credit: Sniporbob
Fixed: APR39 was not properly classifying and calling out SAM threats with their SA number - credit: Lynx13D
Fixed: Filename conflict caused certain Combined Arms and WWII Asset Pack vehicle sounds to be absent - credit: DD_Friar and DD_Sid
Fixed: Exterior noises were only heard when the Pilot door was open - credit: Sniporbob

Complete ARC-201 Overhaul - credit: Sniporbob
-- Fixes --
Fixed: ARC-201 MAN preset could be changed by simply pressing the CLR key
Fixed: ARC-201 display would remain on when function switch set to LD
Fixed: ARC-201 frequency input was not left justified
Fixed: ARC-201 allowed input of invalid frequencies
Fixed: ARC-201 was willing to wait forever for user to input a frequency

New Features
Added: ARC-201 Self Test function (decorative only, does not check for damage)
Added: ARC-201 editable single channel presets
Added: ARC-201 single channel offset feature
Added: ARC-201 Zeroize and Stow functions (be careful!)
Added: ARC-201 SINCGARS frequency hopping mode, enabled by choosing FH or FM-M (SRS compatible)
Added: ARC-201 hopset clearing, loading hopset from preset into working memory, storing to preset, and editing NET ID
Added: ARC-201 sound effects (beep for self test and for certain hopset manipulations)
Added: ARC-201 full implementation of single channel preset scanning and all relevant commands** (SRS compatible)
**NOTE: Scanning feature REQUIRES use of the UH-60's "SRS PTT" key binding as well as selecting which radio the player desires to transmit on via ICP panel knob. The SRS key bindings should NOT be used to control the radio. Failure to use the in-cockpit controls will result in broken and unintelligible transmissions on any radio actively utilizing the scan feature.

Download UH60L.1.4.zip, seen below.

DO NOT DOWNLOAD SOURCE CODE, IT WILL NOT WORK!