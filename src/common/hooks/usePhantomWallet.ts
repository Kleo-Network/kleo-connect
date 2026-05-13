import { useEffect, useState } from 'react'
import { PublicKey, Transaction } from '@solana/web3.js'

type PhantomProvider = {
  isPhantom?: boolean
  isConnected?: boolean
  publicKey?: unknown
  connect: () => Promise<unknown>
  disconnect: () => Promise<unknown>
  signAndSendTransaction: (transaction: Transaction) => Promise<unknown>
  signMessage: (...args: unknown[]) => Promise<unknown>
}

const getPhantomProvider = (): PhantomProvider | undefined => {
  return (window as unknown as { solana?: PhantomProvider }).solana
}

const toPublicKey = (value: unknown): PublicKey => {
  if (value instanceof PublicKey) return value
  if (typeof value === 'string') return new PublicKey(value)
  if (value instanceof Uint8Array) return new PublicKey(value)
  if (
    value &&
    typeof value === 'object' &&
    typeof (value as { toString?: unknown }).toString === 'function'
  ) {
    return new PublicKey(String(value))
  }
  throw new Error('Invalid public key')
}

type PhantomWallet = {
  connected: boolean
  publicKey: PublicKey | null
  connect: () => Promise<void>
  disconnect: () => Promise<void>
  signAndSendTransaction: (transaction: Transaction) => Promise<void>
  signMessage: (
    message: string
  ) => Promise<{ signature: Uint8Array; publicKey: PublicKey }>
}

export const usePhantomWallet = (): PhantomWallet => {
  const [connected, setConnected] = useState<boolean>(false)
  const [publicKey, setPublicKey] = useState<PublicKey | null>(null)

  const connect = async () => {
    const phantom = getPhantomProvider()
    if (phantom && phantom.isPhantom) {
      const response = await phantom.connect()
      const providerPublicKey = phantom.publicKey
      setConnected(Boolean(response))
      if (providerPublicKey) {
        setPublicKey(toPublicKey(providerPublicKey))
      }
    }
  }

  const disconnect = async () => {
    const phantom = getPhantomProvider()
    if (phantom && phantom.isPhantom) {
      await phantom.disconnect()
      setConnected(false)
      setPublicKey(null)
    }
  }

  const signAndSendTransaction = async (transaction: Transaction) => {
    const phantom = getPhantomProvider()
    if (phantom && phantom.isPhantom) {
      const txid = await phantom.signAndSendTransaction(transaction)
      return txid
    }
    throw new Error('Phantom wallet not connected')
  }

  const signMessage = async (
    message: string
  ): Promise<{ signature: Uint8Array; publicKey: PublicKey }> => {
    const phantom = getPhantomProvider()
    if (phantom && phantom.isPhantom) {
      const arrayMessage = new TextEncoder().encode(message) // Convert message string to Uint8Array
      const signed = await phantom.signMessage(arrayMessage, 'hex') // "hex" is an example of an encoding format, you can adjust as necessary.
      if (
        !signed ||
        typeof signed !== 'object' ||
        !('signature' in signed) ||
        !('publicKey' in signed)
      ) {
        throw new Error('Invalid signature response from Phantom')
      }
      const { signature, publicKey } = signed as {
        signature: Uint8Array
        publicKey: unknown
      }
      return {
        signature: new Uint8Array(signature),
        publicKey: toPublicKey(publicKey)
      }
    }
    throw new Error('Phantom wallet not connected')
  }

  useEffect(() => {
    const phantom = getPhantomProvider()
    if (phantom && phantom.isPhantom) {
      setConnected(Boolean(phantom.isConnected))
      if (phantom.isConnected) {
        setPublicKey(toPublicKey(phantom.publicKey))
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
