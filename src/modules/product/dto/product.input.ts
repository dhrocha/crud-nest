import { Field, InputType } from '@nestjs/graphql'

@InputType()
export class ProductInput {
  @Field()
  id: number

  @Field()
  product: string

  @Field()
  price: number
}
