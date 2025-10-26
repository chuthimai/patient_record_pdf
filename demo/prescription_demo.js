import {
    formatVietnameseDateWithoutText,
    formatVietnameseDateWithText,
    getDoseFormName,
    htmlToPdf
}
    from './utils.js';

// Đơn thuốc
const prescribedMedications = [
    {
        identifier: "1",
        quantity: 20,
        dosageInstruction: "Uống tối 1 viên sau ăn",
        note: "Cetimed 10mg",
        medication: {
            identifier: 1,
            name: "Cetirizine 10mg",
            code: "SNOMEDCT:123456",
            doseForm: "385055001", // Viên nén (tablet)
        },
    },
    {
        identifier: "2",
        quantity: 40,
        dosageInstruction: "Uống ngày 2 lần sau chiều, mỗi lần 1 viên",
        note: "Vitamin A+B1+B2+B6+B12+C+E+B5+acid folic",
        medication: {
            identifier: 2,
            name: "Highvitamine 5.0mg + 25mg",
            code: "SNOMEDCT:234567",
            doseForm: "385055001", // Viên nén (tablet)
        },
    },
    {
        identifier: "3",
        quantity: 20,
        dosageInstruction: "Uống sáng 1 ống",
        note: "Dạng ống 10ml",
        medication: {
            identifier: 3,
            name: "Conipa pure (gluconat 10mg)",
            code: "SNOMEDCT:345678",
            doseForm: "385023001", // Dung dịch uống (oralSolution)
        },
    },
    {
        identifier: "4",
        quantity: 2,
        dosageInstruction:
            "Bôi chỗ ngứa ngày 2 lần sáng chiều, bôi mỗi lần 7-10 ngày",
        note: "Locgoda 0,1% (15g)",
        medication: {
            identifier: 4,
            name: "Mometason furoat 0.1%",
            code: "SNOMEDCT:456789",
            doseForm: "385108007", // Kem bôi (cream)
        },
    },
];



const data = {
    departmentOfHealth: "Hà Nội",
    hospital: "Bệnh viện A",
    identifier: 12345,  // mã đơn thuốc
    phoneNumber: "0987654321", // SĐT liên hệ của bệnh viện
    recordNumber: 12345,
    patientName: 'Nguyễn Văn A',
    birthDate: formatVietnameseDateWithoutText(new Date("2003-07-03")),
    gender: 'Nữ',
    addressOfPatient: "1B, C, D",
    finalDiagnosis: "Gãy xương ngón út tay trái",
    prescribedMedications: prescribedMedications.map(medication => {
        return {
            identifier: medication.identifier,
            quantity: medication.quantity,
            dosageInstruction: medication.dosageInstruction,
            note: medication.note,
            medication: {
                identifier: medication.medication.identifier,
                name: medication.medication.name,
                code: medication.medication.code,
                doseForm: getDoseFormName(medication.medication.doseForm),
            }
        }
    }),
    note: "- Đã tư vấn kỹ cho bệnh nhân về đơn thuốc và đơn tư vấn và bệnh nhân đồng ý sử dụng, khám lại sau 3 tuần.\n" +
        "- Nếu có dấu hiệu bất thường (phát ban, khó thở...), ngưng thuốc và liên hệ bệnh viện ngay",
    issueDate: formatVietnameseDateWithText(new Date()),
    doctorName: "Trần Thị B",
};

const template = '../html/prescription.ejs';
const output = '../pdf/prescription.pdf';

htmlToPdf(template,output, data);
