import {
    formatVietnameseDate,
    renderAssessmentItemsHTML,
    htmlToPdf }
    from './utils.js';

const serviceName = "Khám bệnh vào viện";

const assessmentItems = [
    {
        name: "I. Toàn thân",
        children: [
            { name: "Mạch", value: "80 lần/phút" },
            { name: "Nhiệt độ", value: "37°C" },
            { name: "Huyết áp", value: "120/80 mmHg" },
            { name: "Thể trạng chung", value: "Tỉnh táo, tiếp xúc tốt" },
            { name: "Dấu hiệu sinh tồn khác", value: "Bình thường" },
        ],
    },
    {
        name: "II. Các bộ phận",
        children: [
            { name: "Đầu, mặt, cổ", value: "Không tổn thương, không sưng nề" },
            { name: "Ngực", value: "Lồng ngực cân đối, nghe phổi rõ" },
            { name: "Tim mạch", value: "Nhịp đều, không có tiếng thổi" },
            { name: "Bụng", value: "Mềm, không chướng, không đau" },
            { name: "Chi", value: "Cử động bình thường" },
            { name: "Thần kinh", value: "Tỉnh táo, phản xạ bình thường" },
        ],
    },
    {
        name: "III. Tóm tắt kết quả lâm sàng",
        children: [
            {
                name: "Nhận xét chung",
                value:
                    "Bệnh nhân tỉnh táo, mạch và huyết áp ổn định, các cơ quan không phát hiện bất thường rõ.",
            },
        ],
    },
    {
        name: "IV. Chẩn đoán vào viện",
        children: [
            { name: "Chẩn đoán ban đầu", value: "Viêm phổi cộng đồng mức độ nhẹ" },
        ],
    },
    {
        name: "V. Đã xử lý (thuốc, chăm sóc...)",
        children: [
            { name: "Thuốc", value: "Ceftriaxone 1g x 2 lần/ngày" },
            { name: "Chăm sóc", value: "Theo dõi mạch, nhiệt độ, huyết áp mỗi 4h" },
        ],
    },
    {
        name: "VI. Cho vào điều trị tại khoa",
        children: [
            { name: "Khoa tiếp nhận", value: "Khoa Nội tổng hợp" },
            { name: "Tình trạng khi nhập khoa", value: "Ổn định" },
        ],
    },
    {
        name: "VII. Chú ý",
        children: [
            { name: "Ghi chú", value: "Theo dõi sát nhiệt độ và dấu hiệu hô hấp" },
        ],
    },
];


const data = {
    departmentOfHealth: "Hà Nội",
    hospital: "Bệnh viện A",
    recordNumber: 12345,
    typeOfService: serviceName,
    patientName: 'Nguyễn Văn A',
    birthDate: new Date("2003-07-03").toLocaleDateString("vi-VN"),
    gender: 'Nữ',
    addressOfPatient: "1B, C, D",
    specialize: "Ngoại khoa",
    address: "Phòng 103, Tầng 1, toà B",
    conclusionOfClinicalDiagnosis: "Gãy xương tay",
    request: `${serviceName}`,
    requestDate: formatVietnameseDate(new Date()),
    treatingDoctor: "Nguyen Van A",
    detailContent: renderAssessmentItemsHTML(assessmentItems),
    resultDate: formatVietnameseDate(new Date()),
    specialistDoctor: "Tran Thi B",
};

const template = '../html/initial_diagnosis.ejs';
const output = '../pdf/initial_diagnosis.pdf';

htmlToPdf(template, output, data);
