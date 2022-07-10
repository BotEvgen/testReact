import { CompositeDecorator } from 'draft-js'

import { ReactComponent as CodeBlockIcon } from '@assets/icons/CodeBlockIcon.svg'

import ELink from '@widgets/WEditor/CustomEditorControls/Link'
import { findLinkEntities } from '@widgets/WEditor/CustomEditorControls/Link/helpers'

const BLOCK_TYPES = [
   {
      label: <i className="RichEditor-icon icon-heading-2" />,
      style: 'header-two',
   },
   {
      label: <i className="RichEditor-icon icon-heading-3" />,
      style: 'header-three',
   },
   {
      label: <i className="RichEditor-icon icon-blockquote" />,
      style: 'blockquote',
   },
   {
      label: <i className="RichEditor-icon icon-ul" />,
      style: 'unordered-list-item',
   },
   {
      label: <i className="RichEditor-icon icon-ol" />,
      style: 'ordered-list-item',
   },
   {
      label: <CodeBlockIcon />,
      style: 'code-block',
   },
]

const INLINE_STYLES = [
   { label: <i className="RichEditor-icon icon-bold" />, style: 'BOLD' },
   { label: <i className="RichEditor-icon icon-italic" />, style: 'ITALIC' },
   {
      label: <i className="RichEditor-icon icon-underline" />,
      style: 'UNDERLINE',
   },
]

const decorators = new CompositeDecorator([
   {
      strategy: findLinkEntities,
      component: ELink.View,
   },
])

export { BLOCK_TYPES, INLINE_STYLES, decorators }
