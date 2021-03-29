export default require(`./${process.env.NODE_ENV}`).default;

/* When importing a directory the index file is the supplied file ex: import * from './public' will locate
 index.html */
