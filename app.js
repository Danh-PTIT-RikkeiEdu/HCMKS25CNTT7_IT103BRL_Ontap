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


// case 1
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

// case 2
function addNewBooking() {
    let inputCode = prompt("Nhập mã vé: ");
    if (inputCode === null) {
        console.log("Hủy thao tác");
        return;
    } else {
        validateBookingCode(inputCode);
    }
    let errorMess = validateBookingCode(inputCode);
    if (errorMess != "") {
        console.log(errorMess);
        return;
    }

    let validatedName = "";
    while (true) {
        let inputNameCustomer = prompt("Nhập tên của quý khách: ");
        if (inputNameCustomer === null) {
            console.log("Hủy thao tác");
            return;
        }

        if (inputNameCustomer.trim() === "") {
            console.log("Chưa nhập tên");
            continue;
        }

        validatedName = validateName(inputNameCustomer);
        if (validatedName !== "") {
            break;
        }
    }


    let validatedTitle = "";
    while (true) {
        let inputTitle = prompt("Nhập tên phim: ");
        if (inputTitle === null) {
            console.log("Hủy thao tác");
            return null;
        }

        if (inputTitle.trim() === "") {
            console.log("Chưa nhập tên phim");
            continue;
        }

        validatedTitle = validateName(inputTitle);
        if (validatedTitle !== "") {
            break;
        }
    }

    let inputTicketPrice = inputPositiveInteger("Nhập giá vé: ");
    let inputQuantity = inputPositiveInteger("Nhập số lượng vé: ");

    if (inputQuantity === null || inputTicketPrice === null) {
        console.log("Người dùng hủy thao tác");
        return;
    }

    const bill = calculateTotal(inputQuantity, inputTicketPrice);

    const newBooking = {
        bookingCode: inputCode,
        customerName: validatedName,
        movieTitle: validatedTitle,
        ticketCount: inputQuantity,
        pricePerTicket: inputTicketPrice,
        totalAmount: bill.totalAmount
    }
    bookings.push(newBooking);

    console.log(`Mã đặt vé: ${inputCode}
        Khách hàng: ${validatedName}
        Tên phim: ${validatedTitle}
        Số vé: ${inputQuantity}
        Giá mỗi vé: ${inputTicketPrice}
        Chi phí cơ sở: ${bill.baseCost}
        Giảm giá: ${bill.discount}
        Phí dịch vụ: ${bill.serviceFee}
        Tổng thanh toán: ${bill.totalAmount}`);
}


function validateName(name) {
    const words = String(name).trim().toLowerCase().split(/\s+/);
    let result = [];

    for (let i = 0; i < words.length; i++) {
        if (words[i].length > 0) {
            result.push(words[i].charAt(0).toUpperCase() + words[i].slice(1))
        }
    }

    return result.join(" ");
}


function validateBookingCode(code) {
    const validateCode = String(code).trim().toUpperCase();

    if (validateCode === "") {
        return "Chưa nhập mã vé";
    } else if (validateCode.length < 6) {
        return "Mã vé tối thiểu 6 ký tự";
    } else if (!validateCode.startsWith("CIN-")) {
        return "Mã phải bắt đầu với chuỗi ký tự CIN-";
    } else if (validateCode.includes(" ")) {
        return "Mã không được có khoảng trắng";
    } else if (findBookingIndex(validateCode) !== -1) {
        return "Mã đã tồn tại";
    } else {
        return "";
    }
}


function findBookingIndex(code) {
    for (let i = 0; i < bookings.length; i++) {
        if (bookings[i].bookingCode === code) {
            return i;
        }
    }
    return -1;
}


function inputPositiveInteger(message) {
    while (true) {
        let numberInput = prompt(message);

        if (numberInput === null) {
            return null;
        }

        trimmedNumber = numberInput.trim();
        parseInNumber = Number(trimmedNumber);

        if (parseInNumber !== NaN && parseInNumber > 0) {
            return parseInNumber;
        }

        console.log("Phải là 1 số nguyên lớn hơn 0");

    }
}


function calculateTotal(ticketCount, pricePerTicket) {
    let baseCost = ticketCount * pricePerTicket;
    let discount = 0;
    if (ticketCount === 4) {
        discount = 0.1;
    }
    let serviceFee = 0.08 * (baseCost - (baseCost * discount));
    let totalAmount = baseCost - (baseCost * discount) + serviceFee;

    return { baseCost, discount, serviceFee, totalAmount };
}


function updateBooking() {
    let code = "";

    while (true) {
        let inputCode = prompt("Nhập mã vé cần cập nhật: ");
        if (inputCode === null) {
            console.log("Hủy thao tác");
            return;
        }

        if (inputCode === "") {
            console.log("Bạn chưa nhập gì");
            continue;
        } else {
            code = inputCode;
            break;
        }
    }

    let index = findBookingIndex(code);


    if (index !== -1) {
        let inputTicketPrice = inputPositiveInteger("Nhập giá vé: ");
        let inputQuantity = inputPositiveInteger("Nhập số lượng vé: ");

        if (inputQuantity === null || inputTicketPrice === null) {
            console.log("Người dùng hủy thao tác");
            return;
        }

        const bill = calculateTotal(inputQuantity, inputTicketPrice);

        bookings[index].ticketCount = inputQuantity;
        bookings[index].pricePerTicket = inputTicketPrice;
        bookings[index].totalAmount = bill.totalAmount;

        console.log(`Mã đặt vé: ${bookings[index].bookingCode}
        Khách hàng: ${bookings[index].customerName}
        Tên phim: ${bookings[index].movieTitle}
        Số vé: ${inputQuantity}
        Giá mỗi vé: ${inputTicketPrice}
        Chi phí cơ sở: ${bill.baseCost}
        Giảm giá: ${bill.discount}
        Phí dịch vụ: ${bill.serviceFee}
        Tổng thanh toán: ${bill.totalAmount}`);
    } else {
        console.log("Mã vé không tồn tại");
        return;

    }
}



/**
 * Chức năng 4: Xóa đơn đặt vé khỏi danh sách kèm xác nhận
 */
const handleDeleteBooking = () => {
    const rawCode = prompt("Nhập mã đặt vé cần xóa:");
    if (rawCode === null) {
        console.log("Hủy thao tác xóa");
        return;
    }

    const bookingCode = rawCode.trim().toUpperCase();
    const index = findBookingIndex(bookingCode);

    if (index === -1) {
        console.log(`Không tìm thấy đơn đặt vé có mã ${bookingCode}`);
        return;
    }

    const confirmChoice = prompt(`Bạn có chắc chắn muốn xóa đơn ${bookingCode}? (Nhập Y/N):`);
    if (confirmChoice !== null && confirmChoice.trim().toUpperCase() === "Y") {
        bookings.splice(index, 1);
        console.log(`Xóa thành công, còn ${bookings.length} đơn`);
    } else {
        console.log(`Đã hủy thao tác xóa, còn ${bookings.length} đơn`);
    }
};

/**
 * Chức năng 5: Tìm kiếm đơn đặt vé theo tên phim (không phân biệt hoa/thường)
 */
const handleSearchBookings = () => {
    const rawKeyword = prompt("Nhập từ khóa tên phim cần tìm kiếm:");
    if (rawKeyword === null || rawKeyword.trim() === "") {
        console.log("Chưa nhập từ khóa tìm kiếm");
        return;
    }

    const keyword = rawKeyword.trim().toLowerCase();
    const searchResults = [];

    for (let i = 0; i < bookings.length; i++) {
        if (bookings[i].movieTitle.toLowerCase().includes(keyword)) {
            searchResults.push(bookings[i]);
        }
    }

    if (searchResults.length === 0) {
        console.log("Không tìm thấy đơn đặt vé phù hợp");
        return;
    }

    displayBookings(searchResults);
};


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
Vui lòng nhập lựa chọn của bạn (0 - 5):`);

    if (choice === null) {
        choice = "0"
    }

    switch (choice.trim()) {
        case "1":
            displayBookings(bookings);
            break;

        case "2":
            addNewBooking();
            break;

        case "3":
            updateBooking();
            break;

        case "4":
            handleDeleteBooking();
            break;

        case "5":
            handleSearchBookings();
            break;


        case "0":
            console.log("Thoát chương trình, hẹn gặp lại bạn.");
            break;


        default:
            console.log("Lỗi! Vui lòng chỉ chọn các chức năng hiện có");
            break;
    }
} while (choice != "0");


