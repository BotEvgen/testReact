import { TMediaContactFlagsEntity } from '@services/MediaContactFilter/MediaContactFilter.entity'

const initialMediaContactAccordionState = {
   flag_states: true,
}

const mediaContactFlagStatesInitial: TMediaContactFlagsEntity = {
   is_active: false,
   public: false,
}

export { initialMediaContactAccordionState, mediaContactFlagStatesInitial }
