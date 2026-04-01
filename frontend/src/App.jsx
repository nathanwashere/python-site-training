import { useEffect, useState } from 'react'
import './App.css'
import HomePage from './pages/HomePage.jsx'
import ProjectInfoPage from './pages/ProjectInfoPage.jsx'
import CustomInfoTemplatePage from './pages/CustomInfoTemplatePage.jsx'
import PeppersPage from './pages/PeppersPage.jsx'

const routes = {
  '#/': HomePage,
  '#/project-info': ProjectInfoPage,
  '#/custom-template': CustomInfoTemplatePage,
  '#/peppers': PeppersPage,
}

function getCurrentRoute() {
  return window.location.hash || '#/'
}

function App() {
  const [route, setRoute] = useState(getCurrentRoute())

  useEffect(() => {
    const syncRoute = () => {
      const nextRoute = getCurrentRoute()

      if (!routes[nextRoute]) {
        window.location.hash = '#/'
        return
      }

      setRoute(nextRoute)
    }

    syncRoute()
    window.addEventListener('hashchange', syncRoute)

    return () => window.removeEventListener('hashchange', syncRoute)
  }, [])

  const Page = routes[route] ?? HomePage

  return <Page />
}

export default App
