import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Page } from "zmp-ui";
import HeaderBase from "../components/header_base";
import Modal from 'react-modal';
import { BASE_URL } from "../utils/constants";
import axios from "axios";
import { toast } from "react-toastify";
import AuthorizeAccount from "./auth/authorize";


const PartnerTermsPage = () => {

  const [isShowModal, setIsShowModal] = useState(false)
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false)
  const [isChecked, setIsChecked] = useState(false)


  const getStatusRegisterContributor = async () => {
    const token = localStorage.token;

    try {
      const response = await axios.get(
        `${BASE_URL}/account/api/check-register-contributor`,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.status == "208" && response.data.message == "NOTEXISTORDER") {
        setIsRegistered(false)
      }

      if (response.data.status == "200" && response.data.message == "SUCCESS") {
        setIsRegistered(true)
      }
    } catch (error) {
      setIsRegistered(false)
    }


  }

  useEffect(() => {
    getStatusRegisterContributor()
  }, []);

  const modal = () => {
    return (
      <Modal
        isOpen={isShowModal}
        ariaHideApp={false}
        onRequestClose={() => setIsShowModal(false)}
        style={{
          content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#fff',
            border: 'none',
            borderRadius: '15px',
            padding: 0,
            width: '90%',
            height: '25%',
            overflow: 'auto',
          },
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        <div className="p-4 w-[100%] bg-white items-center justify-center rounded-xl">
          <div className="text-center text-[18px] font-semibold  mt-3">Bạn chưa đủ điều kiện đăng ký cộng tác viên</div>
          <div className="text-center text-[15x] font-normal mt-3">Bạn cần đăng ký 1 hợp đồng bảo hiểm để trở thành cộng tác viên</div>

          <button
            className="px-[24px]  mt-6 py-2 bg-[#0076B7] w-full rounded-full bg-[#0076B7] text-base font-normal text-white text-center"
            onClick={() => {
              setIsShowModal(false)
            }}
          >
            Đồng ý
          </button>
        </div>
      </Modal>
    )
  }

  return (
    <div>
      <HeaderBase
        isHome={false}
        title="Điều khoản đối tác"
      />
      <AuthorizeAccount />
      <Page className="page mt-20">
        <div className="rounded-lg no-scrollbar bg-white p-4 text-justify overflow-scroll" style={{ height: '70vh' }}>
          <p className="text-center"><strong>Điều khoản &amp; Điều kiện </strong>
          </p>
          <p className="text-center mt-2"><strong>CHƯƠNG TRÌNH TIẾP THỊ LIÊN KẾT BẢO HIỂM VIỆT DNP</strong>
          </p>
          <p className="text-center mt-2">(BẢO HIỂM VIỆT DNP AFFILIATE)</p>
          <p className="mt-2">Điều Khoản và Điều Kiện Hợp Tác Chương Trình Tiếp Thị Liên Kết Bảo Hiểm Việt DNP (“<strong>Chương Trình Tiếp Thị Liên Kết</strong>”) này (sau đây gọi chung là “<strong>Thỏa Thuận Hợp Tác</strong>”) được thiết lập và tham gia giữa Công Ty CÔNG TY CỔ PHẦN PHÁT TRIỂN CÔNG NGHỆ SỐ DNP (<strong>“CÔNG TY DNP</strong>” hoặc “<strong>chúng tôi</strong>”) và bạn (“<strong>Bên Liên Kết</strong>”), tùy vào từng ngữ cảnh.</p>
          <p className="mt-2"><strong>Bên Liên Kết</strong> được gọi chung là “<strong>Đối Tác</strong>”. <strong>CÔNG TY DNP</strong> và <strong>Đối Tác</strong> được gọi chung là “<strong>Các Bên</strong>” và gọi riêng lẻ là “<strong>Bên</strong>”.</p>
          <p className="mt-2">Các điều khoản và điều kiện trong Thỏa Thuận Hợp Tác này được áp dụng khi Đối Tác tham gia vào <strong>Chương Trình Tiếp Thị Liên Kết</strong> này. Để tránh nhầm lẫn, trong trường hợp Đối Tác là doanh nghiệp và/hoặc tổ chức, hành vi và vi phạm của nhân viên, người lao động, đại lý và nhà thầu của Đối Tác sẽ được xem là hành vi và vi phạm của Đối Tác.</p>
          <p className="mt-2">Bằng việc đăng ký hoặc đồng ý với nội dung của Thoả Thuận Hợp Tác này, Đối Tác đồng ý xác lập quan hệ hợp tác với Công ty DNP theo các điều khoản và điều kiện như sau:</p>
          <p className="mt-2">A. CÁC ĐIỀU KHOẢN VÀ ĐIỀU KIỆN CHUNG</p>
          <p>ĐIỀU 1. ĐỊNH NGHĨA</p>
          <ul>
            <li className="mt-2">
              <p><strong><em>Bên Liên Kết: </em></strong>Là một bên tham gia vào Chương Trình Tiếp Thị Liên Kết theo các điều khoản và điều kiện tại Thỏa Thuận Hợp Tác này.</p>
            </li>
            <li className="mt-2">
              <p><strong><em>Bảo Hiểm Gốc</em></strong>: là tổ chức kinh doanh Bảo Hiểm có sản phẩm Bảo Hiểm kinh doanh trên mini app Bảo Hiểm Việt.</p>
            </li>
            <li className="mt-2">
              <p><strong><em>Bảo Hiểm Việt DNP: </em></strong><em>Là thương hiệu thuộc sở hữu của Công ty DNP, đơn vị sở hữu và quản lý mini app Bảo Hiểm Việt.</em>
              </p>
            </li>
            <li className="mt-2">
              <p><strong><em>Cookies: </em></strong><em>Là mã lưu giữ thông tin truy cập của khách hàng do Bên Liên Kết dẫn vào Mini app Bảo Hiểm Việt. Công ty DNP không lưu giữ thông tin truy cập của khách hàng.</em>
              </p>
            </li>
            <li className="mt-2">
              <p><strong><em>Đơn Hàng Thành Công:</em></strong> Là đơn hàng mua hàng hóa hoặc dịch vụ được hoàn tất trên <strong><em>Mini app Bảo Hiểm Việt</em></strong> trong thời gian ba mươi (30) ngày kể từ ngày Khách Thăm được Bên Liên Kết dẫn đến <strong><em>Mini app Bảo Hiểm Việt</em></strong> thông qua các phương thức phát triển kinh doanh của Bên Liên Kết. Đơn Hàng Thành Công không bao gồm các đơn hàng gian lận/giả mạo hoặc đơn hàng phát sinh từ Hành Vi Bị Cấm (dù cho có chứng cứ rõ ràng hoặc thuộc trong trường hợp nghi ngờ hợp lý bởi Công ty DNP). Đơn Hàng Thành Công cũng không bao gồm đơn hàng bị huỷ hoặc bị người mua từ chối nhận hàng hoặc bị trả hàng theo Chính Sách Trả Hàng Hoàn Tiền của Bảo Hiểm Gốc.</p>
            </li>
            <li className="mt-2">
              <p><strong><em>Mini app Bảo Hiểm Việt:</em></strong> Là ứng dụng do Công ty DNP phát triển, cho phép người mua sản phẩm của doanh nghiệp kinh doanh Bảo Hiểm.</p>
            </li>
            <li className="mt-2">
              <p><strong><em>Hành Vi Bị Cấm:</em></strong> Là các hành vi không được phép sử dụng trong quá trình thực hiện theo quy định của các điều khoản và điều kiện tại Thỏa Thuận Hợp Tác này và/hoặc các thỏa thuận khác bằng văn bản của Các Bên.</p>
            </li>
            <li className="mt-2">
              <p><strong>Hệ thống Đối tác DNP</strong>: Là một phân hệ trong mini app Bảo Hiểm Việt, một hệ thống trực tuyến do Công ty DNP cung cấp để Đối Tác tham gia Chương Trình Tiếp Thị Liên Kết và cung cấp cho Đối Tác những thông tin thống kê và thông tin tài chính liên quan. Thông qua Hệ Thống Đối Tác DNP, Đối Tác có thể tiếp cận các thông tin và tài liệu cần thiết, bao gồm: hoạt động của Đối Tác, đăng nhập để xem số tiền hoa hồng của Đối Tác.</p>
            </li>
            <li className="mt-2">
              <p><strong><em>Khách Thăm:</em></strong> Là các cá nhân/ người dùng Internet được chuyển tiếp tới Mini app Bảo Hiểm Việt khi nhấp chuột vào đường dẫn hoặc QR code của Chương Trình Tiếp Thị Liên Kết dành riêng cho Bên Liên Kết.</p>
            </li>
            <li className="mt-2">
              <p><strong>Mã Giới Thiệu:</strong> Là đường dẫn hoặc QR code tự sinh trên hệ thống Mini app Bảo Hiểm Việt, cố định và gắn với thông tin đăng nhập của Bên Liên Kết khi Bên Liên Kết đăng ký tham gia Chương Trình Tiếp Thị Liên Kết.</p>
            </li>
            <li className="mt-2">
              <p><strong>Mạng Xã Hội</strong> (Social Network): Là hệ thống thông tin cung cấp cho cộng đồng người sử dụng mạng các dịch vụ lưu trữ, cung cấp, sử dụng, tìm kiếm, chia sẻ và trao đổi thông tin với nhau, bao gồm dịch vụ tạo trang thông tin điện tử cá nhân, diễn đàn (forum), trò chuyện (chat) trực tuyến, chia sẻ âm thanh, hình ảnh và các hình thức dịch vụ tương tự khác.</p>
            </li>
            <li className="mt-2">
              <p><strong><em>Ngày Làm Việc:</em></strong> Là bất kỳ ngày nào, ngoại trừ thứ Bảy, Chủ Nhật hoặc ngày lễ/Tết theo quy định của pháp luật.</p>
            </li>
            <li className="mt-2">
              <p><strong><em>Nguyên Tắc Nhấp Chuột Cuối Cùng:</em></strong> Là trường hợp Khách Thăm có Đơn Hàng Thành Công từ Mã Giới Thiệu của Bên Liên Kết; khi đó, Đơn Hàng Thành Công sẽ được tính cho Bên Liên Kết mà Khách Thăm có nhấp chuột cuối cùng trong vòng 30 ngày trước thời điểm đặt hàng tại Mini app Bảo Hiểm Việt.</p>
            </li>
            <li className="mt-2">
              <p><strong><em>Nhấp Chuột:</em></strong> Là việc người sử dụng kích hoạt đường dẫn Siêu Liên Kết của Chương Trình Tiếp Thị Liên Kết để đến với Sản Phẩm Trên Mini app Bảo Hiểm Việt.</p>
            </li>
            <li className="mt-2">
              <p><strong><em>Sản Phẩm Trên Mini app Bảo Hiểm Việt:</em></strong> Là hàng hóa/dịch vụ được chào bán, bán và phân phối trên Mini app Bảo Hiểm Việt.</p>
            </li>
            <li className="mt-2">
              <p><strong><em>Tài Liệu Quảng Cáo:</em></strong> Bao gồm nhưng không giới hạn ở các khung banner quảng cáo, cửa sổ quảng cáo (popup), bài viết hoặc bất cứ thông tin sản phẩm nào được hiển thị theo các hình thức tương tự hoặc được hiển thị theo bất cứ cách nào trên các phương tiện quảng cáo.</p>
            </li>
            <li className="mt-2">
              <p><strong><em>Thông Tin Mật: </em></strong>Là toàn bộ nội dung và thông tin về kinh doanh hoặc kỹ thuật liên quan đến đàm phán, hình thành và thực hiện Thỏa Thuận Hợp Tác, cùng bất cứ thông tin, phát hiện, dữ liệu và tài liệu nào dưới bất cứ dạng, loại hoặc phương thức thể hiện nào mà:</p>
              <ul>
                <li>
                  <p>Liên quan đến Các Bên hoặc một Bên; hoặc</p>
                </li>
              </ul>
            </li>
          </ul>
          <p className="mt-2">b) Liên quan đến các hoạt động kinh doanh của một Bên, dù là thực tế hay đang đề xuất, đã được tiết lộ trong quá trình đàm phán, hình thành và thực hiện; hoặc</p>
          <p className="mt-2">c) Liên quan đến Thỏa Thuận Hợp Tác này hoặc việc thực hiện Thỏa Thuận Hợp Tác này.</p>
          <p className="mt-2">ĐIỀU 2. NGUYÊN TẮC CHUNG VỀ VIỆC XÁC LẬP QUAN HỆ HỢP TÁC</p>
          <p className="mt-2">2.1. Việc giao kết và thực hiện Thỏa Thuận Hợp Tác này sẽ không thiết lập bất kỳ quan hệ nào giữa Các Bên nằm ngoài phạm vi Thỏa Thuận Hợp Tác này; và cũng sẽ không được ngầm hiểu hay diễn giải dưới bất kỳ hình thức nào, là thiết lập bất kỳ quan hệ lao động, đại lý, liên doanh, liên kết hoặc các quan hệ mang tính chất lương tự giữa Công ty DNP và Đối Tác một cách tương ứng.</p>
          <p className="mt-2">2.2. Các điều khoản và điều kiện áp dụng riêng cho từng Đối Tác cần phải có sự chấp thuận bằng văn bản của Công ty DNP một cách tương ứng và do đó, sẽ không được áp dụng ngay cả khi Công ty DNP không phản đối tính hợp lệ của những điều khoản và điều kiện này.</p>
          <p className="mt-2">B. CÁC ĐIỀU KHOẢN VÀ ĐIỀU KIỆN RIÊNG ÁP DỤNG CHO CHƯƠNG TRÌNH TIẾP THỊ LIÊN KẾT</p>
          <p className="mt-2">ĐIỀU 1. PHẠM VI CÔNG VIỆC</p>
          <ul>
            <li className="mt-2">
              <p>Bên liên kết đồng ý thực hiện Kết nối người dùng tiềm năng có nhu cầu tìm hiểu về Mini app Bảo Hiểm Việt hoặc sản phẩm trên Mini app Bảo Hiểm Việt.</p>
            </li>
            <li className="mt-2">
              <p>Thời hạn thực hiện Thoả Thuận Hợp Tác:</p>
            </li>
          </ul>
          <p>Thoả Thuận Hợp Tác có hiệu lực 12 tháng kể từ ngày Bên Liên Kết đăng ký tham gia Chương Trình Tiếp Thị Liên Kết này và được tự động gia hạn tiếp 12 tháng sau đó. Các kỳ gia hạn tự động này sẽ được duy trì trừ khi có thông báo khác bằng văn bản của Công Ty DNP hoặc khi Bên Liên Kết xoá tài khoản trên hệ thống Mini app Bảo Hiểm Việt.</p>
          <ul>
            <li className="mt-2">
              <p>Mọi sửa đổi, bổ sung các điều khoản và điều kiện trong Thoả Thuận Hợp Tác này do Công ty DNP quy định và sẽ thông báo cho Bên Liên Kết khi có sự thay đổi.</p>
            </li>
            <li className="mt-2">
              <p>Các bên cùng hiểu rằng thông qua Thoả Thuận Hợp Tác này, quan hệ hợp tác giữa hai bên đang được thể hiện là dựa trên góc độ quan hệ dân sự, do vậy nghĩa vụ liên quan đến Bảo hiểm xã hội, Bảo hiểm y tế và Bảo hiểm thất nghiệp sẽ không phát sinh.</p>
            </li>
            <li className="mt-2">
              <p>Đối với những Đơn Hàng Thành Công từ Chương Trình Tiếp Thị Liên Kết, Bên Liên Kết sẽ được nhận phí hoa hồng từ Công ty DNP, dựa trên mức độ và giá trị thực của dịch vụ.</p>
            </li>
          </ul>
          <p className="mt-2">ĐIỀU 2. NGHĨA VỤ VÀ CAM KẾT CỦA BÊN LIÊN KẾT</p>
          <p className="mt-2">2.1. Tự nguyện đồng ý với các quy định tại Thoả Thuận Hợp Tác này;</p>
          <p className="mt-2">2.2. Bên Liên Kết không tiến hành bất kỳ hành vi tấn công mạng làm ảnh hưởng đến hoạt động hệ thống của mini app Bảo Hiểm Việt.</p>
          <p className="mt-2">2.3. Trong trường hợp Bên Liên Kết vi phạm Thỏa Thuận Hợp Tác này, Công ty DNP có toàn quyền quyết định việc không thanh toán cho Bên Liên Kết bất kỳ khoản thanh toán nào Bên Liên Kết được hưởng phát sinh từ các giao dịch được thực hiện theo Thỏa Thuận Hợp Tác này.</p>
          <p className="mt-2">Trong trường hợp vi phạm xuất phát từ một đơn vị liên kết thứ cấp trong mạng lưới của Bên Liên Kết, Công ty DNP có thể yêu cầu Bên Liên Kết bồi thường cho Công ty DNP một khoản tương đương 30% số tiền Công ty DNP thanh toán cho Bên Liên Kết trong ba (03) tháng gần nhất trước trước thời điểm phát hiện ra hành vi vi phạm.</p>
          <p className="mt-2">ĐIỀU 3. DỊCH VỤ ĐƯỢC CUNG CẤP BỞI BẢO HIỂM VIỆT DNP</p>
          <p className="mt-2">3.1. Bên Liên Kết sẽ được cung cấp các tài liệu hướng dẫn sử dụng mini app Bảo Hiểm Việt, hướng dẫn về các sản phẩm được bán trên Mini app Bảo Hiểm Việt sau khi tham gia <strong>Chương Trình Tiếp Thị Liên Kết</strong>. Các tài liệu này sẽ được cập nhật qua từng thời kỳ.</p>
          <p className="mt-2">3.2. Các khoản Phí Hoa Hồng mà Bảo Hiểm Việt DNP trả cho Bên Liên Kết được dựa trên Đơn Hàng Thành Công và giá trị thuần của Đơn Hàng Thành Công.</p>
          <p className="mt-2">3.3. Bên Liên Kết, khi tham gia vào Mini app Bảo Hiểm Việt và tuân thủ các điều khoản và điều kiện mà Bên Liên Kết đã đồng ý với Công ty DNP đối với vấn đề này, được nhận hoa hồng từ Công ty DNP liên quan đến các Đơn Hàng Thành Công thực tế được xác lập nhờ hoạt động quảng bá về Mini app Bảo Hiểm Việt đang được Bên Liên Kết triển khai trên Mạng Xã Hội của Bên Liên Kết.</p>
          <p className="mt-2">ĐIỀU 4. PHÍ HOA HỒNG VÀ MỨC THƯỞNG CỦA BÊN LIÊN KẾT CHO ĐƠN HÀNG THÀNH CÔNG</p>
          <ul>
            <li className="mt-2">
              <p>Bên Liên Kết được hưởng phí hoa hồng xác định dựa trên công thức sau: Giá trị thuần đơn hàng thành công x tỷ lệ phí hoa hồng.</p>
            </li>
            <li className="mt-2">
              <p>Phí hoa hồng do Công ty DNP quy định tại từng thời điểm. Chính sách phí Hoa Hồng có thể được điều chỉnh bất cứ lúc nào (ví dụ như bằng cách cộng thêm hoa hồng cho một số Bên Liên Kết nhất định), để khuyến khích phương án kinh doanh tốt nhất và khen thưởng cho thành tích vượt trội.</p>
            </li>
          </ul>
          <p className="mt-2">Điều 5. Thanh Toán</p>
          <p className="mt-2"><strong>Các Đơn Hàng Thành Công sẽ được tự động đối soát trên Hệ thống Đối tác DNP, Công ty DNP sẽ tiến hành thanh toán Hoa hồng và mức thưởng của Bên Liên Kết cho Đơn Hàng Thành Công định kỳ sau 30 ngày kể từ ngày Công ty DNP gửi cho Bên Liên Kết kết quả đối soát Đơn Hàng Thành Công. </strong>
          </p>
          <p className="mt-2"><strong>Nếu Bên Liên Kết là cá nhân kinh doanh, hộ kinh doanh và/hoặc doanh nghiệp thì thời điểm thanh toán như quy định tại khoản 6.4, Điều 6.</strong>
          </p>
          <p className="mt-2">Điều 6. Chứng Từ Thanh Toán</p>
          <p className="mt-2">6.1. Để cho rõ ràng, việc thanh toán Phí Hoa Hồng nêu tại Điều 4 cho Bên Liên Kết sẽ chỉ được thực hiện với điều kiện là Công ty DNP nhận được đầy đủ chứng từ thanh toán từ Bên Liên Kết (“Chứng Từ Thanh Toán”). Cho mục đích này, Chứng Từ Thanh Toán bao gồm:</p>
          <p className="mt-2">(a) Nếu Bên Liên Kết là doanh nghiệp, hộ kinh doanh, cá nhân kinh doanh: hóa đơn hợp lệ, các thông tin và chứng từ thanh toán khác theo yêu cầu của Công ty DNP.</p>
          <p className="mt-2">(b) Nếu Bên Liên Kết là cá nhân (không phải cá nhân kinh doanh): thông tin thanh toán, chứng từ, tài liệu phục vụ việc khai thuế, bao gồm nhưng không giới hạn họ và tên, CCCD/CMND, số tài khoản ngân hàng, mã số thuế TNCN và các thông tin khác theo yêu cầu của Công ty DNP.</p>
          <p className="mt-2">6.2. Bên Liên Kết có thể đăng nhập vào Hệ Thống Đối Tác DNP để theo dõi Phí Hoa Hồng đã được tích lũy. Hàng tháng, tùy theo quyết định của Công ty DNP, Công ty DNP sẽ gửi đối soát về doanh thu Phí Hoa Hồng được duyệt mà Bên Liên Kết đạt được qua email mà Bên Liên Kết đã đăng ký qua Hệ Thống Đối Tác DNP.</p>
          <p className="mt-2">6.3. Nếu Bên Liên Kết là cá nhân (không phải cá nhân kinh doanh), các nội dung sau sẽ được áp dụng:</p>
          <p className="mt-2">(a) Bên Liên Kết có thời gian hai mươi bốn (24) giờ để kiểm tra và phản hồi về kết quả Phí Hoa Hồng. Sau thời gian hai mươi bốn (24) giờ nếu Công ty DNP không nhận được bất kỳ một phản hồi nào của Bên Liên Kết về kết quả đối soát qua nhân viên hỗ trợ thì Bên Liên Kết được xem là đồng ý với Phí Hoa Hồng mà Công ty DNP đã thông báo.</p>
          <p className="mt-2">(b) Việc thanh toán sẽ được thực hiện như quy định tại Điều 5.</p>
          <p className="mt-2">(c) Các khoản thanh toán sẽ bị khấu trừ thuế thu nhập cá nhân theo quy định thuế hiện hành của Nhà nước. Mức thuế suất thuế thu nhập cá nhân hiện đang được áp dụng theo Thông tư 111/2013/TT-BTC của Bộ tài chính là 10% đối với khoản thu nhập trên 2.000.000 VND (Hai triệu đồng).</p>
          <p className="mt-2">6.4. Nếu Bên Liên Kết là cá nhân kinh doanh, hộ kinh doanh và/hoặc doanh nghiệp thì việc thanh toán sẽ được thực hiện trong vòng ba mươi (30) ngày làm việc kể từ ngày Công ty DNP nhận được đầy đủ các Chứng Từ Thanh Toán hợp lệ từ Bên Liên Kết trừ trường hợp Công ty DNP có căn cứ hoặc lý do hợp lý để nghi ngờ Bên Liên Kết có thực hiện hành vi gian lận.</p>
          <p className="mt-2">6.5. Nếu các khoản thanh toán phải chịu thuế nhà thầu, Công ty DNP sẽ khấu trừ số thuế đó vào khoản thanh toán, và sẽ chi trả cho Bên Liên Kết số tiền sau khấu trừ thuế nhà thầu và đồng thời cung cấp cho Bên Liên Kết chứng nhận hoặc tài liệu tương đương về số thuế nhà thầu đã khấu trừ.</p>
          <p className="mt-2">6.6 Khoản Bồi Hoàn. Công ty DNP sẽ không chi trả Phí Hoa Hồng/Phí Dịch Vụ và bảo lưu quyền cấn trừ hoặc thực hiện yêu cầu bồi hoàn cho Công ty DNP đối với các giao dịch đã thanh toán thuộc một trong các trường hợp sau:</p>
          <p className="mt-2">(a) các giao dịch không thỏa điều kiện để được xem là Đơn Hàng Thành Công;</p>
          <p className="mt-2">(b) giao dịch gian lận được phát hiện thủ công hoặc thông qua Mini app Bảo Hiểm Việt;</p>
          <p className="mt-2">(c) giao dịch bị hủy bỏ, không hoàn tất, bị trả hàng hoàn tiền theo chính sách của Công ty DNP;</p>
          <p className="mt-2">(e) giao dịch mua hàng ở Mini app Bảo Hiểm Việt nhằm mục đích bán lại;</p>
          <p className="mt-2">(f) giao dịch được thực hiện thông qua đường link tiếp thị liên kết được đặt ở phương tiện tiếp thị liên kết có chứa bất kỳ nội dung cấm nào.</p>
          <p className="mt-2">6.7 Từ Chối Thanh Toán.</p>
          <p className="mt-2">(a) Đối với Bên Liên Kết là doanh nghiệp, hộ kinh doanh, cá nhân kinh doanh:</p>
          <p className="mt-2">Trong vòng 30 (ba mươi) ngày kể từ thời điểm Công ty DNP gửi kết quả đối soát Đơn Hàng Thành Công theo quy định tại Điều 4 và Điều 5 nhưng Bên Liên Kết không cung cấp hoặc cung cấp không đầy đủ Chứng Từ Thanh Toán cho Công ty DNP, Công ty DNP bảo lưu quyền từ chối thanh toán Phí Hoa Hồng và các khoản phải trả khác (nếu có) cho Bên Liên Kết.</p>
          <p className="mt-2">Để cho rõ ràng, việc Bên Liên Kết không cung cấp hoặc cung cấp không đầy đủ Chứng Từ Thanh Toán sẽ cấu thành việc Bên Liên Kết đồng thuận chấm dứt hợp tác theo Thỏa Thuận Hợp Tác này vào ngày làm việc thứ 31 (ba mươi mốt) kể từ thời điểm Công ty DNP gửi kết quả đối soát Đơn Hàng Thành Công.</p>
          <p className="mt-2">(b) Đối với Bên Liên Kết là cá nhân không kinh doanh:</p>
          <p className="mt-2">Trong vòng 6 (sáu) tháng kể từ ngày phát sinh doanh thu cho Bên Liên Kết nhưng Bên Liên Kết không cung cấp hoặc cung cấp không đầy đủ Chứng Từ Thanh Toán, Công ty DNP bảo lưu quyền từ chối thanh toán Phí Dịch Vụ và các khoản phải trả khác (nếu có) cho Bên Liên Kết.</p>
          <p className="mt-2">Để cho rõ ràng, việc Bên Liên Kết không cung cấp hoặc cung cấp không đầy đầy đủ Chứng Từ Thanh Toán sẽ cấu thành việc Bên Liên Kết đồng thuận chấm dứt hợp tác theo Thỏa Thuận Hợp Tác này vào thời điểm kết thúc thời hạn 6 (sáu) tháng nêu trên.</p>
          <p className="mt-2">6.8 Thuế</p>
          <p className="mt-2">(a) Đối với Bên Liên Kết là doanh nghiệp: Bên Liên Kết sẽ chịu trách nhiệm đối với các khoản thuế liên quan đến Phí Dịch Vụ và các khoản thu khác phát sinh từ việc tham gia Chương Trình theo Thỏa Thuận này. Nếu Công ty DNP phải khấu trừ bất kỳ khoản thuế nào từ các khoản tiền phải trả cho Bên Liên Kết theo quy định của pháp luật Việt Nam, Công ty DNP sẽ khấu trừ khoản tiền thuế vào Phí Dịch Vụ và các khoản phải thanh toán cho Bên Liên Kết và cung cấp cho Bên Liên Kết tài liệu chứng minh việc khấu trừ/nộp thuế.</p>
          <p className="mt-2">(b) Đối với Bên Liên Kết là cá nhân kinh doanh, hộ kinh doanh: Bên Liên Kết sẽ chịu trách nhiệm đối với các khoản thuế (bao gồm nhưng không hạn chế ở Thuế Thu nhập cá nhân, thuế Giá trị gia tăng, và các khoản thuế khác phù hợp với quy định của pháp luật…) tại Việt Nam liên quan đến Phí Dịch Vụ và các khoản thu khác phát sinh từ việc tham gia Chương Trình theo Thỏa Thuận này. Nếu Công ty DNP phải khấu trừ bất kỳ khoản thuế nào từ các khoản tiền phải trả cho Bên Liên Kết theo quy định của pháp luật Việt Nam, Công ty DNP sẽ khấu trừ khoản tiền thuế vào Phí Dịch Vụ và các khoản phải thanh toán cho Bên Liên Kết và cung cấp cho Bên Liên Kết tài liệu chứng minh việc khấu trừ/nộp thuế.</p>
          <p className="mt-2">(c) Đối với Bên Liên Kết là cá nhân (không phải là cá nhân kinh doanh): Bên Liên Kết chịu trách nhiệm kê khai và nộp tất cả các nghĩa vụ thuế phát sinh từ Phí Hoa Hồng và các khoản thu khác mà Bên Liên Kết nhận được từ việc tham gia Chương Trình theo Thỏa Thuận này (bao gồm nhưng không hạn chế ở thuế Thu nhập cá nhân và các khoản thuế khác phù hợp với quy định của pháp luật…). Nếu Công ty DNP phải khấu trừ bất kỳ khoản thuế nào từ Phí Hoa Hồng và các khoản tiền phải trả cho Bên Liên Kết theo quy định của pháp luật, Công ty DNP sẽ khấu trừ khoản tiền thuế phải khấu trừ vào Phí Hoa Hồng và các khoản phải thanh toán cho Bên Liên Kết và cung cấp cho Bên Liên Kết tài liệu chứng minh việc khấu trừ/nộp thuế.</p>
          <p className="mt-2">(d) Để cho rõ ràng, Bên Liên Kết chịu trách nhiệm thực hiện quyết toán thuế hàng năm (nếu có) đối với các khoản Phí Dịch Vụ (hoặc Phí Hoa Hồng, tùy từng trường hợp), thu nhập và doanh thu mà Bên Liên Kết nhận được từ việc tham gia Chương Trình, bao gồm nhưng không giới hạn ở thuế Thu nhập cá nhân, thuế Thu nhập doanh nghiệp, và các loại thuế khác phù hợp với quy định của pháp luật. Bên Liên Kết phải đảm bảo tuân thủ tất cả các yêu cầu kê khai và nộp thuế liên quan, bao gồm việc lập và nộp báo cáo thuế hàng năm đúng hạn theo quy định của cơ quan thuế có thẩm quyền.</p>
          <p className="mt-2">Điều Khoản và Điều Kiện này được cập nhật vào ngày 01/08/2024.</p>
        </div>

        <div>
          <div className="flex rounded-lg bg-white p-4 text-justify mt-4 items-start">
            <input
              type="checkbox"
              onChange={(e) => {
                setIsChecked(!isChecked)
              }}
              className="relative appearance-none bg-white w-5 h-5 border rounded-full border-gray-400 cursor-pointer checked:bg-[#0076B7]"
              id="unchecked-circular-checkbox"
            />
            <label
              htmlFor="unchecked-circular-checkbox"
              className="text-[16.7px] font-normal text-[#000] w-[96%] ml-3"
            >
              Tôi đã hiểu và đồng ý

              <strong className="text-[#0076B7] font-bold">
                {" "}
                Chính sách và điều khoản của đối tác
              </strong>

            </label>
          </div>
          <button
            className="px-[24px]  mt-6 py-2 bg-[#0076B7] w-full rounded-full bg-[#0076B7] text-base font-normal text-white text-center"
            onClick={() => {
              if (!isChecked) {
                toast.warning("Vui lòng chấp nhận điều khoản chính sách");
                return;
              }

              isRegistered == true ? navigate(`/register-collaborate/`) : setIsShowModal(true)

            }}
          >
            Đồng ý
          </button>
        </div>

        {modal()}

      </Page>
    </div>
  )
}

export default PartnerTermsPage;