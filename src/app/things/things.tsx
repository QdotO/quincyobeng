// import TattooGen from '@/components/things/TattooGen'
// import WeedTracker from '@/components/things/WeedTracker'

type Thing = {
  id: string
  name: string
  description: string
  thumbnail: string
  thumbnailAlt: string
  component: JSX.Element
}

const things: Thing[] = [
  // {
  //   id: '1',
  //   name: 'Weed Tracker',
  //   description: 'Need help tracking your weed consumption? Look no further!',
  //   thumbnail: '/assets/weed-tracker.jpeg',
  //   thumbnailAlt: 'Weed Tracker',
  //   component: <WeedTracker />
  // },
  // {
  //   id: '2',
  //   name: 'Tattoo Generator',
  //   description: 'Not sure what tattoo to get? Let us help you decide!',
  //   thumbnail: '/assets/tattoo-gen.jpeg',
  //   thumbnailAlt: 'Tattoo Generator',
  //   component: <TattooGen />
  // }
]

export type { Thing }
export default things
