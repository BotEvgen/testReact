import React, { FC, useEffect, useMemo, useState } from 'react'
import Box from '@mui/material/Box'

import {
   Accordion,
   AccordionDetails,
   AccordionSummary,
   Switch,
   Typography,
} from '@mui/material'

import UCheckBox from '@ui/UCheckBox'

import { ReactComponent as ChevronUpIcon } from '@assets/icons/ChevronUpIcon.svg'

import { useCheckboxes } from '@hooks/useCheckboxes'

import {
   initialMediaContactAccordionState,
   mediaContactFlagStatesInitial,
} from '@widgets/WFilter/MediaContact/const'
import { useMediaContactFilter } from '@hooks/useMediaContactFilter'
import { TMediaContactFlagStatesValue } from '@services/MediaContactFilter/MediaContactFilter.entity'

type TWTransferFilter = {
   onChange: ({ flag_states }: TMediaContactFilterState) => void
}

export type TMediaContactFlagState = {
   checkboxes: Record<TMediaContactFlagStatesValue, boolean>
   switches: Record<TMediaContactFlagStatesValue, boolean>
}

export type TMediaContactFilterState = {
   flag_states: TMediaContactFlagState
}

const WTransferFilter: FC<TWTransferFilter> = ({ onChange }) => {
   const { queryUtils, dependencies } = useMediaContactFilter()

   const [accordionState, setCurrentAccordionState] = useState<
      Record<string, boolean>
   >(initialMediaContactAccordionState)

   const initialCheckboxStateOfFlags = useMemo(() => {
      const initialValueOfCheckboxes = {
         ...mediaContactFlagStatesInitial,
      }

      const initialValueOfSwitches = {
         ...mediaContactFlagStatesInitial,
      }

      Object.keys(initialValueOfCheckboxes).forEach((key) => {
         const flagStateKey = key as TMediaContactFlagStatesValue
         const query = queryUtils.getQuery(flagStateKey)

         initialValueOfCheckboxes[flagStateKey] = Boolean(query)

         initialValueOfSwitches[flagStateKey] = query === 'true'
      })

      return {
         initialValueOfCheckboxes,
         initialValueOfSwitches,
      }
   }, [...dependencies.filterDependencies, ...dependencies.flagsDependencies])

   const checkBoxesOfFlagStates = useCheckboxes(
      initialCheckboxStateOfFlags.initialValueOfCheckboxes
   )
   const switchOfFlagStates = useCheckboxes(
      initialCheckboxStateOfFlags.initialValueOfSwitches
   )

   useEffect(() => {
      const stateOfWFilterObj = {
         flag_states: {
            checkboxes: checkBoxesOfFlagStates.stateOfCheckboxes,
            switches: switchOfFlagStates.stateOfCheckboxes,
         },
      }

      onChange(stateOfWFilterObj)
   }, [
      checkBoxesOfFlagStates.stateOfCheckboxes,
      switchOfFlagStates.stateOfCheckboxes,
   ])

   const checkboxesOnChangeGenerator = (
      type: 'flagStates' | 'switchOfFlagStates',
      key: string
   ) => {
      switch (type) {
         case 'flagStates':
            return (e: React.ChangeEvent<HTMLInputElement>) =>
               checkBoxesOfFlagStates.onChangeHandler(e, key)

         case 'switchOfFlagStates':
            return (e: React.ChangeEvent<HTMLInputElement>) =>
               switchOfFlagStates.onChangeHandler(e, key)

         default:
      }
   }

   const filterStateToRender = [
      {
         type: 'flag_states',
         name: 'Флаги',
         component: Object.entries(
            checkBoxesOfFlagStates.stateOfCheckboxes
         ).map(([key, value], index) => (
            <Box
               key={index}
               sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
               }}
            >
               <Box>
                  <UCheckBox
                     checked={value}
                     onChange={checkboxesOnChangeGenerator('flagStates', key)}
                  />

                  <Typography>{key}</Typography>
               </Box>
               <Switch
                  disabled={!checkBoxesOfFlagStates.stateOfCheckboxes[key]}
                  checked={switchOfFlagStates.stateOfCheckboxes[key]}
                  onChange={checkboxesOnChangeGenerator(
                     'switchOfFlagStates',
                     key
                  )}
               />
            </Box>
         )),
      },
   ]

   const onAccordionChange =
      (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
         setCurrentAccordionState({
            ...accordionState,
            [panel]: isExpanded,
         })
      }

   return (
      <Box
         sx={{
            padding: '15px',
         }}
      >
         <Typography
            sx={{
               fontWeight: '400',
               fontSize: '18px',
               lineHeight: '25px',
            }}
         >
            Фильтры
         </Typography>
         <Box
            sx={{
               mt: '20px',
            }}
         >
            {filterStateToRender.map((filter, index) => (
               <Accordion
                  key={index}
                  expanded={accordionState[filter.type]}
                  onChange={onAccordionChange(filter.type)}
               >
                  <AccordionSummary
                     expandIcon={
                        <ChevronUpIcon
                           style={{
                              transform: 'rotate(180deg)',
                              fill: 'grey.default',
                           }}
                        />
                     }
                  >
                     <Typography>{filter.name}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                     <Box
                        sx={{
                           maxHeight: '300px',
                           overflow: 'auto',
                        }}
                     >
                        {filter.component}
                     </Box>
                  </AccordionDetails>
               </Accordion>
            ))}
         </Box>
      </Box>
   )
}

export default WTransferFilter
