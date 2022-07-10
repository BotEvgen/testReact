import { ReactNode } from 'react'

interface ILinkData {
   icon: ReactNode
   href: string
   isNested: boolean
   nestedItems: Record<string, ILinkData> | null
}

export type { ILinkData }
