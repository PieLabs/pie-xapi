# pie-xapi

`pie-xapi` is a utility library that, when included in a PIE project, will listen for events sent by 
[`pie-container`](https://bitbucket.org/pielibs/pie-container) and
dispatch records of those to an xAPI provider.

## How it works

`pies` and `pie` containers will dispatch `pie` events with meaningful information about what's happening in the container or in the `pies`.

This library adds an event listener for events of type `pie`. It checks the `subType` and looks for a handler for the given `subType`. If found it'll call the handler function for the `subType` which will generate an `ADL.Statement`, this will then be sent to the `xapi` endpoint.

This library currently contains 2 mapping definitions (these will eventually be external libraries): 
* corespring-pie-multiple-choice - has a mapping for `choice-selected` and `choice-deselected`.
* container - has a mapping for `rendered`

These definitions are registered with the global `pieXapi` by calling `addMapping(key, mapping)`.

## Why?

Using events and a listener allows us to keep the `pies` and any `container` implementation free from any 3rd party concerns. So long as the events are meaningful and at the right level of granularity - any 3rd party integration should be able to integrate.

### Limitations

It's designed as a client side only solution. This may be a problem for certain deployment contexts (ie secure environments).

#### Alternative

##### Server side integration 

Instead of the client calling xapi directly, the client will send events to the `container` server: `POST /events`. This event handler will do the brokering (in a similar way to the mappings above) and dispatching to the server.



## Usage

Add `pie-xapi` as a dependency in `dependencies.json` in a `serve-pie` demo directory.

> You must run [serve-pie#feature/test-xapi](https://bitbucket.org/pietools/serve-pie/branch/feature/test-xapi) branch for this to work.

`serve-pie` will include the dependency in the loaded sample item.

## Building

```
grunt
```

