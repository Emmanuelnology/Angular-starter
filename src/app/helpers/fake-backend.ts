import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(
    backend: MockBackend, 
    options: BaseRequestOptions) {
    
      
  let jane={
      admin: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZmlyc3ROYW1lIjoiSmFuZSIsImxhc3ROYW1lIjoiRG9lIiwiZW1haWwiOiJqYW5lQGdtYWlsLmxvY2FsIiwiaWF0IjoxNTM4NDk5NjgxLCJleHAiOjE1NDg0NjA4MDAsImF2YXRhciI6Imh0dHBzOi8vd3d3LnJ0aS5vcmcvc2l0ZXMvZGVmYXVsdC9maWxlcy9zdHlsZXMvcnRpX3NxdWFyZV8xMDIwL3B1YmxpYy9leHBlcnQtaW1hZ2VzL2FsbGVuX2phbmVfNzk0MV81MTAuanBnP2l0b2s9VlZtbFVwTHciLCJpc0FkbWluIjp0cnVlfQ.BadiWPqYsxX7tvHRbjmnX_T4fqdW7vs1ies_NQup-tM",
      notAdmin: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZmlyc3ROYW1lIjoiSmFuZSIsImxhc3ROYW1lIjoiRG9lIiwiZW1haWwiOiJqYW5lQGdtYWlsLmxvY2FsIiwiaWF0IjoxNTM4NDk5NjgxLCJleHAiOjE1NDg0NjA4MDAsImF2YXRhciI6Imh0dHBzOi8vd3d3LnJ0aS5vcmcvc2l0ZXMvZGVmYXVsdC9maWxlcy9zdHlsZXMvcnRpX3NxdWFyZV8xMDIwL3B1YmxpYy9leHBlcnQtaW1hZ2VzL2FsbGVuX2phbmVfNzk0MV81MTAuanBnP2l0b2s9VlZtbFVwTHciLCJpc0FkbWluIjpmYWxzZX0.a2k3zspWMuj4FeGoouy-nJrHMlYyT9ClVH2IuXO-vl8"
    };
  let john={
      admin: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZmlyc3ROYW1lIjoiSm9obiIsImxhc3ROYW1lIjoiRG9lIiwiZW1haWwiOiJqb2huQGdtYWlsLmxvY2FsIiwiaWF0IjoxNTM4NDk5NjgxLCJleHAiOjE1NDg0NjA4MDAsImF2YXRhciI6Imh0dHBzOi8vd3d3LmhvYS5veC5hYy51ay9zaXRlcy9kZWZhdWx0L2ZpbGVzL3N0eWxlcy9wZXJzb25fcHJvZmlsZV9waG90by9wdWJsaWMvaG9hL2ltYWdlcy9wZXJzb24vam9obl9ibGFraW5nZXJfMy5qcGc_aXRvaz12R0dDTmZzVyIsImlzQWRtaW4iOnRydWV9.4OtF2gAEg87MjGGS-RKU3-jnP20i0gBe6hyqVPrMkw4",
      notAdmin: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZmlyc3ROYW1lIjoiSm9obiIsImxhc3ROYW1lIjoiRG9lIiwiZW1haWwiOiJqb2huQGdtYWlsLmxvY2FsIiwiaWF0IjoxNTM4NDk5NjgxLCJleHAiOjE1NDg0NjA4MDAsImF2YXRhciI6Imh0dHBzOi8vd3d3LmhvYS5veC5hYy51ay9zaXRlcy9kZWZhdWx0L2ZpbGVzL3N0eWxlcy9wZXJzb25fcHJvZmlsZV9waG90by9wdWJsaWMvaG9hL2ltYWdlcy9wZXJzb24vam9obl9ibGFraW5nZXJfMy5qcGc_aXRvaz12R0dDTmZzVyIsImlzQWRtaW4iOmZhbHNlfQ._ZRGljKt2WFqduP0oJJDqWKN4qC4O01V6c1anawf5Ls"
    };

  function getTokenFromEmail(email){
    let token:string;

    switch(email) {
      case "jane@gmail.admin":
          token=jane.admin;
          break;
      case "jane@gmail.local":
          token=jane.notAdmin;
          break;
      case "john@gmail.admin":
          token=john.admin;
          break;
      case "john@gmail.local":
          token=john.notAdmin;
          break;
  }
  return token;
  }

  backend.connections.subscribe((connection: MockConnection) => {
    // We are using the setTimeout() function to simulate an 
    // asynchronous call to the server that takes 1 second. 
    setTimeout(() => {
      //
      // Fake implementation of /api/authenticate
      //
      let token:string;
      if (connection.request.url.endsWith('/api/authenticate') &&
        connection.request.method === RequestMethod.Post) {
        let body = JSON.parse(connection.request.getBody());

        token=getTokenFromEmail(body.email);
        if (token && body.password === '1234') {
          connection.mockRespond(new Response(
            new ResponseOptions({
              status: 200,
              body: { token: token }
           })));
        } else {
          connection.mockRespond(new Response(
            new ResponseOptions({ status: 400 })
          ));
        }
      }



       // 
       // Fake implementation of /api/orders
       //
       if (connection.request.url.endsWith('/api/orders') && 
           connection.request.method === RequestMethod.Get) {
         if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {
            connection.mockRespond(new Response(
              new ResponseOptions({ status: 200, body: [1, 2, 3] })
         ));
       } else {
           connection.mockRespond(new Response(
             new ResponseOptions({ status: 401 })
           ));
       }
    }



    }, 1000);
  });

  return new Http(backend, options);
}

export let fakeBackendProvider = {
    provide: Http,
    useFactory: fakeBackendFactory,
    deps: [MockBackend, BaseRequestOptions]
};