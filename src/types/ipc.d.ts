export interface ElectronAPI {
  doExec(command: string): Promise<string>
  minimize(): void
}

export interface ApiClient {
  call(
    url: string,
    options?: RequestInit,
    returnType?: 'json' | 'arrayBuffer'
  ): Promise<any>
}
