const request = require("supertest");
const app = require("../server");

const testAccountTenant = {
  username: "test",
  password: "test",
};

const testAccountAdmin = {
  username: "admin",
  password: "admin",
};

const testAccountPoc = {
  username: "nghiemhongthuy535",
  password: "nghiemhongthuy535",
};

let server;

// describe("Kiểm thử chức năng xem danh sách tài khoản", () => {
//   beforeAll(() => {
//     server = app.listen(10000); // Random number is needed to avoid using same port in different tests if you run in parallel
//   });

//   afterAll(() => {
//     server.close();
//   });
//   it("Xem danh sách tất cả tài khoản với quyền admin", async () => {
//     let response = await request(server).post("/auth/login").send({
//       username: testAccountAdmin.username,
//       password: testAccountAdmin.password,
//     });

//     let token = response.body.accessToken;

//     response = await request(server)
//       .get("/auth/get-list-poc-account")
//       .set("Authorization", `Bearer ${token}`);
//     expect(response.statusCode).toBe(200);
//     // console.log(response);
//     expect(response.body.length).toBe(3);
//   });

//   it("Xem danh sách tài khoản với quyền tenant", async () => {
//     let response = await request(server).post("/auth/login").send({
//       username: testAccountAdmin.username,
//       password: testAccountAdmin.password,
//     });

//     let token = response.body.accessToken;

//     response = await request(server)
//       .get("/auth/get-list-poc-account")
//       .set("Authorization", `Bearer ${token}`);
//     expect(response.statusCode).toBe(200);
//     // console.log(response);
//     expect(response.body.length).toBe(3);
//   });
// });

exports.testAccount = (app, request) => {
  describe("Kiểm thử chức năng xem danh sách tài khoản", () => {
    beforeAll(() => {
      server = app.listen(10000); // Random number is needed to avoid using same port in different tests if you run in parallel
    });

    afterAll(() => {
      server.close();
    });
    it("Xem danh sách tất cả tài khoản với quyền admin", async () => {
      let response = await request(server).post("/auth/login").send({
        username: testAccountAdmin.username,
        password: testAccountAdmin.password,
      });

      let token = response.body.accessToken;

      response = await request(server)
        .get("/auth/get-list-poc-account")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      // console.log(response);
      expect(response.body.length).toBe(3);
    });

    it("Xem danh sách tài khoản với quyền tenant", async () => {
      let response = await request(server).post("/auth/login").send({
        username: testAccountAdmin.username,
        password: testAccountAdmin.password,
      });

      let token = response.body.accessToken;

      response = await request(server)
        .get("/auth/get-list-poc-account")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      // console.log(response);
      expect(response.body.length).toBe(3);
    });
  });
};
