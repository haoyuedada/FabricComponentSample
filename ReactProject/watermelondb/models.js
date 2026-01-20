// models.js
import { Model, field, children } from '@nozbe/watermelondb'
import { database } from './database'

class Post extends Model {
  static table = 'posts'
  
  @field('name') name
  @field('body') body
  @children('comments') comments
}

class Comment extends Model {
  static table = 'comments'
  
  @field('body') body
  @field('author') author
}

export { Post, Comment }