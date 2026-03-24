import { create } from 'zustand'

interface LayoutState {
  navRailExpanded: boolean
  subNavCollapsed: boolean
  subNavPinned: boolean
  operationsPanelExpanded: boolean
  operationsPanelHeight: number
  splitPanePosition: number
  setNavRailExpanded: (v: boolean) => void
  setSubNavCollapsed: (v: boolean) => void
  setSubNavPinned: (v: boolean) => void
  setOperationsPanelExpanded: (v: boolean) => void
  setOperationsPanelHeight: (v: number) => void
  setSplitPanePosition: (v: number) => void
}

export const useLayoutStore = create<LayoutState>((set) => ({
  navRailExpanded: true,
  subNavCollapsed: false,
  subNavPinned: true,
  operationsPanelExpanded: false,
  operationsPanelHeight: 240,
  splitPanePosition: 420,
  setNavRailExpanded: (v) => set({ navRailExpanded: v }),
  setSubNavCollapsed: (v) => set({ subNavCollapsed: v }),
  setSubNavPinned: (v) => set({ subNavPinned: v }),
  setOperationsPanelExpanded: (v) => set({ operationsPanelExpanded: v }),
  setOperationsPanelHeight: (v) => set({ operationsPanelHeight: v }),
  setSplitPanePosition: (v) => set({ splitPanePosition: v }),
}))
