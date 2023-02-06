import { TodoCategory } from './types';
type getCurrentColorType = {
  [TodoCategory.home]: string,
  [TodoCategory.work]: string,
  [TodoCategory.study]: string,
  [TodoCategory.books]: string,
  
}


export const getCurrentColor = ():getCurrentColorType => ({
  home: "bg-gradient-to-r from-blue-700 to-blue-500",
  work: "bg-gradient-to-r from-amber-700 to-amber-500",
  study: "bg-gradient-to-r from-green-700  to-green-500",
  books: "bg-gradient-to-r from-fuchsia-700 to-fuchsia-500 ",
});

