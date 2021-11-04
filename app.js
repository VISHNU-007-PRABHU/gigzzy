const express = require('express')
const app = require('express')()
const util = require('util');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path');
const http = require('http');
const https = require('https');
var ObjectId = require('mongodb').ObjectID;
const { ApolloServer, gql, SchemaDirectiveVisitor } = require('apollo-server-express');
const { defaultFieldResolver, GraphQLString } = require('graphql');
const { typeDefs } = require('./node/graphql/schema');
const categoryTypeDefs = require('./node/graphql/schema/categoryTypeDefs');
const chatTypeDefs = require('./node/graphql/schema/chatTypeDefs');
const ratingTypeDefs = require('./node/graphql/schema/ratingTypeDefs.graphql');
const contractTypeDefs = require('./node/graphql/schema/contractTypeDefs.graphql');
const milestoneTypeDefs = require('./node/graphql/schema/milestoneTypeDefs.graphql')

const { resolvers, confrimation_call, c2b_confirmation, c2b_validation } = require('./node/graphql/resolver');
const { confrimation_company_worker } = require('./node/graphql/resolvers/user')
const moment = require('moment');
const { createWriteStream, existsSync, mkdirSync } = require("fs");
app.use(bodyParser.urlencoded({ limit: "100mb", extended: true, parameterLimit: 5000000 }));
app.use(express.json());
const getSymbolFromCurrency = require('currency-symbol-map')
const fs = require('fs');
const _ = require('lodash');
const cwd = process.cwd();
const dotenv = require('dotenv');
const expressStaticGzip = require('express-static-gzip');
const commonHelper = require('./node/graphql/commonHelper')
const CommonFunction = require('./node/graphql/CommonFunction')
// const i18n = require("i18n");
const model = require('./node/model_data');
var Currency_model = model.currency;
var Booking_model = model.booking;

dotenv.config();
var cors = require('cors');
app.use(cors({ origin: 'http://localhost:3000' }));

class refDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      const result = await resolve.apply(this, args);
      if (typeof result === "string") {
        return `#${result}`;
      }
      return result;
    };
  }
}
class ImgSizeDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { format } = this.args;
    field.resolve = async function (...args) {
      const imgurl = await resolve.apply(this, args);
      if (imgurl) {
        if (format && format == "small") {
          return `${imgurl}_small.jpg`;
        } else {
          return imgurl
        }
      } else {
        return `${commonHelper.no_image()}`;
      }
    };
    // The formatted Date becomes a String, so the field type must change:
    field.type = GraphQLString;
  }
}
class DateFormatDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { format } = this.args;
    field.resolve = async function (...args) {
      const date = await resolve.apply(this, args);
      if (date) {
        return moment(date).tz('Asia/Kolkata').format(format);
      } else {
        return '';
      }
    };
    // The formatted Date becomes a String, so the field type must change:
    field.type = GraphQLString;
  }
}

class UpperCaseDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (...args) {
      const result = await resolve.apply(this, args);
      if (typeof result === "string") {
        return result.charAt(0).toUpperCase() + result.slice(1).toLowerCase();
      }
      return result;
    };
  }
}
class UrlDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { format } = this.args;
    field.resolve = async function (...args) {
      const file_type = args[0].doc_type || "png"
      const img = await resolve.apply(this, args);
      if (img && file_type && file_type !== "pdf") {
        return `${commonHelper.getBaseurl()}/images/${format}/${img}`;
      } else if (file_type && file_type === "pdf") {
        return `${commonHelper.no_image('pdf')}`;
      } else {
        return `${commonHelper.no_image()}`;
      }
    };
    // The formatted Date becomes a String, so the field type must change:
    field.type = GraphQLString;
  }
}

class c2bDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    field.resolve = async function (source, { format, ...otherArgs }, context, info,) {
      if (source && source.currency_detail && source.currency_detail.location == "KE") {
        return true;
      } else {
        return false
      }
    };

  }
}


class paymentDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { defaultFormat } = this.args;
    field.args.push({ name: 'format', type: GraphQLString });
    field.resolve = async function (source, { format, ...otherArgs }, context, info,) {
      const date = await resolve.call(this, source, otherArgs, context, info);
      let code = otherArgs.code
      if (code === "KE") {
        return "mpesa"
      } else {
        return "stripe"
      }
    };

    field.type = GraphQLString;
  }
}
class currencyDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition(field) {
    const { resolve = defaultFieldResolver } = field;
    const { defaultFormat } = this.args;

    field.args.push({
      name: 'format',
      type: GraphQLString
    });

    field.resolve = async function (
      source,
      { format, ...otherArgs },
      context,
      info,
    ) {
      const date = await resolve.call(this, source, otherArgs, context, info);
      let code = otherArgs.code
      if (code === "symbol") {
        let const_symbol = source.symbol || "$"
        if (source.currency_id) {
          var currency = await Currency_model.findOne({ _id: ObjectId(source.currency_id) }).lean()
          if (currency && _.size(currency)) {
            const_symbol = currency['symbol']
          }
        }
        let symbol_data = `${const_symbol} ${date}`
        return symbol_data
      } else if (code) {
        let currency_code = ""
        if (source.currency_detail && source.currency_detail.code) {
          currency_code = source.currency_detail.code
        }
        if (source.currency_id) {
          var currency = await Currency_model.findOne({ _id: ObjectId(source.currency_id) }).lean()
          if (currency && _.size(currency)) {
            currency_code = currency['code']
          }
        }
        if (source.booking_id) {
          var bookingdata = await Booking_model.findOne({ _id: ObjectId(source.booking_id) }).lean()
          if (bookingdata && _.size(bookingdata)) {
            var currency = await Currency_model.findOne({ _id: ObjectId(bookingdata.currency_id) }).lean()
            if (currency && _.size(currency)) {
              currency_code = currency['code']
            }
          }
        }
        let inputdata = {
          convert_code: otherArgs.code || defaultFormat,
          amount: date,
          currency_code: currency_code
        }
        let final_value = await CommonFunction.currency_calculation(inputdata)
        return final_value
      } else {
        return date
      }
    };

    field.type = GraphQLString;
  }
}


const server = new ApolloServer({
  cors: {
    origin: '*',			// <- allow request from all domains
    credentials: true
  },
  typeDefs: [typeDefs,categoryTypeDefs,chatTypeDefs,ratingTypeDefs,contractTypeDefs,milestoneTypeDefs],
  resolvers: [resolvers],
  schemaDirectives: {
    currency: currencyDirective,
    paymentOption: paymentDirective,
    ref: refDirective,
    date: DateFormatDirective,
    upper: UpperCaseDirective,
    imgSize: ImgSizeDirective,
    payment: c2bDirective,
    imgUrl: UrlDirective
  },
  subscriptions: {
    onConnect: () => { },
    // console.log('Connected to websocket'),
    onDisconnect: () => {
    },
    uploads: {
      maxFileSize: 10000000, // 10 MB
      maxFiles: 10
    },
  },
  context: async ({ req, connection }) => {
    if (connection) {
      // check connection for metadata
      return connection.context;
    } else {
      // check from req
      const token = req.headers.authorization || "";

      return { token };
    }
  },
});

server.applyMiddleware({ app });

const buildPath = path.join(__dirname, '..', 'build');
app.use(
  '/',
  expressStaticGzip('./build', {
    enableBrotli: true,
    orderPreference: ['br', 'gz']
  })
);

// app.use('/', express.static('./build'));

existsSync(path.join(__dirname, "./node/images")) || mkdirSync(path.join(__dirname, "./node/images"));
existsSync(path.join(__dirname, "./node/images/provider")) || mkdirSync(path.join(__dirname, "./node/images/provider"));
existsSync(path.join(__dirname, "./node/images/booking")) || mkdirSync(path.join(__dirname, "./node/images/booking"));
existsSync(path.join(__dirname, "./node/images/user")) || mkdirSync(path.join(__dirname, "./node/images/user"));
existsSync(path.join(__dirname, "./node/images/user/profile")) || mkdirSync(path.join(__dirname, "./node/images/user/profile"));
existsSync(path.join(__dirname, "./node/images/provider/document")) || mkdirSync(path.join(__dirname, "./node/images/provider/document"));
existsSync(path.join(__dirname, "./node/images/provider/profile")) || mkdirSync(path.join(__dirname, "./node/images/provider/profile"));
existsSync(path.join(__dirname, "./node/images/category")) || mkdirSync(path.join(__dirname, "./node/images/category"));
existsSync(path.join(__dirname, "./node/images/subcategory")) || mkdirSync(path.join(__dirname, "./node/images/subcategory"));
existsSync(path.join(__dirname, "./node/images/contract")) || mkdirSync(path.join(__dirname, "./node/images/contract"));
existsSync(path.join(__dirname, "./node/images/company")) || mkdirSync(path.join(__dirname, "./node/images/company"));
existsSync(path.join(__dirname, "./node/images/biding")) || mkdirSync(path.join(__dirname, "./node/images/biding"));
existsSync(path.join(__dirname, "./node/images/milestone")) || mkdirSync(path.join(__dirname, "./node/images/milestone"));

app.use("/images", express.static(path.join(__dirname, "./node/images")));
app.use("/document", express.static(path.join(__dirname, "./node/document")));
app.use('/static', express.static(__dirname + '/public'));


app.get('/company_user_accepted', async (req, res, next) => {
  try {
    let { status, msg, link } = await confrimation_company_worker(req.query)
    return res.redirect(301, link);
  } catch (error) {
    console.log("error register page", error)
    res.redirect(301, '/');
  }
})

app.post('/confirmation', async (req, res, next) => {
  try {
    let confirm_data = await confrimation_call(req.body)
    // console.log("confirm_data", confirm_data)
    return res.send({ status: true, message: "we reviced confirmation" })
  } catch (error) {
    // console.log("confirmation error", error)
    return res.send(error)
  }
})


app.post('/refund_confirmation', async (req, res, next) => {
  try {
    console.log(req.body, "refund_confirmation confirmation")
    console.log(req.body['Result']['stkCallback'])
    // let confirm_data = await confrimation_call(req.body)
    // console.log("confirm_data", confirm_data)
    return res.send({ status: true, message: "we reviced confirmation" })
  } catch (error) {
    console.log("confirmation error", error)
    return res.send(error)
  }
})

app.post('/c2b_validation', async (req, res, next) => {
  try {
    console.log(req.body, "ops validation")
    let confirm_data = await c2b_validation(req.body)
    console.log("confirm_data", confirm_data)
    return res.send({
      "ResultCode": 0,
      "ResultDesc": "Accepted"
    })
  } catch (error) {
    console.log("ops, not valid data", error)
    return res.send({
      "ResultCode": 1,
      "ResultDesc": "Rejected"
    })
  }
})

app.post('/c2b_confirmation', async (req, res, next) => {
  try {
    console.log(req.body, "ops c2b")
    let confirm_data = await c2b_confirmation(req.body)
    return res.send({ status: true, message: "we reviced cancelled" })
  } catch (error) {
    return res.send(error.message)
  }
})

app.use(async (req, res, next) => {
  const url = req.url;
  // console.log(url);
  let SubURL = ['graphql',
    'c2b_confirmation',
    'c2b_validation',
    'confirmation',
    'validation',
    'cancelled'
  ]
  const uriArray = url.split('/');
  if (!_.includes(SubURL, uriArray[1])) {
    const readFile = util.promisify(fs.readFile)
    try {
      var text = await readFile(cwd + '/build/index.html', 'utf8');
      return res.send(text);
    } catch (error) {
      return res.send(error.message)
    }
  }
  else if (uriArray[1] == 'node') {
    try {
      // console.log(cwd + url);
    } catch (error) {
      return res.send(error.message)
    }
  }
});

// use it before all route definitions



mongoose.connect(process.env.DB_LINK).then(() => {
}).catch((err) => {
  // console.log("Not Connected to Database ERROR! ", err);
});


// const httpHost = process.env.HTTP_HOST || 'localhost';
const PORT = process.env.HTTP_PORT || 8990;

const httpServer = https.createServer(app)
// const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);
httpServer.listen(() => {
  console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
  console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
})
module.exports = app;