import {
  Avatar,
  Box,
  Flex,
  HStack,
  Icon,
  Input,
  Text,
} from '@chakra-ui/react'
import {
  RiNotificationLine,
  RiSearchLine,
  RiUserAddLine
} from 'react-icons/ri'

export function Header() {
  return (
    <Flex
      as="header"
      align="center"
      w="100%"
      maxWidth={1400}
      h="20"
      mx="auto"
      mt="4"
      px="6"
    >
      <Text
        w="64"
        fontSize="3xl"
        fontWeight="bold"
        letterSpacing="tight"
      >
        dashgo
        <Text as="span" ml="1" color="pink.500">.</Text>
      </Text>

      <Flex
        as="label"
        alignSelf="center"
        flex="1"
        py="4"
        px="8"
        ml="6"
        maxWidth={400}
        color="gray.200"
        position="relative"
        bg="gray.800"
        borderRadius="full"
      >
        <Input
          color="gray.50"
          variant="unstyled"
          px="4"
          mr="4"
          placeholder="Buscar na plataforma"
          _placeholder={{ color: "gray.400" }} 
        />
        <Icon as={RiSearchLine} fontSize="28" />
      </Flex>

      <Flex
        align="center"
        ml="auto"
      >
        <HStack
          spacing="8"
          mx="8"
          pr="8"
          py="1"
          color="gray.300"
          borderRightWidth={1}
          borderColor="gray.700"
        >
          <Icon as={RiNotificationLine} fontSize="20" />
          <Icon as={RiUserAddLine} fontSize="20" />
        </HStack>

        <Flex
          align="center"
        >
          <Box mr="4" textAlign="right">
            <Text>Marcelo Lupatini</Text>
            <Text color="gray.300" fontSize="small">
              mar.lupatini@gmail.com
            </Text>
          </Box>

          <Avatar size="md" name="Marcelo Lupatini" src="https://github.com/marcel099.png" />
        </Flex>
      </Flex>
    </Flex>
  )
}