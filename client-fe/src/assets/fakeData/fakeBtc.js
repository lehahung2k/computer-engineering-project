const createBtc = (
  id,
  tenantName,
  website,
  tenantAddress,
  contactName,
  contactEmail,
  contactPhone,
  username,
  password,
  tenantCode
) => {
  return {
    id,
    tenantName,
    website,
    tenantAddress,
    contactName,
    contactEmail,
    contactPhone,
    username,
    password,
    tenantCode,
    contact: contactName + "-" + contactEmail + "-" + contactPhone,
  };
};

export const ListBtc = [
  createBtc(
    1,
    "Trung tâm Công nghệ Thông tin VietinBank",
    "www.vietinbank.vn",
    "Số 187 Nguyễn Lương Bằng, Đống Đa, Hà Nội",
    "Đinh Ðăng Minh",
    "dinhangminh899@mail.com",
    "085 043 6712",
    "vietinbank",
    "vietinbank",
    "LQA0"
  ),
  createBtc(
    2,
    "Trung tâm nghiên cứu và phát triển ĐTDĐ Samsung Việt Nam",
    "www.facebook.com/SamsungVietnamRnD",
    "Tòa nhà PVI, Số 1 Phạm Văn Bạch, Yên Hòa, Cầu Giấy, Hà Nội",
    "Nghiêm Hồng Thủy",
    "nghiemhongthuy535@mail.com",
    "092 076 1385",
    "samsung",
    "samsung",
    "OwaT"
  ),
  createBtc(
    3,
    "Công ty Cổ phần Quốc tế Đầu tư và Phát triển công nghệ Thành Công",
    "bssgroup.vn",
    "Tầng 18 toà nhà Viwaseen, số 48 Tố Hữu, Nam Từ Liêm, Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789",
    "bssgroup",
    "bssgroup",
    "3kCg"
  ),
  createBtc(
    4,
    "CÔNG TY TNHH SUN ASTERISK VIỆT NAM",
    "sun-asterisk.vn",
    "Tầng 13, Keangnam Hanoi Landmark Tower, khu E6 khu đô thị mớ - Phường Mễ Trì - Quận Nam Từ Liêm - Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789",
    "sun",
    "sun",
    "xIZa"
  ),
  createBtc(
    5,
    "Công ty Cổ phần FPT",
    "www.fpt.com.vn",
    "Tòa nhà FPT Cầu Giấy, Số 17, phố Duy Tân, phường Dịch Vọng Hậu, Cầu Giấy Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789",
    "fpt",
    "fpt",
    "ho2U"
  ),
  createBtc(
    6,
    "Trường Đại học Bách khoa Hà Nội",
    "www.hust.edu.vn",
    "Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789",
    "bachkhoa",
    "bachkhoa",
    "V0u0"
  ),
  createBtc(
    7,
    "Trường Đại học Kinh tế Quốc dân",
    "https://neu.edu.vn/",
    "207 Giải Phóng, Đồng Tâm, Quận Hai Bà Trưng, Hà Nội, Vietnam",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createBtc(
    8,
    "TRƯỜNG ĐẠI HỌC KHOA HỌC TỰ NHIÊN",
    "http://hus.vnu.edu.vn/",
    "334 Nguyễn Trãi - Thanh Xuân - Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createBtc(
    9,
    "Đại học Quốc gia Hà Nội",
    "https://www.vnu.edu.vn",
    "Khu đô thị ĐHQGHN tại Hoà Lạc, Thạch Thất, Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createBtc(
    10,
    "Trường Đại học Xây dựng Hà Nội",
    "https://huce.edu.vn/",
    "Số 55 đường Giải Phóng, Hai Bà Trưng, Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createBtc(
    11,
    "Đại học Thương mại",
    "https://tmu.edu.vn/",
    "79 Hồ Tùng Mậu, Cầu Giấy, Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createBtc(
    12,
    "Trường Đại học Công nghệ, Đại học Quốc Gia Hà Nội ",
    "https://uet.vnu.edu.vn/",
    "E3, 144 Xuân Thủy, Cầu Giấy, Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createBtc(
    13,
    "Trường Đại học Hà Nội",
    "https://www.hanu.vn/",
    "Km 9, đường Nguyễn Trãi, quận Nam Từ Liêm, Hà Nội, Việt Nam.",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
];

export const listBtcHeadNormal = [
  {
    id: "tenantName",
    label: "Tên tổ chức",
    sort: true,
    width: "20%",
    link: "/admin/tenant/detail",
  },
  {
    id: "website",
    label: "Website",
    width: "15%",
    link: true,
    external: true,
  },
  {
    id: "tenantAddress",
    label: "Địa chỉ",
    width: "25%",
  },
  {
    id: "contact",
    label: "Thông tin liên hệ",
    with: "40%",
  },
];
