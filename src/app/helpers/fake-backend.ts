import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(
    backend: MockBackend, 
    options: BaseRequestOptions) {
    
      

  let activeAdminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6Ik5vbG9neS5pbyIsImlhdCI6MTUzODQ5OTY4MSwiZXhwIjoxNTQ4NDYwODAwLCJpc0FkbWluIjp0cnVlfQ.piOqYmMe-Qz-g3OT78wPc-ybPAjaQQ_NqEja7jF0X_0';
  let activeNotAdminToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6Ik5vbG9neS5pbyIsImlhdCI6MTUzODQ5OTY4MSwiZXhwIjoxNTQ4NDYwODAwLCJpc0FkbWluIjpmYWxzZX0.jmB9qQTEgetdV9OhT8IJUwK1Zr3Y1sOqf-Mujwi8GFI';  
  let inactiveToken='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwibmFtZSI6Ik5vbG9neS5pbyIsImlhdCI6MTUzODQ5OTY4MSwiZXhwIjoxNTM4NDk5NjgyfQ.lZvSS5luDP92-G-x_NX7MRbrnZp0X3sKq3KDYkHtUsw';
  let token=activeAdminToken;

  backend.connections.subscribe((connection: MockConnection) => {
    // We are using the setTimeout() function to simulate an 
    // asynchronous call to the server that takes 1 second. 
    setTimeout(() => {
      //
      // Fake implementation of /api/authenticate
      //
      if (connection.request.url.endsWith('/api/authenticate') &&
        connection.request.method === RequestMethod.Post) {
        let body = JSON.parse(connection.request.getBody());

        if (body.email === 'nology@domain.com' && body.password === '1234') {
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