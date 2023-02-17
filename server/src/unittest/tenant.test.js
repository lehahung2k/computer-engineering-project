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

const testTenantInfo = {
  tenantCode: "abcd",
  tenantName: "test",
  tenantAddress: "123445566",
  website: "abc",
  contactName: "test",
  contactPhone: "test",
  contactEmail: "test",
};

let server;
let tenantId;

// describe("Kiểm thử chức năng thêm mới tenant", () => {
//   beforeAll(() => {
//     server = app.listen(10000); // Random number is needed to avoid using same port in different tests if you run in parallel
//   });

//   afterAll(() => {
//     server.close();
//   });
//   it("Thêm mới tenant thành công", async () => {
//     let response = await request(server).post("/auth/login").send({
//       username: testAccountAdmin.username,
//       password: testAccountAdmin.password,
//     });

//     let token = response.body.accessToken;

//     response = await request(server)
//       .post("/tenant/add-tenant")
//       .send(testTenantInfo)
//       .set("Authorization", `Bearer ${token}`);
//     expect(response.statusCode).toBe(200);
//     // console.log(response);
//     expect(response.body.tenantCode).toBe(testTenantInfo.tenantCode);
//     tenantId = response.body.tenantId;
//   });

//   it("Phản hồi khi thêm mới tenant mà chưa đăng nhập (không có token)", async () => {
//     let response = await request(server).post("/tenant/add-tenant").send({});
//     expect(response.statusCode).toBe(200);
//     expect(response.body.error).toBe("You must login");
//   });

//   it("Phản hồi khi thông tin tạo mới tenant bị thiếu", async () => {
//     let response = await request(server).post("/auth/login").send({
//       username: testAccountAdmin.username,
//       password: testAccountAdmin.password,
//     });

//     let token = response.body.accessToken;

//     response = await request(server)
//       .post("/events-management/add-event")
//       .send({})
//       .set("Authorization", `Bearer ${token}`);
//     expect(response.statusCode).toBe(400);
//   });
// });

// describe("Kiểm thử chức năng xem chi tiết và sửa thông tin tenant", () => {
//   beforeAll(() => {
//     server = app.listen(10000); // Random number is needed to avoid using same port in different tests if you run in parallel
//   });

//   afterAll(() => {
//     server.close();
//   });
//   it("Xem thông tin chi tiết của tenant", async () => {
//     let response = await request(server).post("/auth/login").send({
//       username: testAccountTenant.username,
//       password: testAccountTenant.password,
//     });

//     let token = response.body.accessToken;

//     response = await request(server)
//       .get("/tenant/get-tenant-info")
//       .set("Authorization", `Bearer ${token}`);
//     expect(response.statusCode).toBe(200);
//     // console.log(response);
//     expect(response.body.tenantCode).toBe("PD++");
//   });

//   it("Sửa thông tin của tenant", async () => {
//     let response = await request(server).post("/auth/login").send({
//       username: testAccountAdmin.username,
//       password: testAccountAdmin.password,
//     });

//     let token = response.body.accessToken;
//     let newAddress = "abc";
//     response = await request(server)
//       .put("/tenant/update-tenant")
//       .send({ ...testTenantInfo, tenantAddress: newAddress, id: tenantId })
//       .set("Authorization", `Bearer ${token}`);
//     expect(response.statusCode).toBe(200);
//     // console.log(response.body);
//     expect(response.body.tenantAddress).toBe(newAddress);
//   });
// });

exports.testTenant = (app, request) => {
  describe("Kiểm thử chức năng thêm mới tenant", () => {
    beforeAll(() => {
      server = app.listen(10000); // Random number is needed to avoid using same port in different tests if you run in parallel
    });

    afterAll(() => {
      server.close();
    });
    it("Thêm mới tenant thành công", async () => {
      let response = await request(server).post("/auth/login").send({
        username: testAccountAdmin.username,
        password: testAccountAdmin.password,
      });

      let token = response.body.accessToken;

      response = await request(server)
        .post("/tenant/add-tenant")
        .send(testTenantInfo)
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      // console.log(response);
      expect(response.body.tenantCode).toBe(testTenantInfo.tenantCode);
      tenantId = response.body.tenantId;
    });

    it("Phản hồi khi thêm mới tenant mà chưa đăng nhập (không có token)", async () => {
      let response = await request(server).post("/tenant/add-tenant").send({});
      expect(response.statusCode).toBe(200);
      expect(response.body.error).toBe("You must login");
    });

    it("Phản hồi khi thông tin tạo mới tenant bị thiếu", async () => {
      let response = await request(server).post("/auth/login").send({
        username: testAccountAdmin.username,
        password: testAccountAdmin.password,
      });

      let token = response.body.accessToken;

      response = await request(server)
        .post("/events-management/add-event")
        .send({})
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(400);
    });
  });

  describe("Kiểm thử chức năng xem chi tiết và sửa thông tin tenant", () => {
    beforeAll(() => {
      server = app.listen(10000); // Random number is needed to avoid using same port in different tests if you run in parallel
    });

    afterAll(() => {
      server.close();
    });
    it("Xem thông tin chi tiết của tenant", async () => {
      let response = await request(server).post("/auth/login").send({
        username: testAccountTenant.username,
        password: testAccountTenant.password,
      });

      let token = response.body.accessToken;

      response = await request(server)
        .get("/tenant/get-tenant-info")
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      // console.log(response);
      expect(response.body.tenantCode).toBe("PD++");
    });

    it("Sửa thông tin của tenant", async () => {
      let response = await request(server).post("/auth/login").send({
        username: testAccountAdmin.username,
        password: testAccountAdmin.password,
      });

      let token = response.body.accessToken;
      let newAddress = "abc";
      response = await request(server)
        .put("/tenant/update-tenant")
        .send({ ...testTenantInfo, tenantAddress: newAddress, id: tenantId })
        .set("Authorization", `Bearer ${token}`);
      expect(response.statusCode).toBe(200);
      // console.log(response.body);
      expect(response.body.tenantAddress).toBe(newAddress);
    });
  });
};
