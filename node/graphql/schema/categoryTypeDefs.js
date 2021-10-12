const { gql } = require('apollo-server');

module.exports = gql`
  type MainCategory{
        id: ID
        _id:ID
        uid:ID
        is_future:Boolean
        category_type:Int
        category_name:String @upper
        Certificate:[Certificate]
        certificates:[ID]
        base_price(code: String):String  @currency
        price_type:String
        service_fee:String
        description:String
        parent:ID
        is_parent:Boolean
        msg:String
        status:String
        is_block:Boolean
        child:[ID]
        child_name:[String]
        currency_code:String,  
        currency_id:ID
        location_code:String
     }
     type MainCategoryConnection {
        data: [MainCategory]
        pageInfo: PageInfo!
    }
  extend type Query {
    get_main_category_pagination(parent:ID,search:String,limit:Int,page:Int): MainCategoryConnection
  }
  extend type Mutation {
      add_bulk(_id:ID): [MainCategory]
      update_main_category(category_data:JSON,_id:ID):MainCategory
  }
`


