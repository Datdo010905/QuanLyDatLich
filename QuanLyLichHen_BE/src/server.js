//gọi app.js để run
const app = require('./app'); 

//const PORT = 3000;
const PORT = 5000;

//run app
app.listen(PORT, () => {
    console.log(`Server QuanLyLichHen đang chạy ở cổng ${PORT}`);
});