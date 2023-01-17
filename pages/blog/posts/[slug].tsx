import { useRouter } from 'next/router'
import ErrorPage from 'next/error'
import Container from '../../../modules/Blog/components/container'
import PostBody from '../../../modules/Blog/components/post-body'
import Header from '../../../modules/Blog/components/header'
import PostHeader from '../../../modules/Blog/components/post-header'
import Layout from '../../../modules/Blog/components/layout'
import { getPostBySlug, getAllPosts } from '../../../modules/Blog/lib/api'
import PostTitle from '../../../modules/Blog/components/post-title'
import Head from 'next/head'
import { CMS_NAME } from '../../../modules/Blog/lib/constants'
import markdownToHtml from '../../../modules/Blog/lib/markdownToHtml'
import type PostType from '../../../modules/Blog/interfaces/post'

type Props = {
  post: PostType
  morePosts: PostType[]
  preview?: boolean
}

export default function Post({ post, morePosts, preview }: Props) {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }
  return (
    <Layout preview={preview}>
      <Container>
        <Header />
        {router.isFallback ? (
          <PostTitle>Loading…</PostTitle>
        ) : (
          <>
            <article className='mb-32'>
              <Head>
                <title>
                  {post.title} | Next.js Blog Example with {CMS_NAME}
                </title>
                <meta property='og:image' content={post.ogImage.url} />
              </Head>
              <PostHeader
                title={post.title}
                coverImage={post.coverImage}
                date={post.date}
                author={post.author}
              />
              <PostBody content={post.content} />
            </article>
          </>
        )}
      </Container>
    </Layout>
  )
}

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'coverImage',
  ])
  const content = await markdownToHtml(post.content || '')

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug'])

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}
