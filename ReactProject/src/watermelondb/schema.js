// schema.js
import { table, column } from '@nozbe/watermelondb'
import { Post, Comment } from './models'

export const schema = [
  table(Post),
  table(Comment),
]