import {
    formatVietnameseDate,
    renderAssessmentItemsHTML,
    htmlToPdf }
    from './utils.js';

// Xét nghiệm
const serviceName = "Xét nghiệm huyết học";
const interpretation = "Bình thường";
const assessmentItems = [
    {
        identifier: "1",
        name: "Xét nghiệm máu",
        children: [
            {
                identifier: "1.1",
                name: "Huyết sắc tố",
                measurementItem: { unit: "g/dL", minimum: 13.5, maximum: 17.5 },
                value: 14.2
            },
            {
                identifier: "1.2",
                name: "Hồng cầu",
                measurementItem: { unit: "10^6/uL", minimum: 4.5, maximum: 5.9 },
                value: 5.1
            }
        ]
    }
];

const data = {
    departmentOfHealth: "Hà Nội",
    hospital: "Bệnh viện A",
    recordNumber: 12345,
    typeOfService: "Xét nghiệm huyết học",
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
    interpretation: interpretation,
    resultDate: formatVietnameseDate(new Date()),
    specialistDoctor: "Tran Thi B",
};

const template = '../html/lab_report.ejs';
const output = '../pdf/lab_report.pdf';

htmlToPdf(template,output, data);
