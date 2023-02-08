const request = require("supertest");
const app = require("../server");

const testEventNew = {
  tenantCode: "6P7i",
  eventName: "Ngày hội việc làm JobFair 2022",
  eventCode: "6j8U",
  endTime: "2022-12-12T09:30:00",
  startTime: "2022-12-12T09:00:00",
  eventDescription: "Ngày hội việc làm 2022, sự kiện toàn trường",
  eventImg: "",
  enable: true,
};

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

describe("Kiểm thử chức năng thêm mới sự kiện", () => {
  beforeAll(() => {
    server = app.listen(10000); // Random number is needed to avoid using same port in different tests if you run in parallel
  });

  afterAll(() => {
    server.close();
  });
  it("Thêm mới sự kiện thành công", async () => {
    let response = await request(server).post("/auth/login").send({
      username: testAccountTenant.username,
      password: testAccountTenant.password,
    });

    let token = response.body.accessToken;

    response = await request(server)
      .post("/events-management/add-event")
      .send({
        eventCode: testEventNew.eventCode,
        eventName: testEventNew.eventName,
        tenantCode: testEventNew.tenantCode,
        eventDescription: testEventNew.eventDescription,
        startTime: testEventNew.startTime,
        endTime: testEventNew.endTime,
        eventImg: testEventNew.eventImg,
        enable: testEventNew.enable,
      })
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(200);
    // console.log(response);
    expect(response.body.eventCode).toBe(testEventNew.eventCode);
  });

  it("Phản hồi khi thêm mới sự kiện mà chưa đăng nhập (không có token)", async () => {
    let response = await request(server)
      .post("/events-management/add-event")
      .send({});
    expect(response.statusCode).toBe(200);
    expect(response.body.error).toBe("You must login");
  });

  it("Phản hồi khi thông tin tạo mới sự kiện bị thiếu", async () => {
    let response = await request(server).post("/auth/login").send({
      username: testAccountTenant.username,
      password: testAccountTenant.password,
    });

    let token = response.body.accessToken;

    response = await request(server)
      .post("/events-management/add-event")
      .send({})
      .set("Authorization", `Bearer ${token}`);
    expect(response.statusCode).toBe(400);
  });
});

describe("Kiểm thử chức năng xem thông tin sự kiện", () => {
  beforeAll(() => {
    server = app.listen(10001); // Random number is needed to avoid using same port in different tests if you run in parallel
  });

  afterAll(() => {
    server.close();
  });
  it("Chỉ trả về danh sách sự kiện mà ban tổ chức đã tạo nếu quyền người dùng là ban tổ chức", async () => {
    let response = await request(server).post("/auth/login").send({
      username: testAccountTenant.username,
      password: testAccountTenant.password,
    });

    let token = response.body.accessToken;

    response = await request(server)
      .get("/events-management/get-list-event")
      .send({})
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(3);
  });

  it("Trả về danh sách tất cả sự kiện nếu quyền người dùng là quản trị viên", async () => {
    let response = await request(server).post("/auth/login").send({
      username: testAccountAdmin.username,
      password: testAccountAdmin.password,
    });

    let token = response.body.accessToken;

    response = await request(server)
      .get("/events-management/get-list-event")
      .send({})
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(4);
  });

  it("Trả về danh sách sự kiện mà gian hàng Poc tham gia nếu người dùng là phụ trách poc", async () => {
    let response = await request(server).post("/auth/login").send({
      username: testAccountPoc.username,
      password: testAccountPoc.password,
    });

    let token = response.body.accessToken;
    console.log(token);
    response = await request(server)
      .get("/events-management/get-list-event")
      .send({})
      .set("Authorization", `Bearer ${token}`);

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(1);
  });
});
