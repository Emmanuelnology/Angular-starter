import { Http, BaseRequestOptions, Response, ResponseOptions, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

export function fakeBackendFactory(
    backend: MockBackend, 
    options: BaseRequestOptions) {
    
      
  let jane={
      admin: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxIiwiZmlyc3ROYW1lIjoiSmFuZSIsImxhc3ROYW1lIjoiQWRtaW4iLCJlbWFpbCI6ImphbmUuYWRtaW5Abm9sb2d5LnRlc3QiLCJpYXQiOjE1Mzg0OTk2ODEsImV4cCI6MTU0ODQ2MDgwMCwiYXZhdGFyIjoiaHR0cHM6Ly93d3cucnRpLm9yZy9zaXRlcy9kZWZhdWx0L2ZpbGVzL3N0eWxlcy9ydGlfc3F1YXJlXzEwMjAvcHVibGljL2V4cGVydC1pbWFnZXMvYWxsZW5famFuZV83OTQxXzUxMC5qcGc_aXRvaz1WVm1sVXBMdyIsImlzQWRtaW4iOnRydWV9.cKsdKIYIAdakj7VQBUBlBdd_-ciTFpuSvpYidDfAFCw",
      notAdmin: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIyIiwiZmlyc3ROYW1lIjoiSmFuZSIsImxhc3ROYW1lIjoiRG9lIiwiZW1haWwiOiJqYW5lLmRvZUBub2xvZ3kudGVzdCIsImlhdCI6MTUzODQ5OTY4MSwiZXhwIjoxNTQ4NDYwODAwLCJhdmF0YXIiOiJodHRwOi8vZW5kbGVzc3RoZW1lLmNvbS9zaW1wbGlmeTEuMC9pbWFnZXMvcHJvZmlsZS9wcm9maWxlNy5qcGciLCJpc0FkbWluIjpmYWxzZX0.ZSTtHrl8wdgH2ZYwPJMPSqiQAmVj8NxOBpb93p0P8aQ"
    };
  let john={
      admin: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzIiwiZmlyc3ROYW1lIjoiSm9obiIsImxhc3ROYW1lIjoiQWRtaW4iLCJlbWFpbCI6ImpvaG4uYWRtaW5Abm9sb2d5LnRlc3QiLCJpYXQiOjE1Mzg0OTk2ODEsImV4cCI6MTU0ODQ2MDgwMCwiYXZhdGFyIjoiaHR0cHM6Ly93d3cuaG9hLm94LmFjLnVrL3NpdGVzL2RlZmF1bHQvZmlsZXMvc3R5bGVzL3BlcnNvbl9wcm9maWxlX3Bob3RvL3B1YmxpYy9ob2EvaW1hZ2VzL3BlcnNvbi9qb2huX2JsYWtpbmdlcl8zLmpwZz9pdG9rPXZHR0NOZnNXIiwiaXNBZG1pbiI6dHJ1ZX0.mRC3Inw9yGNYSq3D2UCL8b02pvIVMGJ9ZTOErPUIuHg",
      notAdmin: "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI0IiwiZmlyc3ROYW1lIjoiSm9obiIsImxhc3ROYW1lIjoiRG9lIiwiZW1haWwiOiJqb2huLmRvZUBub2xvZ3kudGVzdCIsImlhdCI6MTUzODQ5OTY4MSwiZXhwIjoxNTQ4NDYwODAwLCJhdmF0YXIiOiJodHRwczovL2NhY3R1c3RoZW1lcy5jb20vYmxvZy93cC1jb250ZW50L3VwbG9hZHMvMjAxOC8wMS90dF9hdmF0YXJfc21hbGwuanBnIiwiaXNBZG1pbiI6ZmFsc2V9._SD_eP45umKEO6KzYI3edqf49m7KDbDShs4uRp42Xrs"
    };

  function getTokenFromEmail(email){
    let token:string;

    switch(email) {
      case "jane.admin@nology.test": //1
          token=jane.admin;
          break;
      case "jane.doe@nology.test": //2
          token=jane.notAdmin;
          break;
      case "john.admin@nology.test": //3
          token=john.admin;
          break;
      case "john.doe@nology.test": //4
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

     // 
       // Fake implementation of /api/users
       //
       if (connection.request.url.endsWith('/api/users') && 
           connection.request.method === RequestMethod.Get) {
         if (connection.request.headers.get('Authorization') === 'Bearer ' + token) {
            connection.mockRespond(new Response(
              new ResponseOptions({ status: 200, body: [
                {
                  "id":1,
                  "name": "Jane Admin",
                  "avatar": "https://www.rti.org/sites/default/files/styles/rti_square_1020/public/expert-images/allen_jane_7941_510.jpg?itok=VVmlUpLw",
                  "email": "jane.admin@nology.test"
                },
                {
                  "id":2,
                  "name": "Jane Doe",
                  "avatar": "http://endlesstheme.com/simplify1.0/images/profile/profile7.jpg",
                  "email": "jane.doe@nology.test"
                },
                {
                  "id":3,
                  "name": "John Admin",
                  "avatar": "https://www.hoa.ox.ac.uk/sites/default/files/styles/person_profile_photo/public/hoa/images/person/john_blakinger_3.jpg?itok=vGGCNfsW",
                  "email": "john.admin@nology.test"
                },
                {
                  "id":4,
                  "name": "John Doe",
                  "avatar": "https://cactusthemes.com/blog/wp-content/uploads/2018/01/tt_avatar_small.jpg",
                  "email": "john.doe@nology.test"
                }
              ] })
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