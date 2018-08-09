import React from 'react'

import { TransitionGroup, CSSTransition } from 'react-transition-group'

const childFactoryCreator = (props) => child => React.cloneElement(child, props)

export default ({ transition = '', duration = 0, pageKey, children }) => (

  <TransitionGroup
    childFactory={childFactoryCreator({ classNames: transition, timeout: duration })}
  >
    <CSSTransition key={pageKey}>
      <div>{ children }</div>
    </CSSTransition>
  </TransitionGroup>
)
export { default as slideRight } from './slideRight'

export { default as slideLeft } from './slideLeft'
export { default as scale } from './scale'