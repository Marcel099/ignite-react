import Link from "next/link";
import { useRouter } from "next/router";
import {
  Box, Button, Divider, Flex, Heading, HStack, SimpleGrid, VStack
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from 'react-hook-form'
import { useMutation } from 'react-query'
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup/dist/yup'

import { api } from '../../services/axios'
import { queryClient } from "../../services/queryClient";

import { Header } from "../../components/Header";
import { Input } from "../../components/form/Input";
import { Sidebar } from "../../components/Sidebar";

type CreateUserFormData = {
  name: string
  email: string
  password: string
  password_confirmation: string
}

// const createUserFormSchema = yup.object().shape({
//   name: yup.string().required('Nome obrigatório'),
//   email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
//   password: yup.string().required('Senha obrigatória').min(6, 'No mínimo 6 caracteres'),
//   password_confirmation: yup.string().oneOf([
//     null, yup.ref('password')
//   ], 'As senhas precisam ser iguais').required('Confirmação de senha obrigatória'),
// })

export default function CreateUser() {
  const router = useRouter()

  const createUser = useMutation(async (user: CreateUserFormData) => {
    await api.post('users', {
      user: {
        ...user,
      },
    })
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['users'])
    }
  })

  const { register, handleSubmit, formState } = useForm(
    // { resolver: yupResolver(signInFormSchema) }
  )

  const { errors } = formState

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (data) => {
    await createUser.mutateAsync(data)
    router.push('/users')
  }

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxWidth={1400} mx="auto" px="6">
        <Sidebar />

        <Box
          as="form"
          flex="1"
          borderRadius={8}
          bg="gray.800"
          p={["6", "8"]}
          onSubmit={handleSubmit(handleCreateUser)}
        >
          <Heading size="lg" fontWeight="normal">Criar usuário</Heading>

          <Divider my="6" borderColor="gray.700" />

          <VStack spacing={["6", "8"]}>
            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="name"
                label="Nome completo"
                error={errors.name}
                {...register('name')}
              />
              <Input
                name="email"
                type="email"
                label="E-mail"
                error={errors.email}
                {...register('email')}
              />
            </SimpleGrid>

            <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} w="100%">
              <Input
                name="password"
                type="password"
                label="Senha"
                error={errors.password}
                {...register('password')}
              />
              <Input
                name="password_confirmation"
                type="password"
                label="Confirmação da senha"
                error={errors.password_confirmation}
                {...register('password_confirmation')}
              />
            </SimpleGrid>
          </VStack>

          <Flex mt="8" justify="flex-end">
            <HStack spacing={["3", "4"]}>
              <Link href="/users" passHref>
                <Button as="a" colorScheme="whiteAlpha">Cancelar</Button>
              </Link>
              <Button
                type="submit"
                colorScheme="pink"
                isLoading={formState.isSubmitting}
              >
                Salvar
              </Button>
            </HStack>
          </Flex>
        </Box>
      </Flex>
    </Box>
  )
}