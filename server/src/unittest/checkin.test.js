const request = require("supertest");
const app = require("../server");

const testCheckin = {
  guestCode: "123456",
  guestDescription: "Test guest",
  checkinImg1: "",
  checkinImg2: "",
  identityType: "Khác",
  createTime: "2022-12-12T09:30:00",
  enable: true,
  pointCode: "NU0A",
};

const testAccountPoc = {
  username: "nghiemhongthuy535",
  password: "nghiemhongthuy535",
};
let server;
describe("Kiểm thử chức năng thêm mới checkin", () => {
  beforeAll(() => {
    server = app.listen(10002); // Random number is needed to avoid using same port in different tests if you run in parallel
  });

  afterAll(() => {
    server.close();
  });
  it("Thêm mới thông tin checkin chỉ với mã định danh", async () => {
    let response = await request(server).post("/auth/login").send({
      username: testAccountPoc.username,
      password: testAccountPoc.password,
    });

    let token = response.body.accessToken;
    console.log(token);
    response = await request(server)
      .post("/transaction/add-transaction")
      .send({
        guestCode: testCheckin.guestCode,
        pointCode: testCheckin.pointCode,
        enable: true,
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.guestCode).toBe(testCheckin.guestCode);
  });

  it("Thêm mới thông tin checkin đầy đủ thông tin mô tả", async () => {
    let response = await request(server).post("/auth/login").send({
      username: testAccountPoc.username,
      password: testAccountPoc.password,
    });

    let token = response.body.accessToken;
    console.log(token);
    response = await request(server)
      .post("/transaction/add-transaction")
      .send(testCheckin)
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.guestCode).toBe(testCheckin.guestCode);
  });
});
