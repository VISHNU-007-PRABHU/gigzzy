const { gql } = require('apollo-server');

module.exports = gql`
  type Chat{
        id:ID
        message:String
        role:Int
        createdAt: Date
        msg_date:String @date(format: "DD MMMM YYYY")
        msg_time:String @date(format: "hh:mm a")
        updatedAt: Date
        user(_id:ID):[Detail]
        provider(_id:ID):[Detail]
        booked(_id:ID):[Booking]
        info:JSON
        docs:[JSON]
        totalDocs: Int
        limit: Int
        hasPrevPage:Boolean
        hasNextPage: Boolean
        page: Int
        totalPages: Int
        pagingCounter: Int
        prevPage: String
        nextPage: String
    }
    extend type Subscription{
        messageSent(limit: Int,page:Int,user_id:ID,provider_id:ID,booking_id:ID,contract_id:ID):Chat
    }
    extend type Query {
        get_message(booking_id:ID,user_id:ID,provider_id:ID):[Chat]
        get_chat_message(contract_id:ID,booking_id:ID,user_id:ID,provider_id:ID):[Chat]
    }
    extend type Mutation {
        live_chating(limit: Int,page:Int,user_id:ID,provider_id:ID,booking_id:ID,contract_id:ID):Chat
        add_message(role:Int,booking_id:ID,user_id:ID,provider_id:ID,message:String):Chat
    }
`


