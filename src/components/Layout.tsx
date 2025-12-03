import Header from './Header'
import Footer from './Footer'

interface LayoutProps {
  children: React.ReactNode
}

export default function Layout({ children }: LayoutProps) {
  // const location = useLocation()
  // const [displayLocation, setDisplayLocation] = useState(location)
  // const [transitionStage, setTransitionStage] = useState('page-enter')

  // useEffect(() => {
  //   if (location.pathname !== displayLocation.pathname) {
  //     // setTransitionStage('page-enter')
  //     // setDisplayLocation(location)
  //   }
  // }, [location, displayLocation])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className={`flex-1`}>{children}</main>
      <Footer />
    </div>
  )
}
