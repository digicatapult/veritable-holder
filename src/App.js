import './stylesheets/font-awesome.min.css'
import './stylesheets/AppTheme.css'

import AppCore from './components/Core/AppCore'

function App() {
  return (
    <div data-cy="app">
      <AppCore agent="holder" />
    </div>
  )
}

export default App
