
import React from 'react';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

const childFactoryCreator = props => child => React.cloneElement(child, props);


// The location prop is immutable, so the exiting and entering components will have a unique prop that can be used as a key
//


export const HeaderTransition = ({
  headerTransition = '', duration = 0, pageKey, children,
}) => (

  <TransitionGroup
    childFactory={childFactoryCreator({ classNames: headerTransition, timeout: duration })}
  >
    <CSSTransition key={`${pageKey}-header`}>
      <div>
        { children }
      </div>
    </CSSTransition>
  </TransitionGroup>

);

export const BodyTransition = ({
  bodyTransition = '', duration = 0, pageKey, children,
}) => (

  <TransitionGroup
    childFactory={childFactoryCreator({ classNames: bodyTransition, timeout: duration })}
  >
    <CSSTransition key={`${pageKey}-body`}>
      <div>
        { children }
      </div>
    </CSSTransition>
  </TransitionGroup>
);


export { default as slideRight } from './slideRight';

export { default as slideLeft } from './slideLeft';
export { default as scale } from './scale';
