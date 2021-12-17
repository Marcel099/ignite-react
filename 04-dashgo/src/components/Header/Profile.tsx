import {
  Avatar,
  Box,
  Flex,
  Text,
} from '@chakra-ui/react'

interface ProfileProps {
  showProfileData: boolean
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex
      align="center"
    >
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Marcelo Lupatini</Text>
          <Text color="gray.300" fontSize="small">
            mar.lupatini@gmail.com
          </Text>
        </Box>
      )}

      <Avatar size="md" name="Marcelo Lupatini" src="https://github.com/marcel099.png" />
    </Flex>
    
  )
}