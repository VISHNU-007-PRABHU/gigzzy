const { gql } = require('apollo-server');

module.exports =  gql`
  type MainCategory{
        id: ID
        _id:ID
        uid:ID
        is_future:Boolean
        category_type:Int
        category_name:String @upper
        Certificate:[Certificate]
        certificates:[ID]
        subCategory_name:String  @upper
        base_price(code: String):String  @currency
        hour_price(code: String):String  @currency
        hour_limit:String
        day_price(code: String):String  @currency
        day_limit:String
        price_type:String
        service_fee:String
        description:String
        img_url:String 
        small_img_url:String @imgSize(format:"small")
        url:String
        is_parent:Boolean
        sub_category(category_id:ID,_id:ID):[subCategory]
        child_category:[subCategory]
        booking_parent_category(category_id:ID,_id:ID):[Category]
        msg:String
        status:String
        is_block:Boolean
        ok:Int
        data:JSON
        info:JSON
        docs:[JSON]
        child:[JSON]
        totalDocs: Int,
        limit: Int,
        hasPrevPage:Boolean,
        hasNextPage: Boolean,
        page: Int,
        totalPages: Int,
        pagingCounter: Int,
        prevPage: String,
        nextPage: String,
        currency_code:String,  
        currency_id:ID
        location_code:String
     }
     
  extend type Query {
      get_main_category: [MainCategory]
  }
  extend type Mutation {
      add_bulk(_id:ID): [MainCategory]
  }
`


