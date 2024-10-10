import "./urlController.js"
import {dispatchSlotSize, map} from "./mapbox/mapboxComponent.js"
import { setDispatchFilter } from "./components/leftMenu/leftMenuComponent.js";
import {} from "./mapHidingScript.js"
import  "./components/main/main.js"
import  "./components/bottom/BottomComponent.js"
import "./components/leftMenu/leftMenuComponent.js"
import { setDispatchIsBottomListOpen, setDispatchSlotSize } from "./components/main/main.js";
import { dispatchBoundaryParam, dispatchFilterParam, dispatchIsButtomListOpen, dispatchSortState, reloadBottomList } from "./components/bottom/BottomComponent.js";
import { setDispatchBoundaryParam } from "./mapbox/viewInfos/viewInfos.js";
import { setCustomRenderForTeaserFilterMenu } from "./components/rightMenu/teaserFilterMenu.js";
import { setDispatchSortState } from "./components/main/floatingActionButton/floatingActionButton.js";
import { setDispatchFavoritList } from "./components/bottom/cardComponent/CardComponent.js";
import { dispatchFavoritList } from "./components/leftMenu/favoritList/favoritList.js";
import { LayerComponent } from "./components/leftMenu/layerVisible/layerComponent.js";



setDispatchSlotSize(dispatchSlotSize)
setDispatchIsBottomListOpen(dispatchIsButtomListOpen)
setDispatchFilter(dispatchFilterParam)
setDispatchBoundaryParam(dispatchBoundaryParam)
setCustomRenderForTeaserFilterMenu(reloadBottomList)
setDispatchSortState(dispatchSortState)
setDispatchFavoritList(dispatchFavoritList)
