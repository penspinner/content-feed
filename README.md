# Content Feed

## Setup

- Install [Node.js 20+](https://nodejs.org/en).
- Install [Yarn](https://classic.yarnpkg.com/lang/en/docs/install/).
- Install node packages with:

  ```sh
  yarn
  ```

## Development

Run the Vite dev server:

```sh
yarn dev
```

Then visit the URL logged to the console.

## Thought Process

### Tools

- [Remix](https://remix.run/): Remix is a web framework that lets you focus on developing fast, slick, and resilient web applications. It's my favorite framework to use as it makes things a breeze to implement. It handles a bunch of router edge cases out of the box that developers don't have to worry about.
- [Tailwind CSS](https://tailwindcss.com/): Tailwind CSS is a utility-first CSS framework. It's popular
- [Heroicon](https://heroicons.com/): Heroicons is a package of SVG icons.
- [clsx](https://www.npmjs.com/package/clsx): clsx is used for cleaning up class names, removing values that are falsy.

### Data processing

To display the Content resource from the API, I decided to fetch the data on the server and transform + flatten the data to a format that's more ergonomic for the frontend to consume.

### Challenges

The biggest challenge was thinking of a good design for displaying the Content data. There's a lot of data but there's no heuristic on what the user wants t to see or not, so I assumed all the data is important for users to see. It's important to, by default, limit the number of comments the user can see for every post, so that if the content item had a bunch of comments, the user wouldn't have to scroll through all the comments to get to the next content item.
