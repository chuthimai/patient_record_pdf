import {
    formatVietnameseDate,
    renderAssessmentItemsHTML,
    htmlToPdf }
    from './utils.js';

// Xét nghiệm
const serviceName = "Khám chuyên khoa xương";
const severity = "Nhẹ";
const conclusion = "Bị gãy xương ngón út tay trái";

const assessmentItems = [
    {
        identifier: "1",
        name: "Khám xương chi trên",
        children: [
            {
                identifier: "1.1",
                name: "Vai",
                measurementItem: { unit: "Độ linh hoạt", minimum: 0, maximum: 180 },
                value: 175,
            },
            {
                identifier: "1.2",
                name: "Khuỷu tay",
                measurementItem: { unit: "Độ duỗi/gập", minimum: 0, maximum: 150 },
                value: 145,
            },
            {
                identifier: "1.3",
                name: "Cổ tay",
                measurementItem: { unit: "Độ gập/duỗi", minimum: 0, maximum: 90 },
                value: 85,
            },
            {
                identifier: "1.4",
                name: "Ngón tay",
                measurementItem: { unit: "Tình trạng", minimum: 0, maximum: 1 },
                value: "Bình thường",
            },
        ],
    },
    {
        identifier: "2",
        name: "Khám xương chi dưới",
        children: [
            {
                identifier: "2.1",
                name: "Hông",
                measurementItem: { unit: "Độ xoay", minimum: 0, maximum: 90 },
                value: 85,
            },
            {
                identifier: "2.2",
                name: "Gối",
                measurementItem: { unit: "Độ gập/duỗi", minimum: 0, maximum: 150 },
                value: 145,
            },
            {
                identifier: "2.3",
                name: "Cổ chân",
                measurementItem: { unit: "Độ xoay/gập", minimum: 0, maximum: 60 },
                value: 55,
            },
            {
                identifier: "2.4",
                name: "Bàn chân",
                measurementItem: { unit: "Tình trạng", minimum: 0, maximum: 1 },
                value: "Không biến dạng",
            },
        ],
    },
    {
        identifier: "3",
        name: "Cột sống",
        children: [
            {
                identifier: "3.1",
                name: "Cổ",
                measurementItem: { unit: "Độ xoay", minimum: 0, maximum: 80 },
                value: 75,
            },
            {
                identifier: "3.2",
                name: "Lưng",
                measurementItem: { unit: "Độ gập", minimum: 0, maximum: 60 },
                value: 55,
            },
            {
                identifier: "3.3",
                name: "Thắt lưng",
                measurementItem: { unit: "Độ gập/duỗi", minimum: 0, maximum: 70 },
                value: 65,
            },
            {
                identifier: "3.4",
                name: "Dấu hiệu đau khi ấn",
                measurementItem: { unit: "Tình trạng", minimum: 0, maximum: 1 },
                value: "Không đau",
            },
        ],
    },
    {
        identifier: "4",
        name: "Kết luận khám chuyên khoa xương khớp",
        children: [
            {
                identifier: "4.1",
                name: "Đánh giá tổng quát",
                measurementItem: { unit: "Mức độ tổn thương", minimum: 0, maximum: 10 },
                value: "Không phát hiện bất thường",
            },
        ],
    },
];


const data = {
    departmentOfHealth: "Hà Nội",
    hospital: "Bệnh viện A",
    recordNumber: 12345,
    typeOfService: "Khám chuyên khoa",
    patientName: 'Nguyễn Văn A',
    birthDate: new Date("2003-07-03").toLocaleDateString("vi-VN"),
    gender: 'Nữ',
    addressOfPatient: "1B, C, D",
    specialize: "Ngoại khoa",
    address: "Phòng 103, Tầng 1, toà B",
    conclusionOfClinicalDiagnosis: "Bình thường",
    request: `${serviceName}`,
    requestDate: formatVietnameseDate(new Date()),
    treatingDoctor: "Nguyen Van A",
    detailContent: renderAssessmentItemsHTML(assessmentItems),
    severity: severity,
    conclusion: conclusion,
    resultDate: formatVietnameseDate(new Date()),
    specialistDoctor: "Tran Thi B",
};

const template = '../html/specialist_report.ejs';
const output = '../pdf/specialist_report.pdf';

htmlToPdf(template,output, data);
