# inviewport-vuejs-directive
A simple vuejs directive to check if DOM element is in viewport

# Classes
the classes that are added to the element are:

--> below-viewport (the element is below the viewport)

--> partially-in-viewport-bottom (the element is in the viewport but not entirely, the bottom part is below)

--> partially-in-viewport-middle (the element is in the viewport but it's higher then the viewport so part of it is above, part is below)

--> fully-in-viewport (the element is fully in the viewport)

--> partially-in-viewport-top (the element is in the viewport but not entirely, the top part is above)

--> above-viewport (the element is above the viewport)

# Options
the options are set like so

v-in-viewport="{'debugMode':true}";

the available options are:

{

'vMarginTop' : number,

'vMarginBottom' : number,

'once' : boolean,

'debugMode' : boolean

}

--> vMarginTop and vMarginBottom are used to resize the viewport on which the element position is calculated.

--> When once is set to true the classes partially-in-viewport-middle and fully-in-viewport will not be removed once placed.

--> When debugMode is set to true the numbers on which the element position is calculated will be displayed and console logged. The viewport margins will be displayed as well if set.

# Files

the index.html is a all in one page working example.

the in-viewport.js is the actual file I import as a plugin in nuxt to use the directive.
