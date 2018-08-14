import { keyframes } from 'styled-components';

// Also can play animation in reverse based on isGoingBack boolean.
// However, this method allows for motion blurs

// Main Header
export const headerSlideInOut = keyframes`
0%, 25% { opacity: 0; transform: translateX(80%) ; }

100% { opacity: 1; transform: translateX(0); }
`;
// Sub-header - only needs one since there is no motion blur
export const headerSubheader = keyframes`
0%, 25% {
  margin-top: 48px;
  font-size: 32px;
 }

100% {
  margin-top: 9px;
  color: red;
    font-size: 20px;
    font-weight: normal;
  };
`;

// Leaving/Arriving subheader
export const subheaderLeave = keyframes`
0% { }
5% { transform: translateX(-5vw) scaleX(.9); }
50% {
		transform: scaleX(1.2);
    text-shadow: 10px 0 5px rgba(41,128,185,0.2), 20px 0 2px rgba(41,128,185,0.1);
}

95% { transform: translateX(-95vw) scaleX(.9); }
100% {
   transform: translateX(-100vw);
 }
`;
export const subheaderComeBack = keyframes`
0% {   transform: translateX(-100vw); }
5% { transform: translateX(-95vw) scaleX(.9); }
50% {
		transform: scaleX(1.2);
    text-shadow: -10px 0 5px rgba(41,128,185,0.2), -20px 0 2px rgba(41,128,185,0.1);
}

95% { transform: translateX(-5vw) scaleX(.9); }
100% { transform: translateX(0) scaleX(1)}
`;

export default {
  subheaderComeBack,
  subheaderLeave,
  headerSubheader,
  headerSlideInOut,
};
