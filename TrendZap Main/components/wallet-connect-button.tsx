"use client"
import { ConnectButton } from "thirdweb/react"
import { createThirdwebClient } from "thirdweb"
import { Polygon } from "thirdweb/chains"

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || "",
})

interface WalletConnectButtonProps {
  onConnect?: (address: string) => void
}

export default function WalletConnectButtonComponent({ onConnect }: WalletConnectButtonProps) {
  return (
    <ConnectButton
      client={client}
      chain={Polygon}
      onConnect={(address) => {
        if (onConnect) onConnect(address)
      }}
    />
  )
}
