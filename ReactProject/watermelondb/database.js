// database.js
import { Database } from '@nozbe/watermelondb'
import { SQLiteAdapter } from '@nozbe/watermelondb/adapters/sqlite'
import { schema } from './schema' // 你将定义的数据库模式

// 创建 SQLite 适配器
const adapter = new SQLiteAdapter({
  schema,
  // 可选: 添加其他配置
  // dbName: 'my_app_db',
  // onSetUp: () => { /* 初始化逻辑 */ },
})

// 创建数据库实例
export const database = new Database({
  adapter,
  modelClasses: [/* 你的模型类 */],
})