import React from 'react'
import HomepageComponent from './HomepageComponent'
const HomepageContainer = (props) => {
  return <HomepageComponent {...props} />
}
HomepageContainer.displayName = 'homepage'
export default HomepageContainer
