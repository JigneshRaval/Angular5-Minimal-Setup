ARIA and Dynamic Content	Avoid forced focus changes that are not user-initiated
ARIA and Dynamic Content	Ensure auto-updating dynamic content can be paused, stopped, or hidden
ARIA and Dynamic Content	Ensure content updates define focus updates appropriately
ARIA and Dynamic Content	Ensure that dynamic content is rendered in-line with the controls that change it
ARIA and Dynamic Content	Ensure that textual equivalent information is updated appropriately when an element's state changes
ARIA and Dynamic Content	Inform assistive technologies of changes in content
ARIA and Dynamic Content	Provide an accessible alert method for content changes that occur without explicit user knowledge
Animations	Ensure animated content is sufficiently described in text
Animations	Ensure decorative animations are played a limited number of times
Animations	Ensure elements blink or flash in a safe threshold
Animations	Ensure screen transition animation settles within 5 seconds
Animations	Ensure scripts that cause moving or slow blinking are avoided
CSS	Avoid use of the before, after, pseudo classes for non-decorative content
CSS	Provide text equivalents for icon fonts
Calendar Controls	Ensure calendar components are keyboard accessible
Calendar Controls	Ensure calendar components do not use color alone to convey selection/meaning
Calendar Controls	Ensure calendar components include data tables that properly identify header and data cells
Calendar Controls	Ensure that simulated calendars are rendered inline with the controls that activate them
Calendar Controls	Ensure that when simulated calendars are activated and deactivated focus moves appropriately
Charts and Graphs	Ensure charts and graphs provide an informative and visible alternative description
Color and Contrast	Ensure color is not the sole means of communicating information
Color and Contrast	Ensure color is not the sole means of indicating error messages
Color and Contrast	Ensure color is not used as the sole method of indicating selection
Color and Contrast	Ensure content with color conveys the same meaning without color, directly in the content, on-screen, and without additional user interaction
Color and Contrast	Ensure link text provides sufficient contrast
Color and Contrast	Ensure sufficient contrast is provided when background images are not available.
Color and Contrast	Ensure text and images of text provide sufficient contrast
Color and Contrast	Ensure text background color is specified when the foreground is specified and vice versa
Data Tables	Ensure data tables are formatted using table elements
Dialogs	Ensure keyboard focus returns properly from simulated dialogs
Dialogs	Ensure links that spawn simulated dialogs indicate the fact
Dialogs	Ensure simulated dialogs indicate the beginning and end of content
Dialogs	Ensure that keyboard focus remains within modal simulated dialogs
Dialogs	Ensure that simulated dialogs are rendered inline with the controls that activate them
Dialogs	Ensure that simulated dialogs can be closed via the keyboard
Dialogs	Ensure that when simulated dialogs are activated focus moves appropriately
Embedded Media and Object Elements	Provide a text transcript for audio only presentations
Embedded Media and Object Elements	Provide text transcript or audio track of video only presentations
Focus Control	Avoid using event handlers that trigger focus changes
Focus Control	Ensure interactive elements can be visually distinguished from non-actionable ones
Focus Control	Ensure keyboard focus is indicated visually
Forms	Provide a consistent implementation of error and alert mechanisms
Forms	Provide alternatives for audio cues
Forms	Provide visual labels or instructions for user input
Images	Ensure CSS background images that convey meaning have textual and visible equivalents
Keyboard Accessibility	Ensure JavaScript functionality is accessible from the keyboard
Keyboard Accessibility	Ensure all active elements receive keyboard focus
Keyboard Accessibility	Ensure keyboard focus is not trapped
Keyboard Accessibility	Provide documentation for non-standard or alternative keyboard commands that are required for access
Lists	Ensure implicit list markup is avoided
Live Regions	Indicate live regions for dynamically changing content
Multi-column List View Controls	Ensure selectable rows are keyboard accessible
Multi-column List View Controls	Ensure sortable headers can be triggered from the keyboard
Multi-column List View Controls	Ensure sortable headers include proper text alternatives
Multimedia Alternatives	Ensure auditory multimedia content is sufficiently described in the captions
Multimedia Alternatives	Ensure visual multimedia content is sufficiently described in the audio portion of the multimedia
Multimedia Control Playback	Ensure audio is not played automatically on load
Navigation	Ensure a valid skip link target is present and is located appropriately
Navigation	Ensure speech is not the only means to access content
Page Structure	Avoid the use of implicit headings
Page Structure	Ensure blockquote is used for long quotes
Page Structure	Ensure content is visible to assistive technologies
Page Structure	Ensure heading level matches the heading's visual importance/level
Page Structure	Ensure headings and labels are descriptive and unique
Page Structure	Ensure off-screen and hidden content is not rendered by assistive technology
Page Structure	Ensure page reading order coincides with the focus order of the page
Page Structure	Ensure proper markup is used to mark emphasized or special text
Page Structure	Ensure shape and location are not the sole methods used to communicate information or hierarchy
Page Structure	Ensure short quotations are wrapped in q elements
Page Structure	Ensure that proper quotation markup is used
Page Structure	Ensure that the reading order of content is logical
Page Structure	Provide an alternative to scrollable div areas
Simulated Controls	Ensure simulated controls are keyboard accessible
Standalone, attached, and context menus	Ensure fields indicate attached menus
Standalone, attached, and context menus	Ensure keyboard and programmatic focus moves to opened menus
Standalone, attached, and context menus	Ensure keyboard focus returns properly when menus are closed
Standalone, attached, and context menus	Ensure sub-menu items are keyboard accessible and contain text equivalents
Standalone, attached, and context menus	Ensure that menus are rendered inline with the controls that activate them
Trees and Outlines	Ensure tree and outline components provide a textual name and type
Trees and Outlines	Ensure tree and outline components provide textual level information
Trees and Outlines	Ensure tree and outline components provide textual position information
Trees and Outlines	Ensure tree and outline components provide textual state information
Trees and Outlines	Ensure tree and outline node components are accessible from the keyboard
ARIA	Avoid inappropriate use of ARIA roles, states, and properties
ARIA	Ensure ARIA regions, landmarks and HTML sections are identifiable
ARIA	Ensure elements that use ARIA provide non-ARIA fallback accessible content
1	We can add title="" attribute as a non-ARIA fallback if required or add hidden span for extra detail for those AT which does not support "title" also
2	All the Dialog popup ( Dropdown Menus ) need a non-ARIA fallback content.
3	All the <LI> Tags with or without role="presentation" , doesn't require any fallback content, because it is used for layout purpose




4	UL elements doesn't require any non-ARIA fallback.


ARIA and Dynamic Content	Avoid forced focus changes that are not user-initiated

Dialogs	Provide a descriptive dialog title

Keyboard Accessibility	Ensure keyboard focus is not provided to inactive elements

Simulated Controls	Ensure custom controls provide proper textual roles and descriptions
Standalone, attached, and context menus	Ensure menus can be opened from the keyboard
