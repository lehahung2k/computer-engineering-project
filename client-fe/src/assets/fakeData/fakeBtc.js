const createBtc = (
  name,
  website,
  address,
  contactName,
  mail,
  number,
  username,
  password,
  tenantCode
) => {
  return {
    name,
    website,
    address,
    contactName,
    mail,
    number,
    contact: contactName + "-" + mail + "-" + number,
  };
};

export const ListBtc = [
  createBtc(
    "Trung tâm Công nghệ Thông tin VietinBank",
    "www.vietinbank.vn",
    "Số 187 Nguyễn Lương Bằng, Đống Đa, Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createBtc(
    "Trung tâm nghiên cứu và phát triển ĐTDĐ Samsung Việt Nam",
    "www.facebook.com/SamsungVietnamRnD",
    "Tòa nhà PVI, Số 1 Phạm Văn Bạch, Yên Hòa, Cầu Giấy, Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createBtc(
    "Công ty Cổ phần Quốc tế Đầu tư và Phát triển công nghệ Thành Công",
    "http://bssgroup.vn/",
    "Tầng 18 toà nhà Viwaseen, số 48 Tố Hữu, Nam Từ Liêm, Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createBtc(
    "CÔNG TY TNHH SUN ASTERISK VIỆT NAM",
    "https://sun-asterisk.vn/",
    "Tầng 13, Keangnam Hanoi Landmark Tower, khu E6 khu đô thị mớ - Phường Mễ Trì - Quận Nam Từ Liêm - Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createBtc(
    "Công ty Cổ phần FPT",
    "www.fpt.com.vn",
    "Tòa nhà FPT Cầu Giấy, Số 17, phố Duy Tân, phường Dịch Vọng Hậu, Cầu Giấy Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createBtc(
    "Trường Đại học Bách khoa Hà Nội",
    "https://www.hust.edu.vn/",
    "Số 1 Đại Cồ Việt, Hai Bà Trưng, Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createBtc(
    "Trường Đại học Kinh tế Quốc dân",
    "https://neu.edu.vn/",
    "207 Giải Phóng, Đồng Tâm, Quận Hai Bà Trưng, Hà Nội, Vietnam",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createBtc(
    "TRƯỜNG ĐẠI HỌC KHOA HỌC TỰ NHIÊN",
    "http://hus.vnu.edu.vn/",
    "334 Nguyễn Trãi - Thanh Xuân - Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createBtc(
    "Đại học Quốc gia Hà Nội",
    "https://www.vnu.edu.vn",
    "Khu đô thị ĐHQGHN tại Hoà Lạc, Thạch Thất, Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createBtc(
    "Trường Đại học Xây dựng Hà Nội",
    "https://huce.edu.vn/",
    "Số 55 đường Giải Phóng, Hai Bà Trưng, Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createBtc(
    "Đại học Thương mại",
    "https://tmu.edu.vn/",
    "79 Hồ Tùng Mậu, Cầu Giấy, Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createBtc(
    "Trường Đại học Công nghệ, Đại học Quốc Gia Hà Nội ",
    "https://uet.vnu.edu.vn/",
    "E3, 144 Xuân Thủy, Cầu Giấy, Hà Nội",
    "Nguyễn Văn A",
    "abc@mail.com",
    "0123456789"
  ),
  createBtc(
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
    id: "name",
    label: "Tên tổ chức",
    sort: true,
    width: "20%",
    link: "/admin/company/detail",
  },
  {
    id: "website",
    label: "Website",
    width: "15%",
    link: true,
    external: true,
  },
  {
    id: "address",
    label: "Địa chỉ",
    width: "25%",
  },
  {
    id: "contact",
    label: "Thông tin liên hệ",
    with: "40%",
  },
];
