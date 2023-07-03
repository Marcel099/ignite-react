import { render, screen } from '@testing-library/react'
import { mocked } from 'jest-mock'

import { getPrismicClient } from '../../services/prismic'
import Post, { getServerSideProps } from '../../pages/posts/[slug]'
import { getSession } from 'next-auth/client'

jest.mock('next-auth/client')
jest.mock('../../services/prismic')

const post = {
  slug: 'my-new-post',
  title: 'My New Post',
  content: '<p>Post content</p>',
  updatedAt: '11 de fevereiro de 2022',
}

describe('Post page', () => {
  it('renders correctly', () => {
    render( <Post post={post} /> )

    expect(screen.getByText("My New Post")).toBeInTheDocument()
    expect(screen.getByText("Post content")).toBeInTheDocument()
  })

  it('redirects user if no subscription is found', async () => {
    const getSessionMocked = mocked(getSession)

    getSessionMocked.mockResolvedValueOnce(null)

    const response = await getServerSideProps({
      params: { slug: 'my-new-post' }
    } as any)

    expect(response).toEqual(
      expect.objectContaining({
        redirect: expect.objectContaining({
          destination: '/posts/preview/my-new-post',
        })
      })
    )
  })

  it('redirects request if it is looking for the favicon', async () => {
    const response = await getServerSideProps({
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
    const getSessionMocked = mocked(getSession)
    const getPrismicClientMocked = mocked(getPrismicClient)

    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription',
    })

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

    const response = await getServerSideProps({
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
