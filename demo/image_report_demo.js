import {
    formatVietnameseDate,
    renderAssessmentItemsHTML,
    htmlToPdf }
    from './utils.js';

// Chụp chiếu
const serviceName = "Chụp X-Quang tay";
const focus = "2 bàn tay";
const interpretation = "Gãy ngón út";

const assessmentItems = [
    {
        name: "Tay trái",
        children: [
            {
                name: "Ngón cái",
                value: "Bình thường"
            },
            {
                name: "Ngón trỏ",
                value: "Bình thường"
            },
            {
                name: "Ngón giữa",
                value: "Bình thường"
            },
            {
                name: "Ngón áp út",
                value: "Bình thường"
            },
            {
                name: "Ngón út",
                value: "Bị gãy xương đốt thứ nhất"
            },
        ]
    },
    {
        name: "Tay phải",
        children: [
            {
                name: "Ngón cái",
                value: "Bình thường"
            },
            {
                name: "Ngón trỏ",
                value: "Bình thường"
            },
            {
                name: "Ngón giữa",
                value: "Bình thường"
            },
            {
                name: "Ngón áp út",
                value: "Bình thường"
            },
            {
                name: "Ngón út",
                value: "Bình thường"
            },
        ]
    }
]

const data = {
    departmentOfHealth: "Hà Nội",
    hospital: "Bệnh viện A",
    recordNumber: 12345,
    typeOfService: "Chụp/chiếu X-Quang",
    patientName: 'Nguyễn Văn A',
    birthDate: new Date("2003-07-03").toLocaleDateString("vi-VN"),
    gender: 'Nữ',
    addressOfPatient: "1B, C, D",
    specialize: "Ngoại khoa",
    address: "Phòng 103, Tầng 1, toà B",
    conclusionOfClinicalDiagnosis: "Gãy xương tay",
    request: `${serviceName}, nội dung ảnh tập trung vào ${focus}`,
    requestDate: formatVietnameseDate(new Date()),
    treatingDoctor: "Nguyen Van A",
    media: [
        "data:image/jpeg;base64,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",
        "data:image/jpeg;base64,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",

    ],
    detailContent: renderAssessmentItemsHTML(assessmentItems),
    interpretation: interpretation,
    resultDate: formatVietnameseDate(new Date()),
    specialistDoctor: "Tran Thi B",
};

const template = '../html/image_report.ejs';
const output = '../pdf/image_report.pdf';

htmlToPdf(template, output, data);
