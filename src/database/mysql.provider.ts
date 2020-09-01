import { Injectable, Logger } from '@nestjs/common'
import { Pool, createPool, Connection } from 'mysql2/promise'

@Injectable()
export class MySQLProvider {
  private readonly logger: Logger
  private readonly pool: Pool
  constructor() {
    this.logger = new Logger('MySQLProvider')
    this.pool = createPool({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'cat_products',
      waitForConnections: true,
      connectionLimit: 20,
      queueLimit: 0,
      port: 8889,
    })
    this.logger.log('Initialized')
  }

  async getConnection(): Promise<Connection> {
    return await this.pool.getConnection()
  }
}
