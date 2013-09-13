local store = context.store.rsvp

local methods = {

  GET = function(self, id, input)

    if not id then
      --list
      context.output = store.get({})
      context.response.status = 200

    else

      --get by id
      local result = store.get({_id = id})
      if result then

        context.output = result
        context.response.status = 200

      else

        context.response.status = 404
      end
    end
  end,

  POST = function(self, id, input)
    store.post(input)
    context.output = input
  end
}

context.response.status = 400
local method = context.request.method
return methods[method] and methods[method](methods, id, context.input)
