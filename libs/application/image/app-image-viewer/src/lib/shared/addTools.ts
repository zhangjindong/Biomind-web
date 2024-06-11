import {
  PanTool,
  PlanarRotateTool,
  StackScrollMouseWheelTool,
  ToolGroupManager,
  WindowLevelTool,
  ZoomTool,
  addTool,
} from '@cornerstonejs/tools';
import { MouseBindings } from '@cornerstonejs/tools/src/enums/ToolBindings';
export const manipulationToolGroupID = 'manipulationToolGroupID';
// 基础操作工具
export function addManipulationTool() {
  addTool(PanTool);
  addTool(ZoomTool);
  addTool(StackScrollMouseWheelTool);
  addTool(WindowLevelTool);
  addTool(PlanarRotateTool);

  // Define a tool group, which defines how mouse events map to tool commands for
  // Any viewport using the group
  const toolGroup = ToolGroupManager.createToolGroup(manipulationToolGroupID);

  // Add tools to the tool group
  toolGroup?.addTool(WindowLevelTool.toolName);
  toolGroup?.addTool(PanTool.toolName);
  toolGroup?.addTool(ZoomTool.toolName);
  toolGroup?.addTool(StackScrollMouseWheelTool.toolName, { loop: false });
  toolGroup?.addTool(PlanarRotateTool.toolName);

  toolGroup?.setToolActive(WindowLevelTool.toolName, {
    bindings: [
      {
        mouseButton: MouseBindings.Primary, // Left Click
      },
    ],
  });
  toolGroup?.setToolActive(PanTool.toolName, {
    bindings: [
      {
        mouseButton: MouseBindings.Auxiliary, // Middle Click
      },
    ],
  });
  toolGroup?.setToolActive(ZoomTool.toolName, {
    bindings: [
      {
        mouseButton: MouseBindings.Secondary, // Right Click
      },
    ],
  });
  return toolGroup;
}
