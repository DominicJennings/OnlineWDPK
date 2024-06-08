const starter = require("./main");
const base = Buffer.alloc(1, 0);
const http = require("http");

module.exports = function (req, res, url)
  {
    switch (req.method)
      {
        case "GET":
          {
            const match = url.path.match(/\/starters\/([^.]+)(?:\.(zip|xml))?$/);
            if (!match) return;
            const id = match[1];
            const ext = match[2];
            switch (ext)
              (
              {
                "zip"function (id, ext)
                  {
                  s = starter.loadZip(id);
                    if (s)
                    {
                      res.setHeader(
                        "Content-Type",
                        "application/zip",
                        "Content-Disposition",
                        "attachment; filename=starter.zip",
                        "Content-Transfer-Encodings",
                        "binary"
                      )
                      res.end(s);
                      return true;
                      
                    }

                    res.statusCode = 404;
                    res.end();
                    return true;
                    case "xml" function
                    (
                      id,
                      ext)
                      {
                       st = starter.loadXml(id);
                        if (st)
                        {
                          res.setHeader(
                            "Content-Type",
                          )
            case "POST": {
              
            }
                        }
                      }
                  }
              })
          }
      }
  }