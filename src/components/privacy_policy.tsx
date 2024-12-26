import React, { useEffect, useRef } from "react";
import HeaderBase from "./header_base";
import image1 from '../../assets-src/dieukhoan/image1.jpg'
import image2 from '../../assets-src/dieukhoan/image2.jpg'
import image3 from '../../assets-src/dieukhoan/image3.jpg'
import image4 from '../../assets-src/dieukhoan/image4.jpg'
import image5 from '../../assets-src/dieukhoan/image5.jpg'
import image6 from '../../assets-src/dieukhoan/image6.jpg'
import image7 from '../../assets-src/dieukhoan/image7.jpg'
import image8 from '../../assets-src/dieukhoan/image8.jpg'

const PrivacyPolicyPage: React.FunctionComponent = (props) => {

  return (
    <div className="pt-20">
      <HeaderBase
        isHome={false}
        title={"Chính sách và điều khoản"}
      />
      {/* <img src={image1} />
      <img src={image2} />
      <img src={image3} />
      <img src={image4} />
      <img src={image5} />
      <img src={image6} />
      <img src={image7} />
      <img src={image8} /> */}
      <div className="bg-white p-3 ">
        <p className="p1 text-center"><strong>ĐIỀU KHOẢN VÀ ĐIỀU KIỆN DỊCH VỤ DÀNH CHO ĐỐI TÁC/KHÁCH HÀNG</strong></p>
        <p className="p2 mt-2 text-justify">ĐIỀU KHOẢN VÀ ĐIỀU KIỆN DỊCH VỤ DÀNH CHO ĐỐI TÁC/KHÁCH HÀNG [“ĐIỀU KHOẢN VÀ ĐIỀU KIỆN”]</p>
        <p className="p2 mt-2 text-justify">Bằng việc sử dụng mini zalo app “Bảo Hiểm Việt” thuộc sở hữu của [Công ty Cổ Phần Phát Triển Công Nghệ số DNP (“Công ty DNP”)] (“Ứng dụng”) và/hoặc sử dụng dịch vụ do Công ty DNP và/hoặc các công ty liên quan cung cấp (“Dịch vụ”), Bạn đồng ý rằng Bạn đã đọc, hiểu và chấp nhận và đồng ý với các điều khoản và điều kiện này (“Điều khoản và Điều kiện”). Các Điều khoản và Điều kiện này tạo thành một thỏa thuận pháp lý giữa ĐỐI TÁC/KHÁCH HÀNG (“Bạn” hoặc “Của bạn”) và Công ty DNP và/hoặc các công ty cùng tập đoàn (“Chúng Tôi” hoặc “Chúng Tôi” hoặc “Của Chúng Tôi”).<br /> <br /> VUI LÒNG XEM LẠI CÁC ĐIỀU KHOẢN VÀ ĐIỀU KIỆN NÀY VÀ ĐIỀU KHOẢN VÀ ĐIỀU KIỆN CHUNG VỀ BẢO VỆ VÀ XỬ LÝ DỮ LIỆU CÁ NHÂN CỦA CHÚNG TÔI CẨN THẬN TRƯỚC KHI SỬ DỤNG DỊCH VỤ CỦA CHÚNG TÔI.</p>
        <p className="p2 mt-2 text-justify">KHI BẠN QUYẾT ĐỊNH SỬ DỤNG ỨNG DỤNG NÀY VÀ/HOẶC SỬ DỤNG DỊCH VỤ CỦA CHÚNG TÔI, CÓ NGHĨA BẠN ĐỒNG Ý VÀ PHẢI TUÂN THỦ ĐIỀU KHOẢN VÀ ĐIỀU KIỆN NÀY VÀ ĐIỀU KHOẢN VÀ ĐIỀU KIỆN CHUNG VỀ BẢO VỆ VÀ XỬ LÝ DỮ LIỆU CÁ NHÂN CỦA CHÚNG TÔI.</p>
        <p className="p3 mt-2 text-justify">1. ĐIỀU KHOẢN CHUNG</p>
        <p className="p3 mt-2">Ứng dụng này là một ứng dụng đóng vai trò như một phương tiện để tìm kiếm dịch vụ và các thông tin liên quan đến bảo hiểm, mua sản phẩm bảo hiểm mà Đối tác/Khách hàng có nhu cầu sử dụng và/hoặc tìm kiếm dưới sự quản lý và giám sát của Chúng Tôi.</p>
        <p className="p3 mt-2 text-justify">Chúng Tôi có quyền bổ sung, thay đổi hoặc thay thế một phần hoặc toàn bộ thành phần của hệ thống trong Ứng dụng mà không có nghĩa vụ phải thông báo với Bạn trước.</p>
        <p className="p3 mt-2 text-justify">Công ty DNP bảo lưu quyền thay đổi, chỉnh sửa, tạm ngưng hoặc chấm dứt tất cả hoặc bất kỳ phần nào của Ứng dụng hoặc Dịch vụ vào bất cứ thời điểm nào theo qui định pháp luật. Phiên Bản thử nghiệm của Dịch Vụ hoặc tính năng của Dịch Vụ có thể không hoàn toàn giống với phiên bản cuối cùng.</p>
        <p className="p3 mt-2 text-justify">Công ty DNP bảo lưu quyền từ chối yêu cầu truy cập của bạn tới Ứng dụng hoặc Dịch Vụ theo quy định pháp luật và Điều khoản dịch vụ.</p>
        <p className="p3 mt-2 text-justify">Với tư cách là Đối tác/Khách hàng, Bạn có quyền sử dụng Ứng dụng và Dịch vụ, bao gồm nhưng không giới hạn việc thực hiện tương tác hoặc giao dịch với công ty bảo hiểm và có nghĩa vụ tuân thủ các Điều khoản và Điều kiện cũng như các chính sách khác được áp dụng bởi Chúng Tôi.</p>
        <p className="p3 mt-2 text-justify">ĐỂ TRÁNH HIỂU LẦM, CHÚNG TÔI LÀ MỘT ĐẠI LÝ BẢO HIỂM, ĐỒNG THỜI LÀ MỘT CÔNG TY CÔNG NGHỆ VÀ KHÔNG PHẢI LÀ CÔNG TY BẢO HIỂM; CŨNG NHƯ CHÚNG TÔI KHÔNG ĐƯA RA CÁC DỊCH VỤ BẢO HIỂM.</p>
        <p className="p3 mt-2 text-justify">Đối Tác không phải là nhân sự Chúng tôi thuê và Chúng Tôi không chịu trách nhiệm về mọi hành vi và hoặc hành động tắc trách của Đối tác, Công ty Bảo hiểm hoặc các bên khác sử dụng Ứng dụng của Chúng Tôi. Dịch vụ của Chúng Tôi chỉ nhằm hỗ trợ cung cấp các sản phẩm bảo hiểm từ các công ty bảo hiểm cho Khách hàng thông qua nền tảng trực tuyến.</p>
        <p className="p3 mt-2">2. ĐIỀU KHOẢN SỬ DỤNG ỨNG DỤNG</p>
        <p className="p3 mt-2 text-justify">Bạn tuyên bố và đảm bảo rằng Bạn là một cá nhân có quyền hợp pháp tham gia vào một thỏa thuận tuân theo luật pháp của Việt Nam. Nếu không, theo luật, Chúng Tôi sẽ có quyền hủy bỏ bất kỳ thỏa thuận nào đối với Bạn.</p>
        <p className="p3 mt-2 text-justify">Bạn cũng tuyên bố và đảm bảo rằng Bạn có quyền, thẩm quyền và khả năng sử dụng Dịch vụ và tuân theo các Điều khoản và Điều kiện, đồng thời đồng ý đăng ký Ứng dụng và / hoặc Dịch vụ mà Chúng Tôi cung cấp.</p>
        <p className="p3 mt-2 text-justify"><br /> Bạn với tư cách là Đối tác, có khả năng, năng lực và tất cả các yêu cầu cần thiết để thực hiện nhiệm vụ và chức năng của Bạn với tư cách là một đối tác, sau đây tuyên bố rằng Bạn sẽ thực hiện tốt nhiệm vụ và có trách nhiệm tuân theo các quy tắc và Luật pháp tại Việt Nam.</p>
        <p className="p3 mt-2 text-justify">Trước khi trở thành Đối Tác/Khách hàng của Ứng dụng, bạn cần đọc và chấp nhận mọi điều khoản và điều kiện được quy định trong, và dẫn chiếu đến, ĐIỀU KHOẢN VÀ ĐIỀU KIỆN này và ĐIỀU KHOẢN VÀ ĐIỀU KIỆN CHUNG VỀ BẢO VỆ  VÀ XỬ LÝ DỮ LIỆU CÁ NHÂN được dẫn chiếu theo đây.</p>
        <p className="p3 mt-2 text-justify">Nếu bạn không đồng ý với những điều khoản dịch vụ này, vui lòng không sử dụng dịch vụ hoặc truy cập vào ứng dụng. Nếu bạn là người chưa thành niên hoặc bị giới hạn về năng lực hành vi dân sự theo quy định pháp luật tại quốc gia bạn sinh sống, bạn cần nhận được sự hỗ trợ hoặc chấp thuận từ cha mẹ hoặc người giám hộ hợp pháp, tùy từng trường hợp áp dụng, để sử dụng ứng dụng và/hoặc dịch vụ. Trong trường hợp đó, cha mẹ hoặc người giám hộ hợp pháp, tùy từng trường hợp áp dụng, cần hỗ trợ để bạn hiểu rõ hoặc thay mặt bạn chấp nhận những điều khoản trong thỏa thuận dịch vụ này. Nếu bạn chưa chắc chắn về độ tuổi cũng như năng lực hành vi dân sự của mình, hoặc chưa hiểu rõ các điều khoản này cũng như quy định pháp luật có liên quan áp dụng cho độ tuổi hoặc năng lực hành vi dân sự của mình, vui lòng không sử dụng ứng dụng và/hoặc dịch vụ cho đến khi nhận được sự giúp đỡ từ cha mẹ hoặc người giám hộ hợp pháp. Nếu bạn là cha mẹ hoặc người giám hộ hợp pháp của người chưa thành niên hoặc bị giới hạn về năng lực hành vi dân sự, tùy từng trường hợp theo quy định pháp luật, bạn cần hỗ trợ để người được giám hộ hiểu rõ hoặc đại diện người được giám hộ chấp nhận các điều khoản dịch vụ này và chịu trách nhiệm đối với toàn bộ quá trình sử dụng ứng dụng hoặc các dịch vụ của ứng dụng mà không phân biệt tài khoản đã hoặc sẽ được chúng tôi tạo lập trên ứng dụng của chúng tôi.</p>
        <p className="p3 mt-2 text-justify">Bạn được xem là đã chấp thuận việc Chúng Tôi tạo tài khoản sử dụng Ứng dụng và thu thập, sử dụng thông tin cá nhân của Bạn khi Bạn sử dụng Dịch vụ trên Ứng dụng của chúng tôi, chẳng hạn như tên, địa chỉ email và số điện thoại di động của Bạn.</p>
        <p className="p3 mt-2 text-justify">Bạn phải cung cấp thông tin chính xác và đầy đủ, luôn cập nhật thông tin và đồng ý cung cấp cho Chúng tôi giấy tờ tùy thân mà Chúng tôi yêu cầu theo cách hợp lý.</p>
        <p className="p3 mt-2 text-justify">Nếu bất kỳ thông tin cá nhân nào mà Bạn đã cung cấp cho Chúng Tôi bị thay đổi hoặc nếu Bạn muốn hủy tài khoản của mình, vui lòng cập nhật thông tin chi tiết của Bạn bằng cách gửi yêu cầu của Bạn cho Chúng Tôi.</p>
        <p className="p3 mt-2 text-justify">Chúng Tôi, với tất cả khả năng của mình, sẽ thực hiện các thay đổi như được yêu cầu trong vòng mười lăm (15) ngày làm việc kể từ khi nhận được thông báo về thay đổi.</p>
        <p className="p3 mt-2 text-justify">Bằng sự đồng ý với ĐIỀU KHOẢN VÀ ĐIỀU KIỆN này, Bạn cũng đã đồng ý với ĐIỀU KHOẢN VÀ ĐIỀU KIỆN CHUNG VỀ BẢO VỆ  VÀ XỬ LÝ DỮ LIỆU CÁ NHÂN của Chúng tôi.</p>
        <p className="p3 mt-2 text-justify">Bạn chỉ có thể sử dụng Ứng dụng khi đăng nhập vào Ứng dụng. Chỉ bạn mới có thể sử dụng tài khoản của riêng Bạn và Bạn cam kết không ủy quyền cho người khác sử dụng danh tính hoặc tài khoản của Bạn. Bạn không được chuyển nhượng hoặc giao tài khoản của Bạn cho bất kỳ bên nào khác.</p>
        <p className="p3 mt-2 text-justify">Bạn phải giữ mật khẩu và tài khoản của Bạn và mọi thông tin nhận dạng mà nền tảng Zalo của Công ty Cổ Phần VNG cung cấp cho bạn một cách an toàn và bảo mật theo quy định của nền tảng Zalo.</p>
        <p className="p3 mt-2 text-justify">Trong trường mật khẩu của Bạn bị tiết lộ, mà điều này gây ra bất kỳ việc sử dụng bất hợp pháp hoặc trái phép nào đối với tài khoản hoặc danh tính của Bạn, các đơn đặt hàng được tạo từ việc sử dụng bất hợp pháp hoặc trái phép sẽ vẫn được coi là hợp lệ, trừ khi Bạn thông báo cho Chúng Tôi ngay khi phát hiện sự việc.</p>
        <p className="p3 mt-2 text-justify">Bạn cam kết rằng bạn sẽ chỉ sử dụng Ứng dụng và/hoặc Dịch vụ của Chúng Tôi đúng mục đích dự định của nó. Bạn không được lạm dụng hoặc sử dụng Ứng dụng và/hoặc Dịch vụ cho các mục đích gian lận hoặc gây ra bất kỳ sự bất tiện nào cho người khác.</p>
      </div >
    </div >
  );
}

export default PrivacyPolicyPage;