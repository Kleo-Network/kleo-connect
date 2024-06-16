import * as LitJsSdk from '@lit-protocol/lit-node-client'
import { LitNetwork } from '@lit-protocol/constants'

export class Lit {
  private litNodeClient: LitJsSdk.LitNodeClient | undefined
  private chain: string

  constructor(chain: string) {
    this.chain = chain
  }

  async connect(): Promise<void> {
    this.litNodeClient = new LitJsSdk.LitNodeClient({
      litNetwork: LitNetwork.Cayenne
    })
    await this.litNodeClient.connect()
  }

  async enryptString(
    data: string,
    chain: string,
    accessControlConditions: Array<any>
  ) {
    if (!this.litNodeClient) {
      throw new Error(
        'Lit Node Client is not initialized. Please call connect() first.'
      )
    }
    if (!this.litNodeClient) {
      await this.connect()
    }

    const { ciphertext, dataToEncryptHash } = await LitJsSdk.encryptString(
      {
        accessControlConditions,
        dataToEncrypt: data
      },
      this.litNodeClient
    )
    console.log('Access Control')
    console.log(accessControlConditions)
    return {
      ciphertext,
      dataToEncryptHash
    }
  }
}

export default new Lit('ethereum')
