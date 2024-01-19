import { config } from '@tamagui/config/v2-native' // using ready-to-use config
import { createTamagui, createFont, createTokens } from 'tamagui'


const appConfig = createTamagui(config)

  
export type AppConfig = typeof appConfig

declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {

  }
}

export default appConfig

