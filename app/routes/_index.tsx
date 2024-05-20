import * as React from 'react'
import { EngineContentCard, fetchContentCards } from '#app/data.js'
import { type LoaderFunctionArgs, type MetaFunction } from '@remix-run/node'
import { isRouteErrorResponse, useLoaderData, useRouteError } from '@remix-run/react'
import { HeartIcon } from '@heroicons/react/20/solid'
import clsx from 'clsx'
import { formatDate, formatNumber } from '#app/utils.js'

export const meta: MetaFunction = () => {
  return [{ title: 'Content Feed' }]
}

type ContentCard = {
  id: string
  imageUri: string
  title: string
  subtTitle: string
  body: string
  author: EngineContentCard['textData']['author']
  metadata: EngineContentCard['metadata']
  comments: EngineContentCard['comments']
}

export async function loader({ response }: LoaderFunctionArgs) {
  const contentResponse = await fetchContentCards()

  if (!contentResponse.ok) {
    response!.status = 500
    throw { message: 'An error occurred on the server. Please try again later.' }
  }

  const result: { contentCards: EngineContentCard[] } = await contentResponse.json()
  return {
    contentCards: result.contentCards
      .map((card) => ({
        id: card.id,
        imageUri: card.imageUri,
        title: card.textData.title,
        subtTitle: card.textData.subTitle,
        body: card.textData.body,
        author: card.textData.author,
        metadata: card.metadata,
        comments: card.comments,
      }))
      .sort((a, b) => b.metadata.priority - a.metadata.priority),
  }
}

export default function IndexPage() {
  const { contentCards } = useLoaderData<typeof loader>()
  return (
    <Layout>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="sr-only">Content Feed</h1>
        <div className="mx-auto mt-6 grid max-w-xl grid-cols-1 gap-y-4 sm:gap-y-10">
          {contentCards.map((contentCard) => (
            <ContentCard key={contentCard.id} contentCard={contentCard} />
          ))}
        </div>
      </div>
    </Layout>
  )
}

function Layout({ children }: React.PropsWithChildren) {
  return (
    <main>
      <div className="bg-gray-50">{children}</div>
    </main>
  )
}

function ContentCard({ contentCard }: { contentCard: ContentCard }) {
  return (
    <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white">
      <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none sm:h-96">
        <img
          src={contentCard.imageUri}
          alt=""
          className="h-full w-full object-cover object-center sm:h-full sm:w-full"
        />
      </div>
      <div className="flex flex-1 flex-col space-y-2 p-4">
        <div className="flex justify-between gap-2">
          <h2 className="text-sm font-medium text-gray-900">{contentCard.title}</h2>
          <p className="flex-shrink-0 text-sm">
            {contentCard.author.first} {contentCard.author.last}
          </p>
        </div>
        <p className="text-sm italic text-gray-700">
          Published{' '}
          <time dateTime={contentCard.metadata.publishDate}>
            {formatDate(new Date(contentCard.metadata.publishDate))}
          </time>
        </p>
        <p className="text-sm text-gray-500">{contentCard.subtTitle}</p>
        <ExpandableContent body={contentCard.body} />
        {contentCard.comments.length > 0 && <Comments comments={contentCard.comments} />}
      </div>
    </div>
  )
}

function ExpandableContent({ body }: { body: string }) {
  const [expanded, setExpanded] = React.useState(false)
  const [hasBodyOverflown, setHasBodyOverflown] = React.useState(false)
  const bodyRef = React.useRef<HTMLParagraphElement>(null)

  React.useLayoutEffect(() => {
    if (!bodyRef.current) {
      return
    }

    setHasBodyOverflown(bodyRef.current.offsetHeight < bodyRef.current.scrollHeight)
  }, [])

  return (
    <div>
      <p className={clsx(!expanded && 'line-clamp-3', 'text-sm text-gray-700')} ref={bodyRef}>
        {body}
      </p>
      {hasBodyOverflown && (
        <button className="text-sm text-blue-600" onClick={() => setExpanded(!expanded)}>
          {expanded ? 'Read less' : 'Read more'}
        </button>
      )}
    </div>
  )
}

function Comments({ comments }: { comments: ContentCard['comments'] }) {
  const [commentsExpanded, setCommentsExpanded] = React.useState(false)
  const commentsToShow = commentsExpanded ? comments : comments.slice(-1)
  return (
    <>
      <div>
        {comments.length > 1 && (
          <button
            className="text-sm text-blue-700"
            onClick={() => setCommentsExpanded(!commentsExpanded)}
          >
            {commentsExpanded ? 'Collapse comments' : `View all ${comments.length} comments`}
          </button>
        )}
      </div>
      <div className="flow-root">
        <ul className="-mb-8">
          {commentsToShow.map((comment, index) => (
            <li key={index}>
              <div className="relative pb-8">
                {index !== commentsToShow.length - 1 ? (
                  <span
                    className="absolute left-5 top-5 -ml-px h-full w-0.5 bg-gray-200"
                    aria-hidden="true"
                  />
                ) : null}
                <div className="relative flex items-start space-x-3">
                  <div className="relative">
                    <img
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                      src={comment.profilePic}
                      alt=""
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div>
                      <div className="text-sm">
                        <p className="font-medium text-gray-900">{comment.author.slice(1)}</p>
                      </div>
                      <p className="mt-0.5 flex items-center gap-x-2 text-sm text-gray-500">
                        <HeartIcon className="h-4 w-4" /> {formatNumber(comment.likes)}
                      </p>
                    </div>
                    <div className="mt-2 text-sm text-gray-700">
                      <p>{comment.text}</p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}

export function ErrorBoundary() {
  const routeError = useRouteError()
  return (
    <Layout>
      <div className="p-8">
        <h1 className="text-3xl">
          {isRouteErrorResponse(routeError)
            ? routeError.data.message
            : 'An error occurred while loading the page.'}
        </h1>
      </div>
    </Layout>
  )
}
