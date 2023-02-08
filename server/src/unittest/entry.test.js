const request = require("supertest");
const app = require("../server");
const testUserNew01 = {
  username: "hieuvd01",
  password: "hieuvd01",
  tenantCode: "PD++",
  role: "poc",
  active: true,
  fullName: "",
  companyName: "",
  email: "",
  phoneNumber: "",
};

const testUserNew02 = {
  username: "hieuvd02",
  password: "hieuvd02",
  tenantCode: "PD++",
  role: "poc",
  active: true,
  fullName: "",
  companyName: "",
  email: "",
  phoneNumber: "",
};

const testUserExisted = {
  username: "test",
  password: "test",
  tenantCode: "PD++",
};

const testWrongUser = {
  username: "testWrong",
  password: "testWrong",
};
let server;
describe("Kiểm thử đăng nhập đăng ký", () => {
  beforeAll(() => {
    server = app.listen(10002); // Random number is needed to avoid using same port in different tests if you run in parallel
  });

  afterAll(() => {
    server.close();
  });
  it("Đăng ký thành công với tài khoản mới", async () => {
    const response = await request(server).post("/auth").send({
      username: testUserNew01.username,
      password: testUserNew01.password,
      tenantCode: testUserNew01.tenantCode,
      role: testUserNew01.role,
      active: testUserNew01.active,
      companyName: testUserNew01.companyName,
      fullName: testUserNew01.fullName,
      email: testUserNew01.email,
      phoneNumber: testUserNew01.phoneNumber,
    });
    expect(response.statusCode).toBe(200);

    expect(response.body.result).toBe("SUCCESS");
  });

  it("Phản hồi khi tài khoản đăng ký đã có", async () => {
    const response = await request(server).post("/auth").send({
      username: testUserNew01.username,
      password: testUserNew01.password,
      tenantCode: testUserNew01.tenantCode,
      role: testUserNew01.role,
      active: testUserNew01.active,
      companyName: testUserNew01.companyName,
      fullName: testUserNew01.fullName,
      email: testUserNew01.email,
      phoneNumber: testUserNew01.phoneNumber,
    });
    expect(response.statusCode).toBe(200);

    expect(response.body.error).toBe("Error: Username is existed!");
  });

  it("Phản hồi khi thông tin đăng ký bị thiếu", async () => {
    const response = await request(server).post("/auth").send({
      username: testUserNew02.username,
      password: testUserNew02.password,
      tenantCode: testUserNew02.tenantCode,
    });
    expect(response.statusCode).toBe(400);
  });

  it("Đăng nhập thành công", async () => {
    const response = await request(server).post("/auth/login").send({
      username: testUserExisted.username,
      password: testUserExisted.password,
    });

    expect(response.status).toBe(200);
    expect(response.body.userRole).toBe("tenant");
  });

  it("Phản hồi khi đăng nhập sai tài khoản", async () => {
    let response = await request(server).post("/auth/login").send({
      username: testWrongUser.username,
      password: testWrongUser.password,
    });

    expect(response.status).toBe(200);
    expect(response.body.error).toBe("User not found!");

    response = await request(server).post("/auth/login").send({
      username: testUserExisted.username,
      password: testWrongUser.password,
    });

    expect(response.status).toBe(200);
    expect(response.body.error).toBe("Wrong username or password");
  });
});
