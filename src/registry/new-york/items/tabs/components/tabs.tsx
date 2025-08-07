import {
  DBTabItem,
  DBTabList,
  DBTabPanel,
  DBTabs,
} from "@db-ux/react-core-components"

export function Tabs() {
  return (
    <DBTabs>
      <DBTabList>
        <DBTabItem>Tab 1</DBTabItem>
        <DBTabItem>Tab 2</DBTabItem>
        <DBTabItem>Tab 3</DBTabItem>
      </DBTabList>
      <DBTabPanel>Tab Panel 1</DBTabPanel>
      <DBTabPanel>Tab Panel 2</DBTabPanel>
      <DBTabPanel>Tab Panel 3</DBTabPanel>
    </DBTabs>
  )
}
