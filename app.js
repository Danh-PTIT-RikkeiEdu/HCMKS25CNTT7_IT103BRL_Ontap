let bookings = [
    {
        bookingCode: "CIN-001", customerName: "Nguyễn Văn An",
        movieTitle: "Anh Trăng Cuối Phố", ticketCount: 2,
        pricePerTicket: 90000, totalAmount: 194400
    },
    {
        bookingCode: "CIN-002", customerName: "Trần Thị Bình",
        movieTitle: "Biệt Đội Sao Bang", ticketCount: 4,
        pricePerTicket: 90000, totalAmount: 349920
    },
    {
        bookingCode: "CIN-003", customerName: "Le Minh Châu",
        movieTitle: "Mua He Ruc Lua", ticketCount: 6,
        pricePerTicket: 110000, totalAmount: 641520
    }
];


const line = "=".repeat(40);
let choice = "";


function findBookingIndex(code) {

}


function inputPositiveInteger(message) {

}


function calculateTotal(ticketCount, pricePerTicket) {

}


function validateBookingCode(code) {

}


function displayBookings(list) {
    let totalRevenue = 0;
    let i = 0;
    if (list.lenght === 0) {
        console.log(`Danh sách đơn đặt vé trống.`);

    } else {
        for (i = 0; i < list.length; i++) {
            console.log(`${i + 1}. ${list[i].bookingCode} - ${list[i].customerName} - ${list[i].movieTitle}
    SL: ${list[i].ticketCount} | Giá: ${list[i].pricePerTicket} | Tổng TT: ${list[i].totalAmount}`);
            totalRevenue += list[i].totalAmount;
        }

        console.log(`Tổng: ${i} đơn đặt vé - Doanh thu: ${totalRevenue}`);

    }

}


function addNewBooking() {

}



do {
    choice = prompt(`${line}
        HỆ THỐNG QUẢN LÝ ĐẶT VÉ MOONLIGHT CINEMA
${line}
1. Hiển thị danh sách đơn đặt vé
2. Thêm đơn đặt vé mới
3. Cập nhật đơn đặt vé
4. Xoa đon dat ve
5. Tìm kiếm đơn đặt ve theo tên phim
0. Thoát chương trình
${line}
Vui lòng nhập lựa chọn của bạn (0 - 5):
        `) || "";


    switch (choice.trim()) {
        case "1":
            displayBookings(bookings);
            break;

        case "2":`~`
            break;

        case "3":

            break;

        case "4":

            break;

        case "5":

            break;


        case "0":
            console.log("Thoát chương trình, hẹn gặp lại bạn.");
            break;


        default:
            console.log("Lỗi! Vui lòng chỉ chọn các chức năng hiện có");
            break;
    }
} while (choice != 0 && choice != "");


