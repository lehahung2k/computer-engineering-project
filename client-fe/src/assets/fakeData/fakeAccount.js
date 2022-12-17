function createPocAccount(
  username,
  password,
  name,
  tenantCode,
  companyName,
  phoneNumber,
  active,
  role
) {
  return {
    username,
    password,
    name,
    tenantCode,
    companyName,
    phoneNumber,
    active,
    role,
  };
}

export const ListPocAccount = [
  createPocAccount(
    "dinhangminh899",
    "To7P-WYL^]Dd",
    "Đinh Ðăng Minh",
    "bkah",
    "Công ty TNHH Shinjo Việt Nam",
    "085 043 6712",
    0,
    0
  ),
  createPocAccount(
    "nghiemhongthuy535",
    "PWL4~p-0ul[i",
    "Nghiêm Hồng Thủy",
    "bkah",
    "CÔNG TY TNHH CÔNG NGHIỆP NHỰA PIONEER",
    "092 076 1385",
    0,
    0
  ),
  createPocAccount(
    "hangbichquan635",
    "%C9(*b]0w#KN",
    "Hàng Bích Quân",
    "bkah",

    "Công ty TNHH Kyocera Việt Nam",
    "088 830 5641",
    0,
    0
  ),
  createPocAccount(
    "thachngochan458",
    "(@[wBNFOispq",
    "Thanh Ngọc Hân",
    "bkah",

    "Công ty Hirakawa Việt Nam",
    "085 549 8216",
    0,
    0
  ),
  createPocAccount(
    "haduckien942",
    "$wl~|5[eRo2D",
    "Hà Đức Kiên",
    "bkah",

    "CÔNG TY TNHH POLYMERIC PRODUCTS VGH (VIỆT NAM)",
    "034 017 2368",
    0,
    0
  ),
  createPocAccount(
    "hxuantrang322",
    "I$1uWpdrZ9qR",
    "Hồ Xuân Trang",
    "bkah",

    "CÔNG TY KIM THÀNH VIỆT NAM",
    "099 852 4137",
    0,
    0
  ),
  createPocAccount(
    "lathyoanh123",
    "QC5MO^Lh3uA|",
    "Lã Thy Oanh",
    "bkah",

    " Công ty TNHH Ochiai Việt Nam",
    "035 356 1978",
    0,
    0
  ),

  createPocAccount(
    "kieuyenthanh443",
    "86f{HDC#z0u|",
    "Kiều Yến Thanh",
    "bkah",

    "AJ TOTAL CO ., LTD/AJ TOTAL HÀ NỘI – DỰ ÁN KHO LẠNH",
    "086 862 7951",
    0,
    0
  ),

  createPocAccount(
    "manlinhduyen367",
    "c{xG|]3EvW%1",
    "Mẫn Linh Duyên",
    "bkah",

    "Công ty TNHH Toto Việt Nam- Chi nhánh Hưng Yên/Nhà máy Toto Việt Nam thứ II",
    "070 956 3204",
    0,
    0
  ),

  createPocAccount(
    "manhtuyetanh885",
    "~br!V%t)uUxz",
    "Mạnh Tuyết Anh",
    "bkah",

    "Công ty TNHH dệt nhuộm Jasan (Việt Nam)/ NHÀ MÁY DỆT NHUỘM JASAN VIỆT NAM",
    "083 371 2465",
    0,
    0
  ),

  createPocAccount(
    "quangminhtuyet998",
    "Bp*SLG0XbHPJ",
    "Quang Minh Tuyết",
    "bkah",

    "CRYSTAL-OPTECH JAPAN CO., LTD/ NHÀ MÁY CRYSTAL-OPTECH",
    "056 812 5967",
    0,
    0
  ),

  createPocAccount(
    "lieutamnhu516",
    "O-63ny*DV)j%",
    "Liễu Tâm Như",
    "bkah",

    "Công ty TNHH Solder Coat Việt Nam",
    "083 419 8275",
    0,
    0
  ),

  createPocAccount(
    "loquochien264",
    "|nTtW4S}fJj8",
    "Lô Quốc Hiền",
    "bkah",

    "PIONEER ELASTIC INTERNATIONAL HOLDINGS LIMITED/ DỰ ÁN PIONEER ELASTIC VIỆT NAM",
    "084 937 1865",
    0,
    0
  ),

  createPocAccount(
    "vihoangcuc964",
    "(~{9#VW[EFA7",
    "Vi Hoàng Cúc",
    "bkah",

    "Công ty TNHH Fancy Creation Việt Nam/Nhà máy Fancy Creation Việt Nam",
    "058 816 7524",
    0,
    0
  ),

  createPocAccount(
    "dinhyenmy89",
    "4H5Nq3psO$~b",
    "Đinh Yến My",
    "bkah",

    " Công ty TNHH Ochiai Việt Nam",
    "033 824 3710",
    0,
    0
  ),

  createPocAccount(
    "dongankhang164",
    "ntyZElHWh!4I",
    "Đổng An Khang",
    "bkah",

    "Công ty TNHH Dệt may Lee Hing Việt Nam / DỰ ÁN LEE HING TEXTILE VIỆT NAM",
    "078 054 1297",
    0,
    0
  ),

  createPocAccount(
    "giaotonle750",
    "68J[TGUd25t{",
    "Giao Tôn Lễ",
    "bkah",

    "Công ty TNHH Nikkiso Việt Nam/ Công ty TNHH Nikkiso Việt Nam/Dự án sản xuất các bộ phận cho cánh máy bay thương mại.",
    "094 165 9078",
    0,
    0
  ),
];

export const ListPocAccountHeadNormal = [
  {
    id: "fullName",
    label: "Họ và tên",
    sort: true,
    width: "20%",
  },
  {
    id: "username",
    label: "Tên đăng nhập",
    sort: true,
    width: "20%",
  },
  {
    id: "tenantName",
    label: "Ban tổ chức",
    sort: true,
    width: "30%",
  },
  {
    id: "phoneNumber",
    label: "Số điện thoại",
    sort: false,
    with: "15%",
  },
  {
    id: "active",
    label: "Trạng thái",
    sort: false,
    width: "15%",
    button: true,
    active: true,
  },
];
