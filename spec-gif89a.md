## Color Tables

two scopes:

-   Global Color Table
-   Local Color Table

Local used for the immediately follows data stream.
if no Local to use, then use the Global

## Blocks

three groups

-   Control (used to control the process of the data stream or setting hardware parameters)
    -   Header
    -   Logical Screen Descriptor
    -   Graphic Control Extension
    -   Trailer
-   Graphic-Rendering (data to render a graphic)
    -   Image Descriptor
    -   Plain Text Extension
-   Special Purpose (transparent to the decoding process)
    -   Comment Extension
    -   Application Extension

labels range

-   0x00-0x7F (excluding 0x3B) Graphic-Rendering Blocks
-   0x80-0xF9 Control blocks
-   0xFA-0xFF Special Purpose blocks
-   0x3B Trailer

## Data Sub-block

```
         7 6 5 4 3 2 1 0        Field Name                    Type
        +---------------+
    0   |               |       Block Size                    Byte
        +---------------+
    1   |               |
        +-             -+
    2   |               |
        +-             -+
    3   |               |
        +-             -+
        |               |       Data Values                   Byte
        +-             -+
    up  |               |
        +-   . . . .   -+
    to  |               |
        +-             -+
        |               |
        +-             -+
    255 |               |
        +---------------+
```

## Block Terminator

```
         7 6 5 4 3 2 1 0        Field Name                    Type
        +---------------+
    0   |               |       Block Size                    Byte
        +---------------+
```

## Header

```
      7 6 5 4 3 2 1 0        Field Name                    Type
     +---------------+
   0 |               |       Signature                     3 Bytes
     +-             -+
   1 |               |
     +-             -+
   2 |               |
     +---------------+
   3 |               |       Version                       3 Bytes
     +-             -+
   4 |               |
     +-             -+
   5 |               |
     +---------------+
```

## Logical Screen Descriptor (immediately after the Header)

```
      7 6 5 4 3 2 1 0        Field Name                    Type
     +---------------+
  0  |               |       Logical Screen Width          Unsigned
     +-             -+
  1  |               |
     +---------------+
  2  |               |       Logical Screen Height         Unsigned
     +-             -+
  3  |               |
     +---------------+
  4  | |     | |     |       <Packed Fields>               See below
     +---------------+
  5  |               |       Background Color Index        Byte
     +---------------+
  6  |               |       Pixel Aspect Ratio            Byte
     +---------------+
```
