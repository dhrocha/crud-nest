import { Injectable, Inject } from '@nestjs/common'
import { MySQLProvider } from 'src/database/mysql.provider'
import { Product } from './product.entity'

@Injectable()
export class ProductService {
  constructor(@Inject('DATABASE') private readonly mysql: MySQLProvider) {}
  async findAll(): Promise<Product[]> {
    const conn = await this.mysql.getConnection()
    const [results]: Array<any> = await conn.query('SELECT * FROM products;')
    const products = results.map(product => {
      const productEntity = new Product()
      productEntity.id = product.id
      productEntity.product = product.product
      productEntity.price = product.price
      return productEntity
    })
    return products
  }

  async findById(id: number): Promise<Product> {
    const conn = await this.mysql.getConnection()
    const [
      results,
    ]: Array<any> = await conn.query(
      'SELECT * FROM products WHERE id = ? LIMIT 1',
      [id],
    )
    const products = results.map(product => {
      const productEntity = new Product()
      productEntity.id = product.id
      productEntity.product = product.product
      productEntity.price = product.price
      return productEntity
    })
    return products
  }

  async create(entity: Product): Promise<Product> {
    const conn = await this.mysql.getConnection()
    await conn.query('INSERT INTO products (product, price) VALUES (?,?)', [
      entity.product,
      entity.price,
    ])
    return entity
  }

  async remove(id: number): Promise<boolean> {
    const conn = await this.mysql.getConnection()
    await conn.query('DELETE FROM products WHERE id = ? LIMIT 1', [id])
    return true
  }
}
