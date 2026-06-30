# Thiết lập tài khoản quản trị trên Netlify

Trang quản trị nằm tại `https://ten-mien-cua-ban/admin/`.

## Cách bật đăng nhập an toàn

1. Đưa toàn bộ thư mục này lên một GitHub repository.
2. Trên Netlify, chọn **Add new site → Import an existing project** và kết nối repository đó.
3. Mở **Integrations → Identity → Netlify Identity**, chọn **Enable Identity**.
4. Trong **Registration preferences**, chọn **Invite only**.
5. Trong **Services**, bật **Git Gateway**.
6. Mở thẻ **Identity**, chọn **Invite users**, nhập email quản trị của bạn.
7. Mở email mời và tự đặt mật khẩu mạnh. Sau đó đăng nhập tại `/admin/`.

Không đặt mật khẩu trực tiếp trong HTML hoặc JavaScript: người khác có thể xem mã nguồn và lấy mật khẩu. Netlify Identity lưu mật khẩu an toàn và cho phép bạn đổi hoặc thu hồi tài khoản sau này.

## Nội dung có thể chỉnh trong trang quản trị

- Ảnh bìa.
- Tiêu đề và đoạn giới thiệu bìa.
- Hotline, Facebook và địa chỉ.

Các thay đổi được ghi vào repository và Netlify tự triển khai lại website.
