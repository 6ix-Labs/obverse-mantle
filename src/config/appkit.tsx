import { createAppKit } from '@reown/appkit/react'
import { SolanaAdapter } from '@reown/appkit-adapter-solana/react'
import { solana, solanaTestnet, solanaDevnet } from '@reown/appkit/networks'

// 1. Get projectId from Reown Cloud
const projectId = import.meta.env.VITE_REOWN_PROJECT_ID || import.meta.env.VITE_PROJECT_ID

// 2. Create Solana adapter
const solanaWeb3JsAdapter = new SolanaAdapter()

// 3. Set up metadata
const metadata = {
  name: 'Obverse',
  description: 'Obverse Payment Platform',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://obverse.cc',
  icons: ['https://www.obverse.cc/og-image.jpeg']
}

// 4. Create AppKit instance for Solana only
export const appKit = createAppKit({
  adapters: [solanaWeb3JsAdapter],
  networks: [solana, solanaDevnet, solanaTestnet],
  metadata,
  projectId: projectId || 'demo-project-id', // Fallback for localhost
  features: {
    analytics: false,
    email: false,
    socials: []
  }
})

export { solanaWeb3JsAdapter }
