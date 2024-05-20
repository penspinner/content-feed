const card = {
  id: '497f6eca-6276-4993-bfeb-53cbbbba6f08',
  imageUri: 'https://picsum.photos/500/500',
  textData: {
    title: 'string',
    subTitle: 'string',
    body: 'stringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringstringst',
    author: { first: 'string', last: 'string' },
  },
  metadata: { priority: 0, publishDate: '2019-08-24T14:15:22Z' },
  comments: [
    {
      text: 'string',
      author: 'string',
      profilePic: 'https://picsum.photos/200',
      likes: 0,
    },
  ],
}

export type EngineContentCard = typeof card

export async function fetchContentCards() {
  const contentResponse = await fetch(
    'https://stoplight.io/mocks/engine/fullstack-spec/52502230/content',
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Prefer: 'code=200, dynamic=true',
      },
    },
  )
  return contentResponse
}
