import { StudioClient } from './components/studio-client'

export { metadata, viewport } from 'next-sanity/studio'

export const dynamic = 'force-dynamic'
export const revalidate = 0

export default function StudioPage() {
  return <StudioClient />
}
