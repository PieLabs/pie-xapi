### pie-xapi

`pie-xapi` is a utility library that, when included in a PIE project, will listen for events sent by `pie-container` and
dispatch records of those to an xAPI provider.

#### Usage

1. Include the library and the [`xAPIWrapper`](https://github.com/adlnet/xAPIWrapper) dependencies in the `bower.json` 
file for [`serve-pie`](https://bitbucket.org/pietools/serve-pie):

    {
      ...
      "dependencies" : {
        ...
        "xAPIWrapper" : "git@github.com:adlnet/xAPIWrapper.git#v1.10.0",
        "pie-xapi" : "git@bitbucket.org:pielibs/pie-xapi.git",
        ...
      }
      ...
    }

2. Ensure that the library and its and included on import:

    <script type="text/javascript" src="/components/xAPIWrapper/dist/xapiwrapper.min.js"></script>
    <script type="text/javascript" src="/components/xAPIWrapper/src/xapistatement.js"></script>
    <script type="text/javascript" src="/components/pie-xapi/dist/pie-xapi.js"></script>

#### Building

    grunt

#### TODO

  * Build mechanism unnecessary?
  * Some way of figuring how the "Agent" data can be transmitted to `pie-xapi`. Currently hardcoded.
  * Some way to provide xAPI data to `pie-xapi`. Currently hardcoded.
  * Specify unique identifiers for PIE content so that the data is valid.