local json = require 'cjson'
local file = 'lusty-request-file.request.file'
local pattern = 'lusty-request-pattern.request.pattern'

return {
  subscribers = {
    ['rewrite'] = {
      'lusty-rewrite-param.rewrite.accept',
      'lusty-rewrite-param.rewrite.method',
      'lusty-rewrite-param.rewrite.body',
      'lusty-rewrite-param.rewrite.content-type'
    },

    ['input'] = {
      -- decode json input if it exists in the body data.
      -- you can provide -- options to the handler as a table.
      -- in this case, we are passing in a json encoding/decoding function.
      ['lusty-json.input.json'] = { json = json }
    },

    -- / is routed to /index in nginx
    ['request'] = { [pattern] = {
      patterns = {
        { ['api/rsvp[/]?{rsvpId}']  = 'endpoint.rsvp' }
      }
    }},

    ['request:400'] = {[file] = 'error.400'},
    ['request:401'] = {[file] = 'error.401'},
    ['request:404'] = {[file] = 'error.404'},
    ['request:500'] = {[file] = 'error.500'},

    ['error'] = {
      ['lusty-error-status.error.status'] = {
        prefix = {{'input'}},
        status = {
          [400] = {{'request:400'}},
          [401] = {{'request:401'}},
          [404] = {{'request:404'}},
          [500] = {{'request:500'}},
        },
        suffix = {{'output'}}
      }
    },

    -- capture html requests as mustache handlers, and
    -- capture json requests to output handler data as json
    ['output'] = {
      ['lusty-json.output.json'] = { json = json, default = true }
    },

    ['store:rsvp'] = {
      ['lusty-store-mongo.store.mongo'] = {
        collection = 'rsvp',
        host = '10.164.93.29',
        port = 27017,
        database = 'wedding',
        timeout = 5000
      }
    },
    -- log events should write to the console
    -- log events should also go up to nginx
    ['log'] = {
      'lusty-log-console.log.console'
    }
  },

  -- as requests come in, fire these events in order (corresponding to
  -- subscribers above)
  publishers = {
    {'rewrite'},
    {'input'},
    {'request'},
    {'error'},
    {'output'}
  },

  -- bind context methods to the context object that is passed around, so you
  -- can use things like context.log and context.store from within your handler
  context = {
    ['lusty-log.context.log'] = { level = 'debug' },
    ['lusty-store.context.store'] = {}
  }
}
