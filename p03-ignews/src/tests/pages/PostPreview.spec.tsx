import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'

import { getPrismicClient } from '../../services/prismic'
import PostPreview, { getStaticProps } from '../../pages/posts/preview/[slug]'
import { useSession, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'

jest.mock('next-auth/client')
jest.mock('next/router')
jest.mock('../../services/prismic')

const post = {
  slug: 'my-new-post',
  title: 'My New Post',
  content: '<p>Post content</p>',
  updatedAt: '11 de fevereiro de 2022',
}

describe('Post preview page', () => {
  it('renders correctly', () => {
    const useSessionMocked = mocked(useSession)

    useSessionMocked.mockReturnValueOnce([null, false])

    render( <PostPreview post={post} /> )

    expect(screen.getByText("My New Post")).toBeInTheDocument()
    expect(screen.getByText("Post content")).toBeInTheDocument()
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument()
  })

  it('redirects user to full post when user is subscribed', async () => {
    const useSessionMocked = mocked(useSession)
    const useRouterMocked = mocked(useRouter)

    const pushMock = jest.fn()

    useSessionMocked.mockReturnValueOnce([
      { activeSubscription: 'fake-active-subscription' },
      false
    ])

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any)

    render( <PostPreview post={post} /> )

    expect(pushMock).toHaveBeenCalledWith(`/post/${post.slug}`)
  })

  it('redirects request if it is looking for the favicon', async () => {
    const response = await getStaticProps({
      params: { slug: 'favicon.png' }
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/favicon.png',
        })
      })
    )
  })

  it('loads initial data', async () => {
    const getPrismicClientMocked = mocked(getPrismicClient)

    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        uid: 'my-new-post',
        data: {
          title: [
            { type: 'heading', text: 'My New Post' }
          ],
          content: [
            { type: 'paragraph', text: 'Post content'}
          ],
        },
        last_publication_date: '02-11-2022',
      })
    } as any)

    const response = await getStaticProps({
      params: { slug: 'my-new-post' }
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: 'my-new-post',
            title: 'My New Post',
            content: '<p>Post content</p>',
            updatedAt: '11 de fevereiro de 2022'
          }
        }
      })
    )
  })
})
