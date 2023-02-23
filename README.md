# computer-engineering-project

Đồ án thiết kế Kỹ thuật máy tính </br>
04/2022 </br>
Thiết kế hệ thống đọc thẻ thông minh, quản lý các chuỗi check-in ở các sự kiện công cộng. </br>

Issues

1. Không có chú thích mã nguồn

## SERVER SIDE

2. Khó biết thông tin sử dụng các hàm webapi
   Giải pháp: Cần sử dụng swagger
3. Không có bảo mật với https
   Giải pháp: Chuyển sang https với chứng chỉ số đã có sẵn ở thư mục /home/dev/cert/checkin.love/
   - Tạo file .env với 3 tham số
     ```shell
       SSL_CRT_FILE="/home/dev/cert/checkin.love/fullchain.pem"
       SSL_KEY_FILE="/home/dev/cert/chckin.love/private.pem"
       NODE_ENV=development
       PORT=90
     ```
   - Trong file server.js, thay thế đối tượng http, bằng đối tượng https và liên với với đối tượng app như sau
     ```javascript
     const fs = require("fs");
     const https = require("https");
     const httpsServer = https.createServer(
       {
         cert: fs.readFileSync(process.env.SSL_CRT_FILE),
         key: fs.readFileSync(process.env.SSL_KEY_FILE),
       },
       app
     );
     httpsServer.listen(process.env.PORT, () => {
       console.log(
         `Server running with SSL Cert on port https://xephang.online:${process.env.PORT}`
       );
     });
     ```
4. Một chỗ không yêu cầu xác thực khi truy cập web api. Ví dụ gõ http://checkin.love:27090/events-management
5. Thiếu xác thực tài khoản người dùng.
   Giải pháp: phải viết thêm code vào hàm validateToken() hay authPermission

### Hướng dẫn sử dụng

1. Mở thư mục con /server
2. Mở file .env và bổ sung/sửa sao cho kết quả như sau
   ```shell
   NODE_ENV=development01 #Lựa chọn connection string, với câu hình ở file /src/config/config.json
   PORT=90                #Cổng dịch vụ trên docker là 90, mapping ra ngoài internet là  27090.
   ```
3. Chạy lệnh
   ```shell
   ./reload.sh
   ```
   hoặc
   ```shell
   npm start
   ```
4. Lúc này, có thể truy cập vào server qua

- WebAPI: https://checkin.love:27090
- Tài liệu swagger: https://checkin.love:27090/api-docs (chưa có)

## CLIENT SIDE: httpS://checkin.love/

1. Ở giao diện quản trị, phải sử dụng template Admin MaterialUI
2. Vẫn đang kết nối tới webapi ở heroku. Giải pháp: cần trỏ về máy chủ mới. Và nên đưa domain ra 1 file cấu hình, chỉ để đường dẫn trong code thôi. Như vậy sẽ linh hoạt để thay đổi.
3. Không có bảo mật với https.
   Giải pháp dễ hơn phía server. Đã làm xong.
   - Tạo file .env với 2 tham số tương tự và thêm tham số PORT=443
   - thay thế script khởi động "react-scripts start" bằng script mới "HTTPS=true react-scripts start

### Hướng dẫn sử dụng

1. Mở thư mục con /client-fe
2. Cấu hình để sử dụng HTTPS. Mở file package.json và thêm một script khởi động như sau:

   ```shell
   "scripts": {
              "startSSL": "HTTPS=true react-scripts start",
   ```

   hoặc cách 2 là chạy lệnh:

   ```shell
   sed -i '/"react-scripts start",/a"startSSL":"HTTPS=true react-scripts start",' package.json
   ```

   '/^anothervalue=.\*/a after=me'

3. Chạy lệnh
   ```shell
   ./reload.sh
   ```
   hoặc
   ```shell
   npm start
   ```
4. Mở các file trong thư mục /client-fe/src/api và sửa lại các baseURL cho đúng với server webapi mới.
5. Lúc này, có thể truy cập vào web front-end qua URL https://checkin.love
