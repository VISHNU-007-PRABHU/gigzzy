(window.webpackJsonp=window.webpackJsonp||[]).push([[2],{1524:function(e,t,i){"use strict";i.r(t);var n=i(263);function r(e,t){if(!Boolean(e))throw new Error(t)}var a=i(264);function s(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:e.prototype.toString;e.prototype.toJSON=t,e.prototype.inspect=t,a.a&&(e.prototype[a.a]=t)}function o(e){return(o="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e})(e)}function c(e,t){for(var i,n=/\r\n|[\n\r]/g,r=1,a=t+1;(i=n.exec(e.body))&&i.index<t;)r+=1,a=t+1-(i.index+i[0].length);return{line:r,column:a}}function p(e){return h(e.source,c(e.source,e.start))}function h(e,t){var i=e.locationOffset.column-1,n=u(i)+e.body,r=t.line-1,a=e.locationOffset.line-1,s=t.line+a,o=1===t.line?i:0,c=t.column+o,p="".concat(e.name,":").concat(s,":").concat(c,"\n"),h=n.split(/\r\n|[\n\r]/g),d=h[r];if(d.length>120){for(var f=Math.floor(c/80),v=c%80,E=[],T=0;T<d.length;T+=80)E.push(d.slice(T,T+80));return p+l([["".concat(s),E[0]]].concat(E.slice(1,f+1).map(function(e){return["",e]}),[[" ",u(v-1)+"^"],["",E[f+1]]]))}return p+l([["".concat(s-1),h[r-1]],["".concat(s),d],["",u(c-1)+"^"],["".concat(s+1),h[r+1]]])}function l(e){var t=e.filter(function(e){e[0];return void 0!==e[1]}),i=Math.max.apply(Math,t.map(function(e){return e[0].length}));return t.map(function(e){var t,n=e[0],r=e[1];return u(i-(t=n).length)+t+(r?" | "+r:" |")}).join("\n")}function u(e){return Array(e+1).join(" ")}function d(e,t,i,n,r,a,s){var p=Array.isArray(t)?0!==t.length?t:void 0:t?[t]:void 0,h=i;if(!h&&p){var l=p[0];h=l&&l.loc&&l.loc.source}var u,f=n;!f&&p&&(f=p.reduce(function(e,t){return t.loc&&e.push(t.loc.start),e},[])),f&&0===f.length&&(f=void 0),n&&i?u=n.map(function(e){return c(i,e)}):p&&(u=p.reduce(function(e,t){return t.loc&&e.push(c(t.loc.source,t.loc.start)),e},[]));var v,E=s;if(null==E&&null!=a){var T=a.extensions;"object"==o(v=T)&&null!==v&&(E=T)}Object.defineProperties(this,{message:{value:e,enumerable:!0,writable:!0},locations:{value:u||void 0,enumerable:Boolean(u)},path:{value:r||void 0,enumerable:Boolean(r)},nodes:{value:p||void 0},source:{value:h||void 0},positions:{value:f||void 0},originalError:{value:a},extensions:{value:E||void 0,enumerable:Boolean(E)}}),a&&a.stack?Object.defineProperty(this,"stack",{value:a.stack,writable:!0,configurable:!0}):Error.captureStackTrace?Error.captureStackTrace(this,d):Object.defineProperty(this,"stack",{value:Error().stack,writable:!0,configurable:!0})}function f(e,t,i){return new d("Syntax Error: ".concat(i),void 0,e,[t])}d.prototype=Object.create(Error.prototype,{constructor:{value:d},name:{value:"GraphQLError"},toString:{value:function(){return function(e){var t=e.message;if(e.nodes)for(var i=0,n=e.nodes;i<n.length;i++){var r=n[i];r.loc&&(t+="\n\n"+p(r.loc))}else if(e.source&&e.locations)for(var a=0,s=e.locations;a<s.length;a++){var o=s[a];t+="\n\n"+h(e.source,o)}return t}(this)}}});var v=i(266);var E,T=function(e,t,i){this.body=e,this.name=t||"GraphQL request",this.locationOffset=i||{line:1,column:1},this.locationOffset.line>0||r(0,"line in locationOffset is 1-indexed and must be positive"),this.locationOffset.column>0||r(0,"column in locationOffset is 1-indexed and must be positive")};E=T,"function"===typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(E.prototype,Symbol.toStringTag,{get:function(){return this.constructor.name}});var N=i(265),m=Object.freeze({SOF:"<SOF>",EOF:"<EOF>",BANG:"!",DOLLAR:"$",AMP:"&",PAREN_L:"(",PAREN_R:")",SPREAD:"...",COLON:":",EQUALS:"=",AT:"@",BRACKET_L:"[",BRACKET_R:"]",BRACE_L:"{",PIPE:"|",BRACE_R:"}",NAME:"Name",INT:"Int",FLOAT:"Float",STRING:"String",BLOCK_STRING:"BlockString",COMMENT:"Comment"});function k(){return this.lastToken=this.token,this.token=this.lookahead()}function x(){var e=this.token;if(e.kind!==m.EOF)do{e=e.next||(e.next=I(this,e))}while(e.kind===m.COMMENT);return e}function y(e,t,i,n,r,a,s){this.kind=e,this.start=t,this.end=i,this.line=n,this.column=r,this.value=s,this.prev=a,this.next=null}function _(e){return isNaN(e)?m.EOF:e<127?JSON.stringify(String.fromCharCode(e)):'"\\u'.concat(("00"+e.toString(16).toUpperCase()).slice(-4),'"')}function I(e,t){var i=e.source,n=i.body,r=n.length,a=function(e,t,i){var n=e.length,r=t;for(;r<n;){var a=e.charCodeAt(r);if(9===a||32===a||44===a||65279===a)++r;else if(10===a)++r,++i.line,i.lineStart=r;else{if(13!==a)break;10===e.charCodeAt(r+1)?r+=2:++r,++i.line,i.lineStart=r}}return r}(n,t.end,e),s=e.line,o=1+a-e.lineStart;if(a>=r)return new y(m.EOF,r,r,s,o,t);var c=n.charCodeAt(a);switch(c){case 33:return new y(m.BANG,a,a+1,s,o,t);case 35:return function(e,t,i,n,r){var a,s=e.body,o=t;do{a=s.charCodeAt(++o)}while(!isNaN(a)&&(a>31||9===a));return new y(m.COMMENT,t,o,i,n,r,s.slice(t+1,o))}(i,a,s,o,t);case 36:return new y(m.DOLLAR,a,a+1,s,o,t);case 38:return new y(m.AMP,a,a+1,s,o,t);case 40:return new y(m.PAREN_L,a,a+1,s,o,t);case 41:return new y(m.PAREN_R,a,a+1,s,o,t);case 46:if(46===n.charCodeAt(a+1)&&46===n.charCodeAt(a+2))return new y(m.SPREAD,a,a+3,s,o,t);break;case 58:return new y(m.COLON,a,a+1,s,o,t);case 61:return new y(m.EQUALS,a,a+1,s,o,t);case 64:return new y(m.AT,a,a+1,s,o,t);case 91:return new y(m.BRACKET_L,a,a+1,s,o,t);case 93:return new y(m.BRACKET_R,a,a+1,s,o,t);case 123:return new y(m.BRACE_L,a,a+1,s,o,t);case 124:return new y(m.PIPE,a,a+1,s,o,t);case 125:return new y(m.BRACE_R,a,a+1,s,o,t);case 65:case 66:case 67:case 68:case 69:case 70:case 71:case 72:case 73:case 74:case 75:case 76:case 77:case 78:case 79:case 80:case 81:case 82:case 83:case 84:case 85:case 86:case 87:case 88:case 89:case 90:case 95:case 97:case 98:case 99:case 100:case 101:case 102:case 103:case 104:case 105:case 106:case 107:case 108:case 109:case 110:case 111:case 112:case 113:case 114:case 115:case 116:case 117:case 118:case 119:case 120:case 121:case 122:return function(e,t,i,n,r){var a=e.body,s=a.length,o=t+1,c=0;for(;o!==s&&!isNaN(c=a.charCodeAt(o))&&(95===c||c>=48&&c<=57||c>=65&&c<=90||c>=97&&c<=122);)++o;return new y(m.NAME,t,o,i,n,r,a.slice(t,o))}(i,a,s,o,t);case 45:case 48:case 49:case 50:case 51:case 52:case 53:case 54:case 55:case 56:case 57:return function(e,t,i,n,r,a){var s=e.body,o=i,c=t,p=!1;45===o&&(o=s.charCodeAt(++c));if(48===o){if((o=s.charCodeAt(++c))>=48&&o<=57)throw f(e,c,"Invalid number, unexpected digit after 0: ".concat(_(o),"."))}else c=A(e,c,o),o=s.charCodeAt(c);46===o&&(p=!0,o=s.charCodeAt(++c),c=A(e,c,o),o=s.charCodeAt(c));69!==o&&101!==o||(p=!0,43!==(o=s.charCodeAt(++c))&&45!==o||(o=s.charCodeAt(++c)),c=A(e,c,o),o=s.charCodeAt(c));if(46===o||69===o||101===o)throw f(e,c,"Invalid number, expected digit but got: ".concat(_(o),"."));return new y(p?m.FLOAT:m.INT,t,c,n,r,a,s.slice(t,c))}(i,a,c,s,o,t);case 34:return 34===n.charCodeAt(a+1)&&34===n.charCodeAt(a+2)?function(e,t,i,n,r,a){var s=e.body,o=t+3,c=o,p=0,h="";for(;o<s.length&&!isNaN(p=s.charCodeAt(o));){if(34===p&&34===s.charCodeAt(o+1)&&34===s.charCodeAt(o+2))return h+=s.slice(c,o),new y(m.BLOCK_STRING,t,o+3,i,n,r,Object(N.a)(h));if(p<32&&9!==p&&10!==p&&13!==p)throw f(e,o,"Invalid character within String: ".concat(_(p),"."));10===p?(++o,++a.line,a.lineStart=o):13===p?(10===s.charCodeAt(o+1)?o+=2:++o,++a.line,a.lineStart=o):92===p&&34===s.charCodeAt(o+1)&&34===s.charCodeAt(o+2)&&34===s.charCodeAt(o+3)?(h+=s.slice(c,o)+'"""',c=o+=4):++o}throw f(e,o,"Unterminated string.")}(i,a,s,o,t,e):function(e,t,i,n,r){var a=e.body,s=t+1,o=s,c=0,p="";for(;s<a.length&&!isNaN(c=a.charCodeAt(s))&&10!==c&&13!==c;){if(34===c)return p+=a.slice(o,s),new y(m.STRING,t,s+1,i,n,r,p);if(c<32&&9!==c)throw f(e,s,"Invalid character within String: ".concat(_(c),"."));if(++s,92===c){switch(p+=a.slice(o,s-1),c=a.charCodeAt(s)){case 34:p+='"';break;case 47:p+="/";break;case 92:p+="\\";break;case 98:p+="\b";break;case 102:p+="\f";break;case 110:p+="\n";break;case 114:p+="\r";break;case 116:p+="\t";break;case 117:var h=(u=a.charCodeAt(s+1),d=a.charCodeAt(s+2),v=a.charCodeAt(s+3),E=a.charCodeAt(s+4),O(u)<<12|O(d)<<8|O(v)<<4|O(E));if(h<0){var l=a.slice(s+1,s+5);throw f(e,s,"Invalid character escape sequence: \\u".concat(l,"."))}p+=String.fromCharCode(h),s+=4;break;default:throw f(e,s,"Invalid character escape sequence: \\".concat(String.fromCharCode(c),"."))}o=++s}}var u,d,v,E;throw f(e,s,"Unterminated string.")}(i,a,s,o,t)}throw f(i,a,function(e){if(e<32&&9!==e&&10!==e&&13!==e)return"Cannot contain the invalid character ".concat(_(e),".");if(39===e)return"Unexpected single quote character ('), did you mean to use a double quote (\")?";return"Cannot parse the unexpected character ".concat(_(e),".")}(c))}function A(e,t,i){var n=e.body,r=t,a=i;if(a>=48&&a<=57){do{a=n.charCodeAt(++r)}while(a>=48&&a<=57);return r}throw f(e,r,"Invalid number, expected digit but got: ".concat(_(a),"."))}function O(e){return e>=48&&e<=57?e-48:e>=65&&e<=70?e-55:e>=97&&e<=102?e-87:-1}s(y,function(){return{kind:this.kind,value:this.value,line:this.line,column:this.column}});var D=Object.freeze({QUERY:"QUERY",MUTATION:"MUTATION",SUBSCRIPTION:"SUBSCRIPTION",FIELD:"FIELD",FRAGMENT_DEFINITION:"FRAGMENT_DEFINITION",FRAGMENT_SPREAD:"FRAGMENT_SPREAD",INLINE_FRAGMENT:"INLINE_FRAGMENT",VARIABLE_DEFINITION:"VARIABLE_DEFINITION",SCHEMA:"SCHEMA",SCALAR:"SCALAR",OBJECT:"OBJECT",FIELD_DEFINITION:"FIELD_DEFINITION",ARGUMENT_DEFINITION:"ARGUMENT_DEFINITION",INTERFACE:"INTERFACE",UNION:"UNION",ENUM:"ENUM",ENUM_VALUE:"ENUM_VALUE",INPUT_OBJECT:"INPUT_OBJECT",INPUT_FIELD_DEFINITION:"INPUT_FIELD_DEFINITION"});function C(e,t){return new w(e,t).parseDocument()}function R(e,t){var i=new w(e,t);i.expectToken(m.SOF);var n=i.parseValueLiteral(!1);return i.expectToken(m.EOF),n}function S(e,t){var i=new w(e,t);i.expectToken(m.SOF);var n=i.parseTypeReference();return i.expectToken(m.EOF),n}i.d(t,"parse",function(){return C}),i.d(t,"parseValue",function(){return R}),i.d(t,"parseType",function(){return S});var w=function(){function e(e,t){var i="string"===typeof e?new T(e):e;i instanceof T||r(0,"Must provide Source. Received: ".concat(Object(n.a)(i))),this._lexer=function(e,t){var i=new y(m.SOF,0,0,0,0,null);return{source:e,options:t,lastToken:i,token:i,line:1,lineStart:0,advance:k,lookahead:x}}(i),this._options=t||{}}var t=e.prototype;return t.parseName=function(){var e=this.expectToken(m.NAME);return{kind:v.a.NAME,value:e.value,loc:this.loc(e)}},t.parseDocument=function(){var e=this._lexer.token;return{kind:v.a.DOCUMENT,definitions:this.many(m.SOF,this.parseDefinition,m.EOF),loc:this.loc(e)}},t.parseDefinition=function(){if(this.peek(m.NAME))switch(this._lexer.token.value){case"query":case"mutation":case"subscription":return this.parseOperationDefinition();case"fragment":return this.parseFragmentDefinition();case"schema":case"scalar":case"type":case"interface":case"union":case"enum":case"input":case"directive":return this.parseTypeSystemDefinition();case"extend":return this.parseTypeSystemExtension()}else{if(this.peek(m.BRACE_L))return this.parseOperationDefinition();if(this.peekDescription())return this.parseTypeSystemDefinition()}throw this.unexpected()},t.parseOperationDefinition=function(){var e=this._lexer.token;if(this.peek(m.BRACE_L))return{kind:v.a.OPERATION_DEFINITION,operation:"query",name:void 0,variableDefinitions:[],directives:[],selectionSet:this.parseSelectionSet(),loc:this.loc(e)};var t,i=this.parseOperationType();return this.peek(m.NAME)&&(t=this.parseName()),{kind:v.a.OPERATION_DEFINITION,operation:i,name:t,variableDefinitions:this.parseVariableDefinitions(),directives:this.parseDirectives(!1),selectionSet:this.parseSelectionSet(),loc:this.loc(e)}},t.parseOperationType=function(){var e=this.expectToken(m.NAME);switch(e.value){case"query":return"query";case"mutation":return"mutation";case"subscription":return"subscription"}throw this.unexpected(e)},t.parseVariableDefinitions=function(){return this.optionalMany(m.PAREN_L,this.parseVariableDefinition,m.PAREN_R)},t.parseVariableDefinition=function(){var e=this._lexer.token;return{kind:v.a.VARIABLE_DEFINITION,variable:this.parseVariable(),type:(this.expectToken(m.COLON),this.parseTypeReference()),defaultValue:this.expectOptionalToken(m.EQUALS)?this.parseValueLiteral(!0):void 0,directives:this.parseDirectives(!0),loc:this.loc(e)}},t.parseVariable=function(){var e=this._lexer.token;return this.expectToken(m.DOLLAR),{kind:v.a.VARIABLE,name:this.parseName(),loc:this.loc(e)}},t.parseSelectionSet=function(){var e=this._lexer.token;return{kind:v.a.SELECTION_SET,selections:this.many(m.BRACE_L,this.parseSelection,m.BRACE_R),loc:this.loc(e)}},t.parseSelection=function(){return this.peek(m.SPREAD)?this.parseFragment():this.parseField()},t.parseField=function(){var e,t,i=this._lexer.token,n=this.parseName();return this.expectOptionalToken(m.COLON)?(e=n,t=this.parseName()):t=n,{kind:v.a.FIELD,alias:e,name:t,arguments:this.parseArguments(!1),directives:this.parseDirectives(!1),selectionSet:this.peek(m.BRACE_L)?this.parseSelectionSet():void 0,loc:this.loc(i)}},t.parseArguments=function(e){var t=e?this.parseConstArgument:this.parseArgument;return this.optionalMany(m.PAREN_L,t,m.PAREN_R)},t.parseArgument=function(){var e=this._lexer.token,t=this.parseName();return this.expectToken(m.COLON),{kind:v.a.ARGUMENT,name:t,value:this.parseValueLiteral(!1),loc:this.loc(e)}},t.parseConstArgument=function(){var e=this._lexer.token;return{kind:v.a.ARGUMENT,name:this.parseName(),value:(this.expectToken(m.COLON),this.parseValueLiteral(!0)),loc:this.loc(e)}},t.parseFragment=function(){var e=this._lexer.token;this.expectToken(m.SPREAD);var t=this.expectOptionalKeyword("on");return!t&&this.peek(m.NAME)?{kind:v.a.FRAGMENT_SPREAD,name:this.parseFragmentName(),directives:this.parseDirectives(!1),loc:this.loc(e)}:{kind:v.a.INLINE_FRAGMENT,typeCondition:t?this.parseNamedType():void 0,directives:this.parseDirectives(!1),selectionSet:this.parseSelectionSet(),loc:this.loc(e)}},t.parseFragmentDefinition=function(){var e=this._lexer.token;return this.expectKeyword("fragment"),this._options.experimentalFragmentVariables?{kind:v.a.FRAGMENT_DEFINITION,name:this.parseFragmentName(),variableDefinitions:this.parseVariableDefinitions(),typeCondition:(this.expectKeyword("on"),this.parseNamedType()),directives:this.parseDirectives(!1),selectionSet:this.parseSelectionSet(),loc:this.loc(e)}:{kind:v.a.FRAGMENT_DEFINITION,name:this.parseFragmentName(),typeCondition:(this.expectKeyword("on"),this.parseNamedType()),directives:this.parseDirectives(!1),selectionSet:this.parseSelectionSet(),loc:this.loc(e)}},t.parseFragmentName=function(){if("on"===this._lexer.token.value)throw this.unexpected();return this.parseName()},t.parseValueLiteral=function(e){var t=this._lexer.token;switch(t.kind){case m.BRACKET_L:return this.parseList(e);case m.BRACE_L:return this.parseObject(e);case m.INT:return this._lexer.advance(),{kind:v.a.INT,value:t.value,loc:this.loc(t)};case m.FLOAT:return this._lexer.advance(),{kind:v.a.FLOAT,value:t.value,loc:this.loc(t)};case m.STRING:case m.BLOCK_STRING:return this.parseStringLiteral();case m.NAME:return"true"===t.value||"false"===t.value?(this._lexer.advance(),{kind:v.a.BOOLEAN,value:"true"===t.value,loc:this.loc(t)}):"null"===t.value?(this._lexer.advance(),{kind:v.a.NULL,loc:this.loc(t)}):(this._lexer.advance(),{kind:v.a.ENUM,value:t.value,loc:this.loc(t)});case m.DOLLAR:if(!e)return this.parseVariable()}throw this.unexpected()},t.parseStringLiteral=function(){var e=this._lexer.token;return this._lexer.advance(),{kind:v.a.STRING,value:e.value,block:e.kind===m.BLOCK_STRING,loc:this.loc(e)}},t.parseList=function(e){var t=this,i=this._lexer.token;return{kind:v.a.LIST,values:this.any(m.BRACKET_L,function(){return t.parseValueLiteral(e)},m.BRACKET_R),loc:this.loc(i)}},t.parseObject=function(e){var t=this,i=this._lexer.token;return{kind:v.a.OBJECT,fields:this.any(m.BRACE_L,function(){return t.parseObjectField(e)},m.BRACE_R),loc:this.loc(i)}},t.parseObjectField=function(e){var t=this._lexer.token,i=this.parseName();return this.expectToken(m.COLON),{kind:v.a.OBJECT_FIELD,name:i,value:this.parseValueLiteral(e),loc:this.loc(t)}},t.parseDirectives=function(e){for(var t=[];this.peek(m.AT);)t.push(this.parseDirective(e));return t},t.parseDirective=function(e){var t=this._lexer.token;return this.expectToken(m.AT),{kind:v.a.DIRECTIVE,name:this.parseName(),arguments:this.parseArguments(e),loc:this.loc(t)}},t.parseTypeReference=function(){var e,t=this._lexer.token;return this.expectOptionalToken(m.BRACKET_L)?(e=this.parseTypeReference(),this.expectToken(m.BRACKET_R),e={kind:v.a.LIST_TYPE,type:e,loc:this.loc(t)}):e=this.parseNamedType(),this.expectOptionalToken(m.BANG)?{kind:v.a.NON_NULL_TYPE,type:e,loc:this.loc(t)}:e},t.parseNamedType=function(){var e=this._lexer.token;return{kind:v.a.NAMED_TYPE,name:this.parseName(),loc:this.loc(e)}},t.parseTypeSystemDefinition=function(){var e=this.peekDescription()?this._lexer.lookahead():this._lexer.token;if(e.kind===m.NAME)switch(e.value){case"schema":return this.parseSchemaDefinition();case"scalar":return this.parseScalarTypeDefinition();case"type":return this.parseObjectTypeDefinition();case"interface":return this.parseInterfaceTypeDefinition();case"union":return this.parseUnionTypeDefinition();case"enum":return this.parseEnumTypeDefinition();case"input":return this.parseInputObjectTypeDefinition();case"directive":return this.parseDirectiveDefinition()}throw this.unexpected(e)},t.peekDescription=function(){return this.peek(m.STRING)||this.peek(m.BLOCK_STRING)},t.parseDescription=function(){if(this.peekDescription())return this.parseStringLiteral()},t.parseSchemaDefinition=function(){var e=this._lexer.token;this.expectKeyword("schema");var t=this.parseDirectives(!0),i=this.many(m.BRACE_L,this.parseOperationTypeDefinition,m.BRACE_R);return{kind:v.a.SCHEMA_DEFINITION,directives:t,operationTypes:i,loc:this.loc(e)}},t.parseOperationTypeDefinition=function(){var e=this._lexer.token,t=this.parseOperationType();this.expectToken(m.COLON);var i=this.parseNamedType();return{kind:v.a.OPERATION_TYPE_DEFINITION,operation:t,type:i,loc:this.loc(e)}},t.parseScalarTypeDefinition=function(){var e=this._lexer.token,t=this.parseDescription();this.expectKeyword("scalar");var i=this.parseName(),n=this.parseDirectives(!0);return{kind:v.a.SCALAR_TYPE_DEFINITION,description:t,name:i,directives:n,loc:this.loc(e)}},t.parseObjectTypeDefinition=function(){var e=this._lexer.token,t=this.parseDescription();this.expectKeyword("type");var i=this.parseName(),n=this.parseImplementsInterfaces(),r=this.parseDirectives(!0),a=this.parseFieldsDefinition();return{kind:v.a.OBJECT_TYPE_DEFINITION,description:t,name:i,interfaces:n,directives:r,fields:a,loc:this.loc(e)}},t.parseImplementsInterfaces=function(){var e=[];if(this.expectOptionalKeyword("implements")){this.expectOptionalToken(m.AMP);do{e.push(this.parseNamedType())}while(this.expectOptionalToken(m.AMP)||this._options.allowLegacySDLImplementsInterfaces&&this.peek(m.NAME))}return e},t.parseFieldsDefinition=function(){return this._options.allowLegacySDLEmptyFields&&this.peek(m.BRACE_L)&&this._lexer.lookahead().kind===m.BRACE_R?(this._lexer.advance(),this._lexer.advance(),[]):this.optionalMany(m.BRACE_L,this.parseFieldDefinition,m.BRACE_R)},t.parseFieldDefinition=function(){var e=this._lexer.token,t=this.parseDescription(),i=this.parseName(),n=this.parseArgumentDefs();this.expectToken(m.COLON);var r=this.parseTypeReference(),a=this.parseDirectives(!0);return{kind:v.a.FIELD_DEFINITION,description:t,name:i,arguments:n,type:r,directives:a,loc:this.loc(e)}},t.parseArgumentDefs=function(){return this.optionalMany(m.PAREN_L,this.parseInputValueDef,m.PAREN_R)},t.parseInputValueDef=function(){var e=this._lexer.token,t=this.parseDescription(),i=this.parseName();this.expectToken(m.COLON);var n,r=this.parseTypeReference();this.expectOptionalToken(m.EQUALS)&&(n=this.parseValueLiteral(!0));var a=this.parseDirectives(!0);return{kind:v.a.INPUT_VALUE_DEFINITION,description:t,name:i,type:r,defaultValue:n,directives:a,loc:this.loc(e)}},t.parseInterfaceTypeDefinition=function(){var e=this._lexer.token,t=this.parseDescription();this.expectKeyword("interface");var i=this.parseName(),n=this.parseDirectives(!0),r=this.parseFieldsDefinition();return{kind:v.a.INTERFACE_TYPE_DEFINITION,description:t,name:i,directives:n,fields:r,loc:this.loc(e)}},t.parseUnionTypeDefinition=function(){var e=this._lexer.token,t=this.parseDescription();this.expectKeyword("union");var i=this.parseName(),n=this.parseDirectives(!0),r=this.parseUnionMemberTypes();return{kind:v.a.UNION_TYPE_DEFINITION,description:t,name:i,directives:n,types:r,loc:this.loc(e)}},t.parseUnionMemberTypes=function(){var e=[];if(this.expectOptionalToken(m.EQUALS)){this.expectOptionalToken(m.PIPE);do{e.push(this.parseNamedType())}while(this.expectOptionalToken(m.PIPE))}return e},t.parseEnumTypeDefinition=function(){var e=this._lexer.token,t=this.parseDescription();this.expectKeyword("enum");var i=this.parseName(),n=this.parseDirectives(!0),r=this.parseEnumValuesDefinition();return{kind:v.a.ENUM_TYPE_DEFINITION,description:t,name:i,directives:n,values:r,loc:this.loc(e)}},t.parseEnumValuesDefinition=function(){return this.optionalMany(m.BRACE_L,this.parseEnumValueDefinition,m.BRACE_R)},t.parseEnumValueDefinition=function(){var e=this._lexer.token,t=this.parseDescription(),i=this.parseName(),n=this.parseDirectives(!0);return{kind:v.a.ENUM_VALUE_DEFINITION,description:t,name:i,directives:n,loc:this.loc(e)}},t.parseInputObjectTypeDefinition=function(){var e=this._lexer.token,t=this.parseDescription();this.expectKeyword("input");var i=this.parseName(),n=this.parseDirectives(!0),r=this.parseInputFieldsDefinition();return{kind:v.a.INPUT_OBJECT_TYPE_DEFINITION,description:t,name:i,directives:n,fields:r,loc:this.loc(e)}},t.parseInputFieldsDefinition=function(){return this.optionalMany(m.BRACE_L,this.parseInputValueDef,m.BRACE_R)},t.parseTypeSystemExtension=function(){var e=this._lexer.lookahead();if(e.kind===m.NAME)switch(e.value){case"schema":return this.parseSchemaExtension();case"scalar":return this.parseScalarTypeExtension();case"type":return this.parseObjectTypeExtension();case"interface":return this.parseInterfaceTypeExtension();case"union":return this.parseUnionTypeExtension();case"enum":return this.parseEnumTypeExtension();case"input":return this.parseInputObjectTypeExtension()}throw this.unexpected(e)},t.parseSchemaExtension=function(){var e=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("schema");var t=this.parseDirectives(!0),i=this.optionalMany(m.BRACE_L,this.parseOperationTypeDefinition,m.BRACE_R);if(0===t.length&&0===i.length)throw this.unexpected();return{kind:v.a.SCHEMA_EXTENSION,directives:t,operationTypes:i,loc:this.loc(e)}},t.parseScalarTypeExtension=function(){var e=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("scalar");var t=this.parseName(),i=this.parseDirectives(!0);if(0===i.length)throw this.unexpected();return{kind:v.a.SCALAR_TYPE_EXTENSION,name:t,directives:i,loc:this.loc(e)}},t.parseObjectTypeExtension=function(){var e=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("type");var t=this.parseName(),i=this.parseImplementsInterfaces(),n=this.parseDirectives(!0),r=this.parseFieldsDefinition();if(0===i.length&&0===n.length&&0===r.length)throw this.unexpected();return{kind:v.a.OBJECT_TYPE_EXTENSION,name:t,interfaces:i,directives:n,fields:r,loc:this.loc(e)}},t.parseInterfaceTypeExtension=function(){var e=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("interface");var t=this.parseName(),i=this.parseDirectives(!0),n=this.parseFieldsDefinition();if(0===i.length&&0===n.length)throw this.unexpected();return{kind:v.a.INTERFACE_TYPE_EXTENSION,name:t,directives:i,fields:n,loc:this.loc(e)}},t.parseUnionTypeExtension=function(){var e=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("union");var t=this.parseName(),i=this.parseDirectives(!0),n=this.parseUnionMemberTypes();if(0===i.length&&0===n.length)throw this.unexpected();return{kind:v.a.UNION_TYPE_EXTENSION,name:t,directives:i,types:n,loc:this.loc(e)}},t.parseEnumTypeExtension=function(){var e=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("enum");var t=this.parseName(),i=this.parseDirectives(!0),n=this.parseEnumValuesDefinition();if(0===i.length&&0===n.length)throw this.unexpected();return{kind:v.a.ENUM_TYPE_EXTENSION,name:t,directives:i,values:n,loc:this.loc(e)}},t.parseInputObjectTypeExtension=function(){var e=this._lexer.token;this.expectKeyword("extend"),this.expectKeyword("input");var t=this.parseName(),i=this.parseDirectives(!0),n=this.parseInputFieldsDefinition();if(0===i.length&&0===n.length)throw this.unexpected();return{kind:v.a.INPUT_OBJECT_TYPE_EXTENSION,name:t,directives:i,fields:n,loc:this.loc(e)}},t.parseDirectiveDefinition=function(){var e=this._lexer.token,t=this.parseDescription();this.expectKeyword("directive"),this.expectToken(m.AT);var i=this.parseName(),n=this.parseArgumentDefs(),r=this.expectOptionalKeyword("repeatable");this.expectKeyword("on");var a=this.parseDirectiveLocations();return{kind:v.a.DIRECTIVE_DEFINITION,description:t,name:i,arguments:n,repeatable:r,locations:a,loc:this.loc(e)}},t.parseDirectiveLocations=function(){this.expectOptionalToken(m.PIPE);var e=[];do{e.push(this.parseDirectiveLocation())}while(this.expectOptionalToken(m.PIPE));return e},t.parseDirectiveLocation=function(){var e=this._lexer.token,t=this.parseName();if(void 0!==D[t.value])return t;throw this.unexpected(e)},t.loc=function(e){if(!this._options.noLocation)return new b(e,this._lexer.lastToken,this._lexer.source)},t.peek=function(e){return this._lexer.token.kind===e},t.expectToken=function(e){var t=this._lexer.token;if(t.kind===e)return this._lexer.advance(),t;throw f(this._lexer.source,t.start,"Expected ".concat(e,", found ").concat(L(t)))},t.expectOptionalToken=function(e){var t=this._lexer.token;if(t.kind===e)return this._lexer.advance(),t},t.expectKeyword=function(e){var t=this._lexer.token;if(t.kind!==m.NAME||t.value!==e)throw f(this._lexer.source,t.start,'Expected "'.concat(e,'", found ').concat(L(t)));this._lexer.advance()},t.expectOptionalKeyword=function(e){var t=this._lexer.token;return t.kind===m.NAME&&t.value===e&&(this._lexer.advance(),!0)},t.unexpected=function(e){var t=e||this._lexer.token;return f(this._lexer.source,t.start,"Unexpected ".concat(L(t)))},t.any=function(e,t,i){this.expectToken(e);for(var n=[];!this.expectOptionalToken(i);)n.push(t.call(this));return n},t.optionalMany=function(e,t,i){if(this.expectOptionalToken(e)){var n=[];do{n.push(t.call(this))}while(!this.expectOptionalToken(i));return n}return[]},t.many=function(e,t,i){this.expectToken(e);var n=[];do{n.push(t.call(this))}while(!this.expectOptionalToken(i));return n},e}();function b(e,t,i){this.start=e.start,this.end=t.end,this.startToken=e,this.endToken=t,this.source=i}function L(e){var t=e.value;return t?"".concat(e.kind,' "').concat(t,'"'):e.kind}s(b,function(){return{start:this.start,end:this.end}})},677:function(e,t,i){"use strict";function n(e,t){return t||(t=e.slice(0)),Object.freeze(Object.defineProperties(e,{raw:{value:Object.freeze(t)}}))}i.d(t,"a",function(){return n})},678:function(e,t,i){var n=i(1524).parse;function r(e){return e.replace(/[\s,]+/g," ").trim()}var a={},s={};var o=!0;var c=!1;function p(e){var t=r(e);if(a[t])return a[t];var i=n(e,{experimentalFragmentVariables:c});if(!i||"Document"!==i.kind)throw new Error("Not a valid GraphQL document.");return i=function e(t,i){var n=Object.prototype.toString.call(t);if("[object Array]"===n)return t.map(function(t){return e(t,i)});if("[object Object]"!==n)throw new Error("Unexpected input.");i&&t.loc&&delete t.loc,t.loc&&(delete t.loc.startToken,delete t.loc.endToken);var r,a,s,o=Object.keys(t);for(r in o)o.hasOwnProperty(r)&&(a=t[o[r]],"[object Object]"!==(s=Object.prototype.toString.call(a))&&"[object Array]"!==s||(t[o[r]]=e(a,!0)));return t}(i=function(e){for(var t,i={},n=[],a=0;a<e.definitions.length;a++){var c=e.definitions[a];if("FragmentDefinition"===c.kind){var p=c.name.value,h=r((t=c.loc).source.body.substring(t.start,t.end));s.hasOwnProperty(p)&&!s[p][h]?(o&&console.warn("Warning: fragment with name "+p+" already exists.\ngraphql-tag enforces all fragment names across your application to be unique; read more about\nthis in the docs: http://dev.apollodata.com/core/fragments.html#unique-names"),s[p][h]=!0):s.hasOwnProperty(p)||(s[p]={},s[p][h]=!0),i[h]||(i[h]=!0,n.push(c))}else n.push(c)}return e.definitions=n,e}(i),!1),a[t]=i,i}function h(){for(var e=Array.prototype.slice.call(arguments),t=e[0],i="string"===typeof t?t:t[0],n=1;n<e.length;n++)e[n]&&e[n].kind&&"Document"===e[n].kind?i+=e[n].loc.source.body:i+=e[n],i+=t[n];return p(i)}h.default=h,h.resetCaches=function(){a={},s={}},h.disableFragmentWarnings=function(){o=!1},h.enableExperimentalFragmentVariables=function(){c=!0},h.disableExperimentalFragmentVariables=function(){c=!1},e.exports=h}}]);
//# sourceMappingURL=2.2ccf50f5.chunk.js.map