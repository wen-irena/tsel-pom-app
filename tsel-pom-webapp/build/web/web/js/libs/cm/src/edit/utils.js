import{clearCaches}from"../measurement/position_measurement.js";export function themeChanged(e){e.display.wrapper.className=e.display.wrapper.className.replace(/\s*cm-s-\S+/g,"")+e.options.theme.replace(/(^|\s)\s*/g," cm-s-"),clearCaches(e)};