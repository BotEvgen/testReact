import React from 'react'

import WDrop from '@widgets/WRnD/WDrop'
import WDrag from '@widgets/WRnD/WDrag'

type TWRnD = React.FC & {
   Drop: typeof WDrop
   Drag: typeof WDrag
}

const WRnD: TWRnD = () => null

WRnD.Drop = WDrop
WRnD.Drag = WDrag

export default WRnD
