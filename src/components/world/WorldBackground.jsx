import Clouds from './Clouds.jsx'
import Ground from './Ground.jsx'
import Hills from './Hills.jsx'
import Mountains from './Mountains.jsx'
import Sky from './Sky.jsx'
import Vegetation from './Vegetation.jsx'
function WorldBackground() { return <div className="world-background" aria-hidden="true"><Sky /><Clouds /><Mountains /><Hills /><Vegetation /><Ground /></div> }
export default WorldBackground
