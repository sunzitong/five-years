// eslint-disable-next-line import/no-extraneous-dependencies
import { Location } from 'history';

declare module 'history' {
  interface Location {
    query: { [key: string]: unknown }
  }
}