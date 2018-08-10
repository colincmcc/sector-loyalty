import { injectGlobal, keyframes } from 'styled-components'

const transitionClassName = 'slideLeft'
const duration = 300

const slideOut = keyframes`
0% { }
100% { opacity: .5; transform: translateX(-20%); }
`
const slideIn = keyframes`
0%, 25% { opacity: .5; transform: translateX(100vw); }
100% { opacity: 1; transform: translateX(0); }
`

injectGlobal`
.${transitionClassName}-exit-active {
  animation: ${slideOut} ${duration}ms both ease-in-out;
}
.${transitionClassName}-enter-active {
  animation: ${slideIn} ${duration}ms both ease-in-out;

}
`

export default { transition: transitionClassName, duration }