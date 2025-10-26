import * as puppeteer from 'puppeteer';
import ejs from 'ejs';

// Ghi chú quan trọng:
//
// <%= var %> → In ra giá trị (đã escape) an toàn.
// <%- var %> → In ra HTML thô (dùng khi bạn muốn render HTML sẵn có, ví dụ biểu đồ).
// <% ... %> → Viết code JS như if, for, switch, v.v.

export function formatVietnameseDateWithText(dateInput) {
    // Nếu đầu vào là string thì chuyển sang đối tượng Date
    const date = new Date(dateInput);

    // Lấy ngày, tháng, năm
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `Ngày ${day} tháng ${month} năm ${year}`;
}

export function formatVietnameseDateWithoutText(dateInput) {
    // Nếu đầu vào là string thì chuyển sang đối tượng Date
    const date = new Date(dateInput);

    // Lấy ngày, tháng, năm
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
}

export  function formatVietnameseFullDateTime(dateInput) {
    // Nếu đầu vào là string thì chuyển sang đối tượng Date
    const date = new Date(dateInput);

    // Lấy ngày, tháng, năm
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0'); // tháng bắt đầu từ 0
    const year = date.getFullYear();
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    return `${hour} giờ ${minute} phút, ngày ${day} tháng ${month} năm ${year}`
}

export function renderAssessmentItemsHTML(items, level = 0) {
    let html = "";

    for (const item of items) {
        const children = item.children ?? [];
        const hasChildren = children.length > 0;

        const indicatorChildren = children.filter(c => !!c.measurementItem);
        const textChildren = children.filter(c => !c.measurementItem);

        if (hasChildren) {
            html += `<div style="margin-bottom:8px;">
        <div style="font-weight:600; margin-top:${level === 0 ? '10px' : '5px'};">${item.name}</div>
      `;
            if (textChildren.length > 0) {
                html += `<div style="border-left:1px solid #ddd; padding-left:8px;">
          ${renderAssessmentItemsHTML(textChildren, level + 1)}
        </div>`;
            }

            if (indicatorChildren.length > 0) {
                html += `
          <table style="width:100%; border-collapse:collapse; margin-top:6px; text-align: center">
            <thead style="background:#f5f5f5;">
              <tr>
                <th style="border:1px solid #ccc; padding:4px;">Chỉ số xét nghiệm</th>
                <th style="border:1px solid #ccc; padding:4px;">Kết quả</th>
                <th style="border:1px solid #ccc; padding:4px;">Chỉ số bình thường</th>
                <th style="border:1px solid #ccc; padding:4px;">Đơn vị</th>
              </tr>
            </thead>
            <tbody>
              ${indicatorChildren.map(child => `
                <tr>
                  <td style="border:1px solid #ccc; padding:4px;">${child.name}</td>
                  <td style="border:1px solid #ccc; padding:4px;">${child.value ?? "-"}</td>
                  <td style="border:1px solid #ccc; padding:4px;">
                    ${child.measurementItem ? `${child.measurementItem.minimum} - ${child.measurementItem.maximum}` : "-"}
                  </td>
                  <td style="border:1px solid #ccc; padding:4px;">${child.measurementItem?.unit ?? "-"}</td>
                </tr>
              `).join("")}
            </tbody>
          </table>
        `;
            }

            html += `</div>`;
        } else {
            // Không có children => text
            html += `
        <div style="margin-bottom:4px;">
          <strong>${item.name}:</strong> ${item.value ?? ""}
        </div>
      `;
        }
    }

    return html;
}

// Map SNOMED code → tiếng Việt
const SNOMEDCTFormCodes = {
    "385055001": "Viên nén",
    "66076007": "Viên nhai",
    "385057009": "Viên nang",
    "385023001": "Dung dịch uống",
    "385024007": "Hỗn dịch uống",
    "385018001": "Giọt uống",
    "385219001": "Dung dịch tiêm",
    "385108007": "Kem bôi",
    "385100003": "Thuốc mỡ",
    "385133007": "Bột hít"
};

/**
 * Trả về tên tiếng Việt cho SNOMED code
 * @param {string} code
 */
export function getDoseFormName(code) {
    return SNOMEDCTFormCodes[code] || "Không xác định";
}


export async function htmlToPdf(templatePath, pdfPath, data) {
    // 1. Render HTML từ EJS template
    const html = await ejs.renderFile(templatePath, data);
    // 2. Mở Puppeteer
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.setContent(html, { waitUntil: 'networkidle0' });
    // 3. Xuất PDF
    await page.pdf({
        path: pdfPath,
        format: 'A4',
        printBackground: true,
        margin: { top: '15mm', bottom: '15mm', left: '10mm', right: '10mm' }
    });

    await browser.close();
    console.log("✅ PDF created:", pdfPath);
}

