import { Injectable, NestMiddleware } from '@nestjs/common';

@Injectable()
export class CorsMiddlewareMiddleware implements NestMiddleware {

  
  use(req: any, res: any, next: () => void) {
    let allowedOrigins = ["*"];
            if (allowedOrigins.indexOf(req.header("Origin"))-1) {
                res.header("Access-Control-Allow-Origin", req.header("Origin"));
                res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
                res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, PATCH, DELETE");
            }
 
            next();
  }
}
