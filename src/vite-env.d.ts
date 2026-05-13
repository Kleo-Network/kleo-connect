/// <reference types="vite/client" />

import type { Transaction } from '@solana/web3.js'

declare global {
  interface KleoSignInResult {
    address: string
    token: string
  }

  interface KleoConnectExtension {
    extension?: unknown
    signIn?: () => Promise<KleoSignInResult>
  }

  interface PhantomProvider {
    isPhantom?: boolean
    isConnected?: boolean
    publicKey?: string | { toString(): string }
    connect: () => Promise<unknown>
    disconnect: () => Promise<void>
    signAndSendTransaction: (transaction: Transaction) => Promise<unknown>
    signMessage: (
      message: Uint8Array,
      display?: string
    ) => Promise<{
      signature: Uint8Array | number[]
      publicKey: string | { toString(): string }
    }>
  }

  interface Window {
    kleoConnect?: KleoConnectExtension
    signIn?: () => Promise<KleoSignInResult>
    solana?: PhantomProvider
  }
}

export {}
