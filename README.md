# freeCodeCamp API Project: Image Search Abstraction Layer


### User Stories

1. I can get the image URLs, alt text and page urls for a set of images relating to a given search string.
2. I can paginate through the responses by adding a ?offset=2 parameter to the URL.
3. User Story: I can get a list of the most recently submitted search strings.

#### Search Usage:

GET `https://searchimages.glitch.me/search/{search-term}?offset={page-number}`

#### Search Example:

<https://searchimages.glitch.me/search/lolcats?offset=2>

#### Get a list of 15 most recently submitted search strings:

<https://searchimages.glitch.me/recent>