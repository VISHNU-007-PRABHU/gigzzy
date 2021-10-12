const { gql } = require('apollo-server');

module.exports = gql`
  type MainCategory{
        id: ID
        _id:ID
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

     type MainCategoryQuestion{
        id: ID
        _id:ID
        msg:String
        status:String
        category_id: ID
        question:String,
        question_type:String,
        multiple_option:[JSON],
        single_option:String,
        option_type:String,
        is_skip:Boolean
     }
     
     type MainCategoryConnection {
        data: [MainCategory]
        pageInfo: PageInfo!
    }
  extend type Query {
    get_main_category_pagination(parent:ID,search:String,limit:Int,page:Int): MainCategoryConnection
    get_category_question(category_id:ID,_id:ID,index:Int,search:String,limit:Int,page:Int): [MainCategoryQuestion]

  }
  extend type Mutation {
      update_main_category(category_data:JSON,_id:ID):MainCategory
      update_category_question(category_id:ID,question_data:JSON,_id:ID):MainCategoryQuestion
  }
`


