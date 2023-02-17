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

// describe("Kiểm thử chức năng thống kê", () => {
//   beforeAll(() => {
//     server = app.listen(10000); // Random number is needed to avoid using same port in different tests if you run in parallel
//   });

//   afterAll(() => {
//     server.close();
//   });
//   it("Thống kê số lượng sự kiện", async () => {
//     let response = await request(server).post("/auth/login").send({
//       username: testAccountAdmin.username,
//       password: testAccountAdmin.password,
//     });

//     let token = response.body.accessToken;

//     response = await request(server)
//       .get("/events-management/statistic/number-of-event")
//       .set("Authorization", `Bearer ${token}`);
//     expect(response.statusCode).toBe(200);
//     // console.log(response);
//     expect(response.body.numberOfEvent).toBe(4);
//   });

//   it("Thống kê số lượng tenant", async () => {
//     let response = await request(server).post("/auth/login").send({
//       username: testAccountAdmin.username,
//       password: testAccountAdmin.password,
//     });

//     let token = response.body.accessToken;

//     response = await request(server)
//       .get("/tenant/statistic/number-of-tenant")
//       .set("Authorization", `Bearer ${token}`);
//     expect(response.statusCode).toBe(200);
//     // console.log(response);
//     expect(response.body.numberOfTenant).toBe(2);
//   });

//   it("Thống kê số lượng cộng tác viên", async () => {
//     let response = await request(server).post("/auth/login").send({
//       username: testAccountAdmin.username,
//       password: testAccountAdmin.password,
//     });

//     let token = response.body.accessToken;

//     response = await request(server)
//       .get("/auth/statistic/number-of-poc-account")
//       .set("Authorization", `Bearer ${token}`);
//     expect(response.statusCode).toBe(200);
//     // console.log(response);
//     expect(response.body.numberOfPocAccounts).toBe(3);
//   });

//   it("Thống kê số lượng gian hàng POC theo sự kiện", async () => {
//     let response = await request(server).post("/auth/login").send({
//       username: testAccountAdmin.username,
//       password: testAccountAdmin.password,
//     });

//     let token = response.body.accessToken;

//     response = await request(server)
//       .post("/point-of-checkin/statistic/number-of-poc-event")
//       .send({ eventCode: "vA+uY" })
//       .set("Authorization", `Bearer ${token}`);
//     expect(response.statusCode).toBe(200);
//     // console.log(response);
//     expect(response.body.numberOfPoc).toBe(3);
//   });

//   it("Thống kê số lượng khách check-in", async () => {
//     let response = await request(server).post("/auth/login").send({
//       username: testAccountAdmin.username,
//       password: testAccountAdmin.password,
//     });

//     let token = response.body.accessToken;

//     response = await request(server)
//       .get("/guest/statistic/number-of-guest")
//       .set("Authorization", `Bearer ${token}`);
//     expect(response.statusCode).toBe(200);
//     // console.log(response);
//     expect(response.body.numberOfGuest).toBe(1);
//   });
// });

exports.testStatistic = (app, request) => {
  describe("Kiểm thử chức năng thống kê", () => {
    beforeAll(() => {
      server = app.listen(10000); // Random number is needed to avoid using same port in different tests if you run in parallel
    });

    afterAll(() => {
      server.close();
    });
    it("Thống kê số lượng sự kiện", async () => {
      let response = await request(server).post("/auth/login").send({
        username: testAccountAdmin.username,
        password: testAccountAdmin.password,
      });

      let token = response.body.accessToken;

      response = await request(server)
        .get("/events-management/statistic/number-of-event")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      // console.log(response);
      expect(response.body.numberOfEvent).toBe(4);
    });

    it("Thống kê số lượng tenant", async () => {
      let response = await request(server).post("/auth/login").send({
        username: testAccountAdmin.username,
        password: testAccountAdmin.password,
      });

      let token = response.body.accessToken;

      response = await request(server)
        .get("/tenant/statistic/number-of-tenant")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      // console.log(response);
      expect(response.body.numberOfTenant).toBe(2);
    });

    it("Thống kê số lượng cộng tác viên", async () => {
      let response = await request(server).post("/auth/login").send({
        username: testAccountAdmin.username,
        password: testAccountAdmin.password,
      });

      let token = response.body.accessToken;

      response = await request(server)
        .get("/auth/statistic/number-of-poc-account")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      // console.log(response);
      expect(response.body.numberOfPocAccounts).toBe(3);
    });

    it("Thống kê số lượng gian hàng POC theo sự kiện", async () => {
      let response = await request(server).post("/auth/login").send({
        username: testAccountAdmin.username,
        password: testAccountAdmin.password,
      });

      let token = response.body.accessToken;

      response = await request(server)
        .post("/point-of-checkin/statistic/number-of-poc-event")
        .send({ eventCode: "vA+uY" })
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      // console.log(response);
      expect(response.body.numberOfPoc).toBe(3);
    });

    it("Thống kê số lượng khách check-in", async () => {
      let response = await request(server).post("/auth/login").send({
        username: testAccountAdmin.username,
        password: testAccountAdmin.password,
      });

      let token = response.body.accessToken;

      response = await request(server)
        .get("/guest/statistic/number-of-guest")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      // console.log(response);
      expect(response.body.numberOfGuest).toBe(1);
    });
  });
};
