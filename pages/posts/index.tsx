import Container from '../../modules/Blog/components/container'
import MoreStories from '../../modules/Blog/components/more-stories'
import HeroPost from '../../modules/Blog/components/hero-post'
import Intro from '../../modules/Blog/components/intro'
import Layout from '../../modules/Blog/components/layout'
import { getAllPosts } from '../../modules/Blog/lib/api'
import Head from 'next/head'
import { CMS_NAME } from '../../modules/Blog/lib/constants'
import Post from '../../modules/Blog/interfaces/post'

type Props = {
  allPosts: Post[]
}

export default function Index({ allPosts }: Props) {
  const heroPost = allPosts[0]
  const morePosts = allPosts.slice(1)
  return (
    <>
      <Layout>
        <Head>
          <title>{`Next.js Blog Example with ${CMS_NAME}`}</title>
        </Head>
        <Container>
          <Intro />
          {heroPost && (
            <HeroPost
              title={heroPost.title}
              coverImage={heroPost.coverImage}
              date={heroPost.date}
              author={heroPost.author}
              slug={heroPost.slug}
              excerpt={heroPost.excerpt}
            />
          )}
          {morePosts.length > 0 && <MoreStories posts={morePosts} />}
        </Container>
      </Layout>
    </>
  )
}

export const getStaticProps = async () => {
  const allPosts = getAllPosts([
    'title',
    'date',
    'slug',
    'author',
    'coverImage',
    'excerpt',
  ])

  return {
    props: { allPosts },
  }
}
