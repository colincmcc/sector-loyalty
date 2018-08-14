//
// @flow
//

import { injectGlobal, keyframes } from 'styled-components';

const bodyTransitionClassName = 'slideLeft';
const headerTransitionClassName = 'headerSlideLeft';

const duration = 300;

// Old content is exiting to the left
const slideOut = keyframes`
0% { }
100% { opacity: .5; transform: translateX(-20%); }
`;

// New conetent & the header are entering from the right
const slideIn = keyframes`
0% { opacity: .5; transform: translateX(100vw); }

100% { opacity: 1; transform: translateX(0); }
`;


injectGlobal`
.${bodyTransitionClassName}-exit-active {
  animation: ${slideOut} ${duration}ms both ease-in-out;
}
.${bodyTransitionClassName}-enter-active {
  animation: ${slideIn} ${duration}ms both ease-in-out;
}

.${headerTransitionClassName}-enter-active {
  animation: ${slideIn} ${duration}ms both ease-in-out;
}
`;

export default { bodyTransition: bodyTransitionClassName, duration, headerTransition: headerTransitionClassName };
