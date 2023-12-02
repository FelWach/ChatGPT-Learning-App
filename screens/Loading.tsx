import { Spinner, YStack } from 'tamagui'
export default function Loading() {

  return (
    <YStack marginTop="100%" alignItems="center">
      <Spinner size="large" color="$orange10" />
    </YStack>
  )
}
