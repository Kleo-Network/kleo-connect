import { useEffect, useState } from 'react'
import { PublicKey, Transaction } from '@solana/web3.js'

type PhantomWallet = {
  connected: boolean
  publicKey: PublicKey | null
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  signAndSendTransaction: (transaction: Transaction) => Promise<unknown>
  signMessage: (
    message: string
  ) => Promise<{ signature: Uint8Array; publicKey: PublicKey }>
}

export const usePhantomWallet = (): PhantomWallet => {
  const [connected, setConnected] = useState<boolean>(false)
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null)

  const connect = async () => {
    const phantom = window.solana
    if (phantom?.isPhantom) {
      await phantom.connect()
      setConnected(true)
      if (phantom.publicKey) {
        setPublicKey(new PublicKey(phantom.publicKey.toString()))
      }
    }
  }

  const disconnect = async () => {
    const phantom = window.solana
    if (phantom?.isPhantom) {
      await phantom.disconnect()
      setConnected(false)
      setPublicKey(null)
    }
  }

  const signAndSendTransaction = async (transaction: Transaction) => {
    const phantom = window.solana
    if (phantom?.isPhantom) {
      const txid = await phantom.signAndSendTransaction(transaction)
      return txid
    }
    throw new Error('Phantom wallet not connected')
  }

  const signMessage = async (
    message: string
  ): Promise<{ signature: Uint8Array; publicKey: PublicKey }> => {
    const phantom = window.solana
    if (phantom?.isPhantom) {
      const arrayMessage = new TextEncoder().encode(message) // Convert message string to Uint8Array
      const signed = await phantom.signMessage(arrayMessage, 'hex') // "hex" is an example of an encoding format, you can adjust as necessary.
      return {
        signature: new Uint8Array(signed.signature),
        publicKey: new PublicKey(signed.publicKey)
      }
    }
    throw new Error('Phantom wallet not connected')
  }

  useEffect(() => {
    const phantom = window.solana
    if (phantom?.isPhantom) {
      setConnected(Boolean(phantom.isConnected))
      if (phantom.isConnected && phantom.publicKey) {
        setPublicKey(new PublicKey(phantom.publicKey.toString()))
      }
    }
  }, [])

  return {
    connected,
    publicKey,
    connect,
    disconnect,
    signAndSendTransaction,
    signMessage
  }
}
