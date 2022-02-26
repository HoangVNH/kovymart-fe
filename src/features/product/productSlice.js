import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import productApi from "../../apis/productApis";
import { NotifyHelper } from "../../helpers/notify-helper";

const initialState = {
  isFetching: false,
  success: false,
  message: null,
  products: [],
  productList1: [],
  productList2: [],
  productList3: [],
  productList4: [],
  productList5: [],
  isFetchingProductList1:  false,
  isFetchingProductList2:  false,
  isFetchingProductList3:  false,
  isFetchingProductList4:  false,
  isFetchingProductList5:  false,
  filteredProducts: [],
  details: {
    id: 0,
    productName: "",
    sku: "",
    description: "",
    price: 0,
    discount: 0,
  },
  originalProducts: [
    {
      id: 7,
      sku: "10053936",
      description: "Cà rốt 500g<p><strong>Lưu ý:</strong></p><p><strong>- Hạn sử dụng thực tế quý khách vui lòng xem trên bao bì.</strong></p><p><strong>- Hình sản phẩm chỉ mang tính chất minh họa, hình bao bì của sản phẩm tùy thời điểm sẽ khác so với thực tế.</strong></p>",
      price: 14950,
      unit: "",
      discount: 0,
      categoryId: 1,
      supplierId: 8,
      createdAt: "2021-08-12T02:22:27.664Z",
      updatedAt: "2021-08-12T02:22:27.664Z",
      smallImage: "https://lh3.googleusercontent.com/rdTKKDr6Z8scOwzwHfJnJhexO-WLn8X7RCWAHRDLa8V3U62ed7WwJ8YEObktJeTb15yum2ADHSFdJvyaDj1j26z6gWtGCTw=w185",
      largeImage: "https://lh3.googleusercontent.com/rdTKKDr6Z8scOwzwHfJnJhexO-WLn8X7RCWAHRDLa8V3U62ed7WwJ8YEObktJeTb15yum2ADHSFdJvyaDj1j26z6gWtGCTw",
      isDelete: false,
      category: {
        id: 1,
        name: "Rau Củ",
        description: "",
        image: "https://image.cooky.vn/ads/s320/39d51e75-05cd-4c5b-a3a0-082bdae74b63.png",
        isDelete: false,
        createdAt: "2021-08-11T00:10:09.199Z",
        updatedAt: "2021-08-11T00:10:09.199Z"
      },
      supplier: {
        id: 8,
        name: "Trái cây nhập khẩu",
        email: "traicaynhapkhau@gmail.com",
        phone: "123456789",
        address: "227 Nguyễn Văn Cừ, phường 4, quận 5",
        createdAt: "2021-08-11T00:17:11.590Z",
        updatedAt: "2021-08-11T00:17:11.590Z",
        isDelete: false
      },
      productName: "Cà rốt 500g"
    },
    {
      id: 4,
      sku: "10617947",
      description: "<h2><strong>Giới thiệu MEATDeli Thịt lợn mát Heo xay loại 1 S (350g)</strong></h2><p>Meat Deli thương hiệu thịt sạch áp dụng Công Nghệ Oxy Fresh 9 đến từ Châu Âu mang tới những sản phẩm đảm bảo an toàn chất lượng tới tận tay người tiêu dùng. Khép kín mọi công đoạn giúp nâng cao dinh dưỡng trong bữa ăn của mỗi gia đình.</p><figure><img src='https://tmp.phongvu.vn/wp-content/uploads/2020/03/MML_Thịt-heo-xay-loại-1-S-e1585280573105.jpg' alt='MML_Thịt heo xay loại 1 (S)'></figure><p>Thịt lợn chứa hàm lượng cao protein và các acid amin, rất cần thiết đối với những người quan tâm đến việc xây dựng hình thể. Thành phần bên trong thịt lợn chứa nhiều vitamin B1, vitamin B2&nbsp;rất cần thiết cho sự tăng trưởng, phục hồi cơ bắp và&nbsp;nhanh hồi phục những tổn thương trên da và giải độc cơ thể rất tốt.</p><p>Thịt lợn thúc đẩy việc sản xuất tế bào máu của cơ thể có lượng máu lưu thông tốt hơn, hạn chế tình trạng tê chân, tay do ít vận động. Thịt lợn bảo vệ cấu trúc xương, giúp xương và răng chắc khỏe, cũng như đảm bảo&nbsp; năng lượng cho cơ thể đủ sức vận động.</p><p>Thịt lợn tốt cho da, mắt, hệ thần kinh, xương và hoạt động trí óc. Ăn thịt lợn cũng đảm bảo khả năng miễn dịch tốt hơn do có sự hiện diện của các chất chống oxy hóa quan trọng.</p><p><strong>Hướng dẫn sử dụng</strong></p><p>Dùng làm nguyên liệu chế biến các món ăn tùy thích</p><p><strong>Hướng dẫn bảo quản</strong></p><p>Bảo quản ở nhiệt độ 0 - 4 độ C</p><p><strong>Lưu ý:</strong></p><p><strong>- Hạn sử dụng thực tế quý khách vui lòng xem trên bao bì.</strong></p><p><strong>- Hình sản phẩm chỉ mang tính chất minh họa, hình bao bì của sản phẩm tùy thời điểm sẽ khác so với thực tế.</strong></p>",
      price: 45465,
      unit: "kg",
      discount: 0,
      categoryId: 4,
      supplierId: 1,
      createdAt: "2021-08-12T01:45:58.817Z",
      updatedAt: "2021-08-12T01:45:58.817Z",
      smallImage: "https://lh3.googleusercontent.com/rusSWS59bGwXTYnSRM6kwa0mz8jMvv3KFUGO2FXvvWCVZmeFhzzqOu8hpHCPf2WMpnqkOH5XPX0mKTd70qk0=w185",
      largeImage: "https://lh3.googleusercontent.com/rusSWS59bGwXTYnSRM6kwa0mz8jMvv3KFUGO2FXvvWCVZmeFhzzqOu8hpHCPf2WMpnqkOH5XPX0mKTd70qk0",
      isDelete: false,
      category: {
        id: 4,
        name: "Thịt - Hải sản - Trứng",
        description: "",
        image: "https://image.cooky.vn/ads/s320/e7728abb-2f5c-4e3e-8a7e-ee8d9bfab13a.png",
        isDelete: false,
        createdAt: "2021-08-11T00:10:26.629Z",
        updatedAt: "2021-08-11T00:10:26.629Z"
      },
      supplier: {
        id: 1,
        name: "MEATDeli",
        email: "meatdeli@gmail.com",
        phone: "123456789",
        address: "227 Nguyễn Văn Cừ, phường 4, quận 5",
        createdAt: "2021-08-11T00:14:58.838Z",
        updatedAt: "2021-08-11T00:14:58.838Z",
        isDelete: false
      },
      productName: "Thịt heo xay loại 1 MeatDeli 350g"
    },
    {
      id: 15,
      sku: "10007928",
      description: "<h2><strong>Giới thiệu tổng quan về Mì trộn khoai tây sốt spaghetti Omachi 91g.</strong></h2><p><strong>Mì trộn khoai tây sốt spaghetti Omachi 91g</strong> với sợi mỳ mềm và dai, được làm từ khoai tây tươi chọn lọc, kết hợp với nước xốt được chế biến từ thịt bò bằm và cà chua tươi làm nên mì Omachi xốt Spaghetti mang hương vị đặc trưng của nước Ý.</p><p><strong>Mì trộn khoai tây sốt spaghetti Omachi 91g</strong> sử dụng nhiệt độ chiên thích hợp cho ra sợi mì vừa chín tới, không bị cháy khét nên đảm bảo chất lượng tuyệt hảo của sản phẩm. Kết hợp với bộ gia vị hoàn toàn chiết xuất từ nguyên liệu rau, củ, quả tươi tự nhiên, mang lại cho người dùng một tô mì ngon, tươi mát.</p><p><strong>Mì trộn khoai tây sốt spaghetti Omachi 91g</strong> được sản xuất theo công nghệ hiện đại, mọi khâu từ tuyển chọn nguyên liệu tới chế biến, đóng gói đều diễn ra khép kín dưới sự giám sát và kiểm tra nghiêm ngặt của các chuyên gia thực phẩm hàng đầu, theo đó sản phẩm không chứa hóa chất, chất bảo quản độc hại, đảm bảo an toàn cho sức khỏe người tiêu dùng. Đặc biệt với chất kukoamine có trong khoai tây có tác dụng làm đẹp da và cải thiện sức khỏe.</p><p><strong>Hướng dẫn sử dụng:</strong></p><ul><li>Cho vắt mì vào bát, đổ nước sôi vào đậy nắp trong 4 phút.</li><li>Sau đó chắt phần nước ra hết rồi cho gói dầu, gói súp sệt và gói súp bột vào, trộn đều và dùng ngay.</li></ul><p><strong>Hướng dẫn bảo quản:</strong> Bảo quản nơi khô ráo và tránh ánh nắng mặt trời.</p><p><strong>Hạn sử dụng:</strong> 6 tháng kể từ ngày sản xuất</p><p><strong>Lưu ý:</strong></p><p><strong>- Hạn sử dụng thực tế quý khách vui lòng xem trên bao bì.</strong></p><p><strong>- Hình sản phẩm chỉ mang tính chất minh họa, hình bao bì của sản phẩm tùy thời điểm sẽ khác so với thực tế.</strong></p>",
      price: 7700,
      unit: "",
      discount: 0,
      categoryId: 3,
      supplierId: 4,
      createdAt: "2021-08-13T01:45:26.386Z",
      updatedAt: "2021-08-13T01:45:26.386Z",
      smallImage: "https://lh3.googleusercontent.com/OLAl9w5eOpNAums3w-fTUovH7ya646tXBrH9WG4WJLhQ1QjhhoQlupCkeNrNoWKPt09AB3ItXpvP6kanQTHy=w185",
      largeImage: "https://lh3.googleusercontent.com/OLAl9w5eOpNAums3w-fTUovH7ya646tXBrH9WG4WJLhQ1QjhhoQlupCkeNrNoWKPt09AB3ItXpvP6kanQTHy",
      isDelete: false,
      category: {
        id: 3,
        name: "Gia Vị - Đồ Khô",
        description: "",
        image: "https://image.cooky.vn/ads/s320/1459e7e9-0d7f-4812-a74b-edebc92d9950.jpeg",
        isDelete: false,
        createdAt: "2021-08-11T00:10:38.438Z",
        updatedAt: "2021-08-11T00:10:38.438Z"
      },
      supplier: {
        id: 4,
        name: "Omachi",
        email: "omachi@gmail.com",
        phone: "123456789",
        address: "227 Nguyễn Văn Cừ, phường 4, quận 5",
        createdAt: "2021-08-11T00:16:00.822Z",
        updatedAt: "2021-08-11T00:16:00.822Z",
        isDelete: false
      },
      productName: "Mì trộn khoai tây sốt spaghetti Omachi 91g"
    },
    {
      id: 6,
      sku: "10055074",
      description: "<h2><strong>Giới thiệu tổng quan về&nbsp;Táo Royal Gala PG size 100-120</strong></h2><p><strong>Táo Royal Gala PG size </strong>là sản phẩm trái cây tươi nhập khẩu nổi tiếng của New Zealand, được lai tạo giữa dòng táo Golden Delicious và táo Kidd.</p><p><strong>Táo Royal Gala PG size&nbsp;</strong> có hương vị ngọt ngào, tươi mát cùng với phần thịt cứng chắc khi cắn tạo cảm giác ngon miệng. Táo có vỏ màu đỏ cùng với các sọc vàng ở trên nền đỏ và đặc biệt, vỏ của dòng táo này rất mỏng.</p><p>Sản phẩm rất thích hợp để làm ra những cốc nước ép táo thơm ngon, nhiều nước, ngọt lịm, phù hợp hoàn hảo trong những ngày hè nóng nực khi uống lạnh. Không chỉ vậy, táo còn có thể được sử dụng trong các món salad hay các món ăn vặt khác như sữa chua, kem,....</p><p><strong>Táo Royal Gala PG size </strong>cũng như các loại táo khác nên được bảo quản ở nhiệt độ từ 0°C đến 4°C, giúp đảm bảo cho độ giòn tự nhiên của táo.</p><p><strong>Lưu ý:</strong></p><p><strong>- Hạn sử dụng thực tế quý khách vui lòng xem trên bao bì.</strong></p><p><strong>- Hình sản phẩm chỉ mang tính chất minh họa, hình bao bì của sản phẩm tùy thời điểm sẽ khác so với thực tế.</strong></p>",
      price: 34950,
      unit: "",
      discount: 0,
      categoryId: 2,
      supplierId: 8,
      createdAt: "2021-08-12T02:05:21.545Z",
      updatedAt: "2021-08-12T02:05:21.545Z",
      smallImage: "https://lh3.googleusercontent.com/5-MTN9YjV5C49oBfMoAMZGo3OnaRNKDtWBHki2y99ANh8OzyG5pbsg4M7sTqDmi_et7-cKUF8hgNvmBSOJo=w185",
      largeImage: "https://lh3.googleusercontent.com/5-MTN9YjV5C49oBfMoAMZGo3OnaRNKDtWBHki2y99ANh8OzyG5pbsg4M7sTqDmi_et7-cKUF8hgNvmBSOJo",
      isDelete: false,
      category: {
        id: 2,
        name: "Trái Cây",
        description: "",
        image: "https://image.cooky.vn/ads/s320/39d51e75-05cd-4c5b-a3a0-082bdae74b63.png",
        isDelete: false,
        createdAt: "2021-08-11T00:10:09.199Z",
        updatedAt: "2021-08-11T00:10:09.199Z"
      },
      supplier: {
        id: 8,
        name: "Trái cây nhập khẩu",
        email: "traicaynhapkhau@gmail.com",
        phone: "123456789",
        address: "227 Nguyễn Văn Cừ, phường 4, quận 5",
        createdAt: "2021-08-11T00:17:11.590Z",
        updatedAt: "2021-08-11T00:17:11.590Z",
        isDelete: false
      },
      productName: "Táo Royal Gala PG size 100-120 500g"
    },
    {
      id: 3,
      sku: "10617956",
      description: "<h2><strong>Giới thiệu tổng quan về </strong>Thịt vai heo Meat Deli 400g</h2><p><strong>Thịt vai heo Meat Deli 400g</strong> được sản xuất và đóng gói bởi thương hiệu&nbsp;<strong>Meat Deli</strong> – là một thương hiệu của <strong>Tập đoàn Masan</strong> chuyên về sản xuất, chế biến và đóng gói các mặt hàng, sản phẩm thịt tươi, thịt mát sạch, cao cấp,&nbsp; đảm bảo vệ sinh an toàn thực phẩm. Thương hiệu được giới thiệu tới thị trường Việt Nam vào ngày 23/12/2018, đến nay dòng sản phẩm thịt mát của Meat Deli vẫn đang được rất nhiều người dùng Việt Nam ưa chuộng.</p><p>Thịt vai heo là phần thịt lóc ra từ phần vai của con heo, đã lọc bỏ xương, da và mỡ thừa. Đây cũng là một phần thịt heo rất ngon vì có tỷ lệ nạc mỡ cân bằng hòa lẫn vào nhau, không quá khô mà cũng không ngấy mỡ. Phần thịt này có độ dai và giòn hơn, nên được dùng nhiều trong các món kho, chiên rán, nướng.</p><p><strong>Sản phẩm Thịt vai heo Meat Deli 400g </strong>được chọn lọc kỹ càng, đảm bảo vệ sinh an toàn thực phẩm. Hơn nữa, các sản phẩm thịt của Meat Deli được đóng gói ở nhiệt độ từ 0 đến 4 độ C cùng với công nghệ Oxy Fresh 9 giúp ngăn chặn vi khuẩn, làm thịt có thể tươi ngon suốt 9 ngày (Chỉ áp dụng cho thịt ba rọi, với các sản phẩm khác người dùng nên kiểm tra lại trên bao bì).</p><p><strong>Lưu ý:</strong></p><p><strong>- Hạn sử dụng thực tế quý khách vui lòng xem trên bao bì.</strong></p><p><strong>- Hình sản phẩm chỉ mang tính chất minh họa, hình bao bì của sản phẩm tùy thời điểm sẽ khác so với thực tế.</strong></p>",
      price: 63960,
      unit: "",
      discount: 0,
      categoryId: 4,
      supplierId: 1,
      createdAt: "2021-08-12T01:27:38.226Z",
      updatedAt: "2021-08-12T01:27:38.226Z",
      smallImage: "https://lh3.googleusercontent.com/frNEki7SOCgRA-8-3aY1qCDmUFqr1ehmdreM_oc5a21hsihAtelO4H0H_Xi8r5pG2hZVmml3LBQYGNUtn1c=w185",
      largeImage: "https://lh3.googleusercontent.com/frNEki7SOCgRA-8-3aY1qCDmUFqr1ehmdreM_oc5a21hsihAtelO4H0H_Xi8r5pG2hZVmml3LBQYGNUtn1c",
      isDelete: false,
      category: {
        id: 4,
        name: "Thịt - Hải sản - Trứng",
        description: "",
        image: "https://image.cooky.vn/ads/s320/e7728abb-2f5c-4e3e-8a7e-ee8d9bfab13a.png",
        isDelete: false,
        createdAt: "2021-08-11T00:10:26.629Z",
        updatedAt: "2021-08-11T00:10:26.629Z"
      },
      supplier: {
        id: 1,
        name: "MEATDeli",
        email: "meatdeli@gmail.com",
        phone: "123456789",
        address: "227 Nguyễn Văn Cừ, phường 4, quận 5",
        createdAt: "2021-08-11T00:14:58.838Z",
        updatedAt: "2021-08-11T00:14:58.838Z",
        isDelete: false
      },
      productName: "Thịt vai heo Meat Deli 400g"
    },
    {
      id: 2,
      sku: "10321746",
      description: "<h2>Giới thiệu&nbsp;Thịt Ba chỉ bò Mỹ đông lạnh cắt lát Fresh Foods (500g)</h2><p><strong>Thịt Ba chỉ bò Mỹ đông lạnh cắt lát Fresh Foods (500g)</strong> là sản phẩm thuộc thương hiệu công ty TNHH Thực phẩm sạch Thương Mại T&amp;P(&nbsp;Fresh Foods). Các sản phẩm của công ty đều được hiện nghiêm ngặt vấn đề vệ sinh an toàn thực phẩm theo đúng quy định quốc tế và theo tiêu chuẩn ISO, HACCP của châu Âu từ khâu sản xuất đến tay người tiêu dùng.</p><p>Sản phẩm rất tươi ngon đặc biệt những miếng thịt được thái bằng máy tự động trong môi trường có độ lạnh phù hợp đều tăm tắp, có màu hồng tươi, những dải mỡ nạc xen kẽ nhau tạo ra hương vị bơ béo mềm, thơm ngọt đậm đà sẽ làm hài lòng mọi đối tượng sử dụng.</p><p><strong>Thịt Ba chỉ bò Mỹ đông lạnh cắt lát Fresh Foods (500g)</strong> được đóng túi chắc chắn cẩn thận tiện lợi cho việc sử dụng và bảo quản tiện lợi. Đặc biệt dễ dàng đem đi chơi dã ngoại cùng bạn bè vô cùng tiện lợi đặc biệt trong chế biến các món nướng và lẩu vô cùng tuyệt vời.</p><p><strong>Lưu ý:</strong></p><p><strong>- Hạn sử dụng thực tế quý khách vui lòng xem trên bao bì.</strong></p><p><strong>- Hình sản phẩm chỉ mang tính chất minh họa, hình bao bì của sản phẩm tùy thời điểm sẽ khác so với thực tế.</strong></p>",
      price: 123900,
      unit: "",
      discount: 0,
      categoryId: 4,
      supplierId: 1,
      createdAt: "2021-08-12T00:58:39.385Z",
      updatedAt: "2021-08-12T00:58:39.385Z",
      smallImage: "https://lh3.googleusercontent.com/rusSWS59bGwXTYnSRM6kwa0mz8jMvv3KFUGO2FXvvWCVZmeFhzzqOu8hpHCPf2WMpnqkOH5XPX0mKTd70qk0=w185",
      largeImage: "https://lh3.googleusercontent.com/rusSWS59bGwXTYnSRM6kwa0mz8jMvv3KFUGO2FXvvWCVZmeFhzzqOu8hpHCPf2WMpnqkOH5XPX0mKTd70qk0",
      isDelete: false,
      category: {
        id: 4,
        name: "Thịt - Hải sản - Trứng",
        description: "",
        image: "https://image.cooky.vn/ads/s320/e7728abb-2f5c-4e3e-8a7e-ee8d9bfab13a.png",
        isDelete: false,
        createdAt: "2021-08-11T00:10:26.629Z",
        updatedAt: "2021-08-11T00:10:26.629Z"
      },
      supplier: {
        id: 1,
        name: "MEATDeli",
        email: "meatdeli@gmail.com",
        phone: "123456789",
        address: "227 Nguyễn Văn Cừ, phường 4, quận 5",
        createdAt: "2021-08-11T00:14:58.838Z",
        updatedAt: "2021-08-11T00:14:58.838Z",
        isDelete: false
      },
      productName: "Thịt Ba chỉ bò Mỹ đông lạnh cắt lát Fresh Foods (500g)"
    },
    {
      id: 27,
      sku: "10015811",
      description: "Bánh tiramisu là món bánh nước ngoài mà từ lâu đã rất quen thuộc với hầu hết chúng ta, được hầu hết chúng ta sử dụng trong các dịp quan trọng nhưng chúng ta thật sự vẫn chưa tìm hiểu rõ nguồn gốc và ý nghĩa của những câu chuyện về tiramisu",
      price: 6400,
      unit: "Gói",
      discount: 0,
      categoryId: 21,
      supplierId: 2,
      createdAt: "2021-09-21T14:43:56.514Z",
      updatedAt: "2021-09-21T14:43:56.514Z",
      smallImage: "https://cdn-crownx.winmart.vn/images/prod/162427299550810015811-G1-Loc-12-cuon-giay-ve-sinh-TOPLY--2-lop-.jpg",
      largeImage: "https://cdn-crownx.winmart.vn/images/prod/162427299550810015811-G1-Loc-12-cuon-giay-ve-sinh-TOPLY--2-lop-.jpg",
      isDelete: false,
      category: {
        id: 21,
        name: "Bánh Kẹo",
        description: "",
        image: "https://image.cooky.vn/ads/s320/8a2bac80-036d-4e0c-914d-17ac130c50ec.png",
        isDelete: false,
        createdAt: "2021-08-11T00:11:05.429Z",
        updatedAt: "2021-08-11T00:11:05.429Z"
      },
      supplier: {
        id: 2,
        name: "Vifon",
        email: "vifon@gmail.com",
        phone: "123456789",
        address: "227 Nguyễn Văn Cừ, phường 4, quận 5",
        createdAt: "2021-08-11T00:15:37.820Z",
        updatedAt: "2021-08-11T00:15:37.820Z",
        isDelete: false
      },
      productName: "Snack Toonies vị phô mai Orion gói 36g"
    },
    {
      id: 5,
      sku: "10235280",
      description: "<h2>Giới thiệu&nbsp;Kiwi xanh New Zealand hộp 4 trái</h2><ul><li>Quả Kiwi có hình bầu dục, vỏ phía ngoài có nhiều lông. Kích thước tương đương 1 quả trứng gà lớn (chiều dài: 5 cm và đường kính: 4,5 – 5,5 cm). Trọng lượng trung bình của một quả Kiwi New Zealand là từ 100g đến 130g. Loại quả khi chín có vị ngọt và hơi chua khi xanh với hương vị tuyệt vời cùng giá trị dinh dưỡng rất lớn đối với người thưởng thức</li><li>Một số nghiên cứu&nbsp;quả kiwi có hàm lượng Vitamin C, K 92,7mg và&nbsp;là nguồn cung cấp chất xơ và Vitamin E rất tốt cho cơ thể với hàm lượng 1,46 mg/100g rất tốt khi sử dụng</li><li><strong>Kiwi xanh New Zealand</strong> được đóng hộp đẹp mắt rất chắc chắn với số lượng 4 trái có thể là món quà biếu sang trọng trong những dịp lễ tết hay thăm hỏi sức khỏe cho người ốm, người già. Loại quả thường được sử dụng trự tiếp hoặc dùng làm các loại bánh ngọt, thạch hay sữa chua, kem,… vô cùng tuyệt vời cho gia đình mỗi dịp cuối tuần.</li></ul><p><strong>Cách sử dụng vào bảo quản Kiwi:</strong></p><ul><li>Loại quả này để tủ lạnh ăn sẽ ngon hơn, nếu quả chín để tủ sẽ giữ thêm được 5 đến 7 ngày.</li><li>Dễ dàng để thưởng thức loại quả này bằng cách cắt đôi hoặc dùng muỗng múc.</li><li>Bảo quản&nbsp;Kiwi vàng&nbsp;trong tủ lạnh ở nhiệt độ từ 0 – 4 độ C sẽ giữ được&nbsp;kiwi&nbsp;khoảng 2 tuần</li></ul><p><strong>Lưu ý:</strong></p><p><strong>- Hạn sử dụng thực tế quý khách vui lòng xem trên bao bì.</strong></p><p><strong>- Hình sản phẩm chỉ mang tính chất minh họa, hình bao bì của sản phẩm tùy thời điểm sẽ khác so với thực tế.</strong></p>",
      price: 75900,
      unit: "",
      discount: 0,
      categoryId: 2,
      supplierId: 8,
      createdAt: "2021-08-12T02:02:39.732Z",
      updatedAt: "2021-08-12T02:02:39.732Z",
      smallImage: "https://lh3.googleusercontent.com/3kfsyj0tRwVVEeMORIsfDBzNhXml4hPlybC2rzxCOj3N7sRl5Pgs9RJri3Hk6zxbizjWszGAv_fPQtNtuA=w185",
      largeImage: "https://lh3.googleusercontent.com/3kfsyj0tRwVVEeMORIsfDBzNhXml4hPlybC2rzxCOj3N7sRl5Pgs9RJri3Hk6zxbizjWszGAv_fPQtNtuA",
      isDelete: false,
      category: {
        id: 2,
        name: "Trái Cây",
        description: "",
        image: "https://image.cooky.vn/ads/s320/39d51e75-05cd-4c5b-a3a0-082bdae74b63.png",
        isDelete: false,
        createdAt: "2021-08-11T00:10:09.199Z",
        updatedAt: "2021-08-11T00:10:09.199Z"
      },
      supplier: {
        id: 8,
        name: "Trái cây nhập khẩu",
        email: "traicaynhapkhau@gmail.com",
        phone: "123456789",
        address: "227 Nguyễn Văn Cừ, phường 4, quận 5",
        createdAt: "2021-08-11T00:17:11.590Z",
        updatedAt: "2021-08-11T00:17:11.590Z",
        isDelete: false
      },
      productName: "Kiwi xanh New Zealand hộp 4 trái"
    },
    {
      id: 8,
      sku: "10053875",
      description: "<h2><strong>Giới thiệu sản phẩm Mồng tơi</strong></h2><p><strong>Mồng tơi </strong>là thực phẩm được các nhà khoa học đáng giá là khá dồi dào vitamin và khoáng chất. Nổi bật nhất là hàm lượng sắt, canxi, vitamin A, C và các vitamin nhóm B. Đây đều là những yếu tố vi lượng cần thiết cho cơ thể giúp nâng cao sức đề kháng cũng như có giá trị trong một số vấn đề về sức khỏe. Đây là loại thực phẩm rất dễ chế biến và ngon miệng. Cây mồng tơi thường được sử dụng trong bữa ăn hàng ngày hoặc được dùng để làm thực phẩm bổ dưỡng nhằm hỗ trợ và điều trị một số bệnh thông thường. Sản phẩm được phân phối bởi Vinmart và được bảo quản cẩn thận và chặt chẽ để mang tới cho khách hàng những sản phẩm có chất lượng tốt nhất.</p><p><strong>Lưu ý:</strong></p><p style='font-weight: 400;'><strong>- Hạn sử dụng thực tế quý khách vui lòng xem trên bao bì.</strong></p><p style='font-weight: 400;'><strong>- Hình sản phẩm chỉ mang tính chất minh họa, hình bao bì của sản phẩm tùy thời điểm sẽ khác so với thực tế.</strong></p><p><strong>- Hạn sử dụng thực tế quý khách vui lòng xem trên bao bì.</strong></p><p><strong>- Hình sản phẩm chỉ mang tính chất minh họa, hình bao bì của sản phẩm tùy thời điểm sẽ khác so với thực tế.</strong></p>",
      price: 5490,
      unit: "",
      discount: 0,
      categoryId: 1,
      supplierId: 7,
      createdAt: "2021-08-12T02:26:18.203Z",
      updatedAt: "2021-08-12T02:26:18.203Z",
      smallImage: "https://lh3.googleusercontent.com/2uHQ26t330GLfqagFGyMcU54C90g16GPB6laJ8DcgZ0xT1S-S-7sZ2l3ZTyYI3iQrRFkvtFzsFju9W54qftM=w185",
      largeImage: "https://lh3.googleusercontent.com/2uHQ26t330GLfqagFGyMcU54C90g16GPB6laJ8DcgZ0xT1S-S-7sZ2l3ZTyYI3iQrRFkvtFzsFju9W54qftM",
      isDelete: false,
      category: {
        id: 1,
        name: "Rau Củ",
        description: "",
        image: "https://image.cooky.vn/ads/s320/39d51e75-05cd-4c5b-a3a0-082bdae74b63.png",
        isDelete: false,
        createdAt: "2021-08-11T00:10:09.199Z",
        updatedAt: "2021-08-11T00:10:09.199Z"
      },
      supplier: {
        id: 7,
        name: "Nông sản nội địa",
        email: "nongsannoidia@gmail.com",
        phone: "123456789",
        address: "227 Nguyễn Văn Cừ, phường 4, quận 5",
        createdAt: "2021-08-11T00:16:53.035Z",
        updatedAt: "2021-08-11T00:16:53.035Z",
        isDelete: false
      },
      productName: "Mồng tơi 300g"
    },
    {
      id: 9,
      sku: "10010613",
      description: "<h2><strong>Giới thiệu sản phẩm Sữa tươi tiệt trùng ít đường TH True Milk hộp 110ml</strong></h2><h3><strong>Sữa tươi nguyên chất từ trang trại của TH</strong></h3><p><strong>Sữa tươi tiệt trùng ít đường TH True Milk hộp 110ml </strong>đạt tiêu chuẩn về hệ thống quản lý vệ sinh an toàn thực phẩm ISO 22000:2005 do tổ chức quốc tế BUREAU- VERITAS cấp. Sản phẩm được làm từ 100% sữa bò tươi.</p><p>Sản phẩm được chế biến trong quy trình hiện đại. Mỗi khâu sản xuất đều được giám sát chặt chẽ bởi hệ thống máy tính và con người. Tiếp đó, sản phẩm phải vượt qua bài kiểm tra chất lượng nghiêm ngặt. Tất cả đều với một mục đích mang đến một sản phẩm sữa ngon nhất, bổ dưỡng nhất, giá tốt nhất đến người tiêu dùng.</p><h3><strong>Đôi nét về thương hiệu</strong></h3><p>TH là viết tắt của True Happiness, có nghĩa là hạnh phúc đích thực. Ngay từ tên thương hiệu, những người lãnh đạo đã thể hiện mong muốn mang đến cho người tiêu dùng những sản phẩm sữa tốt nhất. Để từ đó, sản phẩm sữa cung cấp những dinh dưỡng tốt nhất cho người dùng. Giúp người tiêu dùng có cơ thể mạnh khỏe, nâng cao chất lượng cuộc sống và có cuộc sống tươi đẹp, hạnh phúc hơn.</p><p>Mọi lứa bò của trang trại TH đều được chăm sóc cẩn thận. Thức ăn chăn nuôi luôn được đảm bảo ở chất lượng tốt nhất. Mang đến chất lượng sữa tuyệt hảo nhất có thể. Thương hiệu TH đã dành được rất nhiều giải thưởng, chứng chỉ chứng nhận chất lượng sản phẩm. Tiêu biểu nhất đó là 3 lần giành được giải thưởng “Thương hiệu quốc gia” (Vietnam Value).</p><p><strong>Lưu ý:</strong></p><p><strong>- Hạn sử dụng thực tế quý khách vui lòng xem trên bao bì.</strong></p><p><strong>- Hình sản phẩm chỉ mang tính chất minh họa, hình bao bì của sản phẩm tùy thời điểm sẽ khác so với thực tế.</strong></p>",
      price: 21600,
      unit: "",
      discount: 0,
      categoryId: 5,
      supplierId: 9,
      createdAt: "2021-08-12T02:28:18.674Z",
      updatedAt: "2021-08-12T02:28:18.674Z",
      smallImage: "https://cdn-crownx.winmart.vn/images/prod/162427310103110010612-G4-Sua-tuoi-tiet-trung-guyon-Chat-TH-True-Milk-hop-220ml.jpg",
      largeImage: "https://cdn-crownx.winmart.vn/images/prod/162427310385310010607-G4-Loc-4-hop-sua-tuoi-tiet-trung-TH-True-Milk-ot-duong-180ml.jpg",
      isDelete: false,
      category: {
        id: 5,
        name: "Sữa",
        description: "",
        image: "https://image.cooky.vn/ads/s320/26d4fb05-a828-4292-a8b4-4e7a10e3722d.png",
        isDelete: false,
        createdAt: "2021-08-11T00:10:52.148Z",
        updatedAt: "2021-08-11T00:10:52.148Z"
      },
      supplier: {
        id: 9,
        name: "TH True Milk",
        email: "thtruemilk@gmail.com",
        phone: "123456789",
        address: "227 Nguyễn Văn Cừ, phường 4, quận 5",
        createdAt: "2021-08-11T00:17:49.321Z",
        updatedAt: "2021-08-11T00:17:49.321Z",
        isDelete: false
      },
      productName: "Sữa tươi tiệt trùng THTrue Milk ít đường 4 hộp x 180ml"
    },
    {
      id: 10,
      sku: "10005253",
      description: "<h2><strong>Giới thiệu sản phẩm Sữa chua uống men sống Probi Vinamilk chai 65ml</strong></h2><p><strong>Sữa chua uống men sống Probi Vinamilk chai 65ml </strong>là sản phẩm của thương hiệu Vinamilk, Việt Nam. Ra đời năm 2007, sản phẩm là kết quả của sự hợp tác giữa Vinamilk và Chr Hansen Đan Mạch – tập đoàn cung cấp sản phẩm men sống hàng đầu Châu Âu. Đây là một sản phẩm giúp tăng cường hệ vi sinh trong đường ruột, giúp hoạt động tiêu hóa được tốt hơn, tăng cường sức đề kháng và phòng ngừa mắc các bệnh cảm cúm thông thường.</p><h3><strong>Thông tin sản phẩm</strong></h3><ul><li><strong>Màu sắc sản phẩm: </strong>Trắng và xanh lá cây.</li><li><strong>Khối lượng: </strong>65 ml/chai.</li><li><strong>Hướng dẫn sử dụng: </strong>Uống trực tiếp.</li><li><strong>Thành phần: </strong>Nước, đường, sữa bột (3,3%), xirô fructoza, chất ổn định (405, 466), hương sữa chua tổng hợp …</li><li><strong>Bảo quản sản phẩm: </strong>Bảo quản lạnh ở nhiệt độ 6 - 8 độ C</li></ul><figure><img src='https://lh5.googleusercontent.com/GnKE5kQED1PFYCV60q8nMD4b_URwsbve3YxFumopDh83HS-yWl_ES_QbibMvi1EhMKuUMinXQN3LPXajhq_Te3CksDPZCAm56dFE0W-YiezutAeyGJezIS8v3aDymjgqm0NnlPI'></figure><p><strong>Sữa chua uống men sống Probi Vinamilk chai 65ml </strong>được sản xuất từ các nguyên liệu cao cấp, đảm bảo việc tạo ra sản phẩm có chất lượng cao, an toàn cho người sử dụng. Được ủ men lâu hơn 7 tuần so với các loại sữa chua thông thường khác, sữa chua Probi cung cấp cho cơ thể hơn 13 tỷ lợi khuẩn L. Casei 431, giúp tăng cường sức khỏe và sức đề kháng cho cơ thể hiệu quả.</p><p><strong>Sữa chua uống men sống Probi Vinamilk chai 65ml </strong>không sử dụng cho trẻ em dưới 1 tuổi và ngon hơn khi uống lạnh.</p><p><strong>Lưu ý:</strong></p><p><strong>- Hạn sử dụng thực tế quý khách vui lòng xem trên bao bì.</strong></p><p><strong>- Hình sản phẩm chỉ mang tính chất minh họa, hình bao bì của sản phẩm tùy thời điểm sẽ khác so với thực tế.</strong></p>",
      price: 24500,
      unit: "",
      discount: 0,
      categoryId: 5,
      supplierId: 10,
      createdAt: "2021-08-12T02:29:59.589Z",
      updatedAt: "2021-08-12T02:29:59.589Z",
      smallImage: "https://lh3.googleusercontent.com/2uHQ26t330GLfqagFGyMcU54C90g16GPB6laJ8DcgZ0xT1S-S-7sZ2l3ZTyYI3iQrRFkvtFzsFju9W54qftM=w185",
      largeImage: "https://lh3.googleusercontent.com/2uHQ26t330GLfqagFGyMcU54C90g16GPB6laJ8DcgZ0xT1S-S-7sZ2l3ZTyYI3iQrRFkvtFzsFju9W54qftM",
      isDelete: false,
      category: {
        id: 5,
        name: "Sữa",
        description: "",
        image: "https://image.cooky.vn/ads/s320/26d4fb05-a828-4292-a8b4-4e7a10e3722d.png",
        isDelete: false,
        createdAt: "2021-08-11T00:10:52.148Z",
        updatedAt: "2021-08-11T00:10:52.148Z"
      },
      supplier: {
        id: 10,
        name: "Vinamilk",
        email: "vinamilk@gmail.com",
        phone: "123456789",
        address: "227 Nguyễn Văn Cừ, phường 4, quận 5",
        createdAt: "2021-08-11T00:18:00.404Z",
        updatedAt: "2021-08-11T00:18:00.404Z",
        isDelete: false
      },
      productName: "Sữa chua uống men sống Probi Vinamilk lốc 5 chai x 65ml"
    },
    {
      id: 11,
      sku: "10602473",
      description: "<h2>Giới thiệu Chả cá chiên&nbsp;Quy Nhơn</h2><p><strong>Chả cá chiên&nbsp;Quy Nhơn</strong>&nbsp;được chế biến từ nguồn nguyên liệu tươi mới, giàu dinh dưỡng. Chả có mùi thơm và độ dai tự nhiên từ cá biển&nbsp;tươi ngon, cung cấp nhiều dưỡng chất như: protein, vitamin, khoáng chất... Sản phẩm đã được giã nhuyễn và ướp <strong>gia vị</strong> đầy đủ. Sau khi rã đông tự nhiên, có thể sử dụng ngay để chế biến nhiều món ăn ngon, rất nhanh chóng và tiện lợi.</p><p><strong>Chả cá chiên&nbsp;Quy Nhơn</strong>&nbsp;có nguồn gốc rõ ràng, được kiểm định chất lượng vệ sinh an toàn thực phẩm, bảo đảm cho người sử dụng. Vì thế, bạn có thể yên tâm sử dụng để mang đến bữa ăn ngon cho gia đình mỗi ngày.</p><p><strong>Lưu ý:</strong></p><p><strong>- Hạn sử dụng thực tế quý khách vui lòng xem trên bao bì.</strong></p><p><strong>- Hình sản phẩm chỉ mang tính chất minh họa, hình bao bì của sản phẩm tùy thời điểm sẽ khác so với thực tế.</strong></p>",
      price: 38000,
      unit: "",
      discount: 0,
      categoryId: 4,
      supplierId: 2,
      createdAt: "2021-08-12T02:32:52.613Z",
      updatedAt: "2021-08-12T02:32:52.613Z",
      smallImage: "https://lh3.googleusercontent.com/L-Wd2w-iqsrPRQBrbJfwobHCifAAESB_k_tJlCEHtGq-SChb49ARA3QB7uyDLRjWvBDHsTmY8Ffci4KQitQU5agr9uAKK7UK=w185",
      largeImage: "https://lh3.googleusercontent.com/L-Wd2w-iqsrPRQBrbJfwobHCifAAESB_k_tJlCEHtGq-SChb49ARA3QB7uyDLRjWvBDHsTmY8Ffci4KQitQU5agr9uAKK7UK",
      isDelete: false,
      category: {
        id: 4,
        name: "Thịt - Hải sản - Trứng",
        description: "",
        image: "https://image.cooky.vn/ads/s320/e7728abb-2f5c-4e3e-8a7e-ee8d9bfab13a.png",
        isDelete: false,
        createdAt: "2021-08-11T00:10:26.629Z",
        updatedAt: "2021-08-11T00:10:26.629Z"
      },
      supplier: {
        id: 2,
        name: "Vifon",
        email: "vifon@gmail.com",
        phone: "123456789",
        address: "227 Nguyễn Văn Cừ, phường 4, quận 5",
        createdAt: "2021-08-11T00:15:37.820Z",
        updatedAt: "2021-08-11T00:15:37.820Z",
        isDelete: false
      },
      productName: "Chả cá chiên Quy Nhơn 200g"
    },
    {
      id: 13,
      sku: "10009243",
      description: "<h2><strong>Giới&nbsp;thiệu sản phẩm Đường tinh luyện Biên Hòa gói 1kg</strong></h2><p>Đường tinh luyện Biên Hòa là loại đường tinh khiết cao cấp sản xuất từ giống mía tốt nhất, thông qua quá trình tinh lọc tự nhiên nên đường có vị ngọt dịu, mùi thơm và không có tạp chất.</p><p>Sử dụng công nghệ tẩy màu bằng than hoạt tính và nhựa trao đổi i-on, sản phẩm có được màu trắng tinh khiết, tự nhiên mà không sử dụng bất kì hóa chất tẩy trắng nào. Sản phẩm có thể dùng để pha chế các loại nước, tăng thêm vị ngọt cho món ăn, dùng làm bánh, chế biến một số các loại thực phẩm: chè, mứt…</p><figure><img src='https://lh3.googleusercontent.com/ML0_0Mb1JAnoCCvi2GSpCco5ULGJBqwfmrN6na0099kFrDcOF0HL1f_WGbqA-ySl_cw54_sJeK3OQBOuhhEqQRi-mH0lOddC' alt='https://lh3.googleusercontent.com/ML0_0Mb1JAnoCCvi2GSpCco5ULGJBqwfmrN6na0099kFrDcOF0HL1f_WGbqA-ySl_cw54_sJeK3OQBOuhhEqQRi-mH0lOddC'></figure><p>Đường tinh luyện Biên Hòa là sản phẩm sử dụng công nghệ sạch, không có hóa chất gây độc hại cho sức khỏe con người. Với công nghệ cacbonat hóa, từ đường thô, dây chuyền đã loại ra rất nhiều tạp chất, chất màu, đường khử… tốt cho người tiêu dùng.</p><p>Đường tinh luyện Biên Hòa được đóng gói cẩn thận với khối lượng lên tới 1kg tiện lợi cho người sử dụng giúp tiết kiệm chi phí khi sử dụng.</p><p><strong>Hướng dẫn sử dụng</strong></p><p>Dùng trong chế biến thức ăn, đồ uống</p><p><strong>Hướng dẫn bảo quản</strong></p><p>Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp</p><p><strong>Lưu ý:</strong></p><p><strong>- Hạn sử dụng thực tế quý khách vui lòng xem trên bao bì.</strong></p><p><strong>- Hình sản phẩm chỉ mang tính chất minh họa, hình bao bì của sản phẩm tùy thời điểm sẽ khác so với thực tế.</strong></p>",
      price: 26200,
      unit: "",
      discount: 0,
      categoryId: 3,
      supplierId: 13,
      createdAt: "2021-08-13T01:41:57.287Z",
      updatedAt: "2021-08-13T01:41:57.287Z",
      smallImage: "https://lh3.googleusercontent.com/ML0_0Mb1JAnoCCvi2GSpCco5ULGJBqwfmrN6na0099kFrDcOF0HL1f_WGbqA-ySl_cw54_sJeK3OQBOuhhEqQRi-mH0lOddC=w185",
      largeImage: "https://lh3.googleusercontent.com/ML0_0Mb1JAnoCCvi2GSpCco5ULGJBqwfmrN6na0099kFrDcOF0HL1f_WGbqA-ySl_cw54_sJeK3OQBOuhhEqQRi-mH0lOddC",
      isDelete: false,
      category: {
        id: 3,
        name: "Gia Vị - Đồ Khô",
        description: "",
        image: "https://image.cooky.vn/ads/s320/1459e7e9-0d7f-4812-a74b-edebc92d9950.jpeg",
        isDelete: false,
        createdAt: "2021-08-11T00:10:38.438Z",
        updatedAt: "2021-08-11T00:10:38.438Z"
      },
      supplier: {
        id: 13,
        name: "Biên Hòa",
        email: "bienhoa@gmail.com",
        phone: "123456789",
        address: "227 Nguyễn Văn Cừ, phường 4, quận 5",
        createdAt: "2021-08-13T01:41:30.706Z",
        updatedAt: "2021-08-13T01:41:30.706Z",
        isDelete: false
      },
      productName: "Đường tinh luyện Biên Hòa gói 1kg"
    },
    {
      id: 14,
      sku: "10008738",
      description: "<h2><strong>Giới thiệu tổng quan về Tương ớt CHIN-SU chai 250g.</strong></h2><p><strong>Tương ớt CHIN-SU chai 250g</strong> được sản xuất và đóng gói bởi hãng&nbsp;<strong>Chin-su</strong> - là một thương hiệu được ra đời vào năm 2002, CHIN-SU Việt Nam là nhãn hiệu cao cấp với sứ mệnh đem đến những gia vị hảo hạng cho bữa ăn ngon mỗi ngày của hàng triệu gia đình Việt Nam. Tính đến thời điểm hiện tại, CHIN-SU VN là nhãn hiệu số 1 trong thị trường gia vị cao cấp với danh mục sản phẩm đa dạng, bao gồm: nước mắm, nước tương, tương ớt, tương cà.</p><p><strong>Tương ớt CHIN-SU chai 250g</strong>&nbsp;được làm từ những trái ớt đỏ chín cây với hương thơm nồng của tỏi cùng sự biến tấu tinh tế của các loại gia vị để chiết rót nên từng dòng tương ớt sóng sánh, thơm cay tròn vị, quyện chặt vào từng món ăn.</p><figure><img src='https://tmp.phongvu.vn/wp-content/uploads/2020/09/Tương-ớt-CHIN-SU-chai-250g_2-e1600922740213.jpg' alt='Tương ớt CHIN-SU chai 250g_2'></figure><p><strong>Tương ớt CHIN-SU chai 250g</strong> cho ra màu đỏ tự nhiên mịn màng, mùi thơm dịu độc đáo, vị cay tự nhiên vừa phải.</p><p>Sản phẩm đạt tiêu chuẩn an toàn vệ sinh thực phẩm, không sử dụng chất tạo vị cay nhân tạo.</p><figure><img src='https://tmp.phongvu.vn/wp-content/uploads/2020/09/Tương-ớt-CHIN-SU-chai-250g_3-e1600922750105.jpg' alt='Tương ớt CHIN-SU chai 250g_3'></figure><p><strong>Hướng dẫn sử dụng:</strong></p><ul><li>Chấm quệt cùng món chiên: Gà chiên, xúc xích, cá viên chiên...</li><li>Trộn đều trong món xào/khô: Mì xào, miền xào, phở trộn...</li><li>Khuấy quyện trong món nước: Mì nước, bún, miến...</li><li>Nêm nếm ngay từ bước ướp nấu: Sườn xào chua ngọt, Cá xốt...</li><li>Làm xốt chua ngọt...</li></ul><p><strong>Hướng dẫn bảo quản:</strong></p><ul><li>Bảo quản nơi khô ráo, thoáng mát, tránh ánh nắng trực tiếp.</li><li>Đậy nắp kín và nên bảo quản lạnh sau khi mở nắp.</li></ul><p><strong>Lưu ý:</strong></p><p><strong>- Hạn sử dụng thực tế quý khách vui lòng xem trên bao bì.</strong></p><p><strong>- Hình sản phẩm chỉ mang tính chất minh họa, hình bao bì của sản phẩm tùy thời điểm sẽ khác so với thực tế.</strong></p>",
      price: 12100,
      unit: "",
      discount: 0,
      categoryId: 3,
      supplierId: 5,
      createdAt: "2021-08-13T01:44:08.087Z",
      updatedAt: "2021-08-13T01:44:08.087Z",
      smallImage: "https://lh3.googleusercontent.com/5_acEm9KN7IXdjaJqOLSVWVYkUCt46gbEt-UjwP7jmSP-4RzPz3nd8P1bPnvVSh8ImU0KcOtChmQTB_9Pz8=w185",
      largeImage: "https://lh3.googleusercontent.com/5_acEm9KN7IXdjaJqOLSVWVYkUCt46gbEt-UjwP7jmSP-4RzPz3nd8P1bPnvVSh8ImU0KcOtChmQTB_9Pz8",
      isDelete: false,
      category: {
        id: 3,
        name: "Gia Vị - Đồ Khô",
        description: "",
        image: "https://image.cooky.vn/ads/s320/1459e7e9-0d7f-4812-a74b-edebc92d9950.jpeg",
        isDelete: false,
        createdAt: "2021-08-11T00:10:38.438Z",
        updatedAt: "2021-08-11T00:10:38.438Z"
      },
      supplier: {
        id: 5,
        name: "CHIN-SU",
        email: "chinsu@gmail.com",
        phone: "123456789",
        address: "227 Nguyễn Văn Cừ, phường 4, quận 5",
        createdAt: "2021-08-11T00:16:11.857Z",
        updatedAt: "2021-08-11T00:16:11.857Z",
        isDelete: false
      },
      productName: "Tương ớt CHIN-SU chai 250g"
    },
    {
      id: 16,
      sku: "10007927",
      description: "<h2>Giới thiệu Mì gói ăn liền khoai tây vị xốt bò hầm Omachi gói 80g</h2><p><strong>Mì gói ăn liền khoai tây vị xốt bò hầm Omachi gói 80g </strong>được làm từ lúa mì và tinh chất khoai tây, hòa quyện với trứng và những hương liệu tuyệt vời, từng sợi mì Omachi vàng ươm dai ngon nay còn được đắm mình trong nước cốt từ thịt và xương nên càng đậm đà, hấp dẫn. Mì khoai tây Omachi xốt bò hầm với vị đậm đà của thịt bò hầm cùng vị ngọt bùi của cà rốt và vị the cay của ớt, sẵn sàng làm xiêu lòng bất cứ ai.<p><p><strong>Mì gói ăn liền khoai tây vị xốt bò hầm Omachi </strong>được sản xuất theo công nghệ hiện đại. Mọi khâu từ tuyển chọn nguyên liệu tới chế biến, đóng gói đều diễn ra khép kín dưới sự giám sát và kiểm tra nghiêm ngặt của các chuyên gia thực phẩm hàng đầu, theo đó sản phẩm không chứa hóa chất, chất bảo quản độc hại, đảm bảo an toàn cho sức khỏe người tiêu dùng.</p><p><strong>Hướng dẫn sử dụng:</strong></p><p>1. Cho vắt mì và các gói gia vị vào tô.</p><p>2. Đổ vào 400ml nước sôi và đậy trong 3 phút.</p><p>3. Mở nắp ra trộn đều và dùng được ngay.</p><p><strong>Hướng dẫn bảo quản: </strong>Bảo quản nơi khô ráo và tránh ánh nắng mặt trời.</p><p><strong>Lưu ý:</strong></p><p><strong>- Hạn sử dụng thực tế quý khách vui lòng xem trên bao bì.</strong></p><p><strong>- Hình sản phẩm chỉ mang tính chất minh họa, hình bao bì của sản phẩm tùy thời điểm sẽ khác so với thực tế.</strong></p>",
      price: 7100,
      unit: "",
      discount: 0,
      categoryId: 3,
      supplierId: 4,
      createdAt: "2021-08-13T01:47:33.156Z",
      updatedAt: "2021-08-13T01:47:33.156Z",
      smallImage: "https://lh3.googleusercontent.com/FaKeBzecAARKwOClTYxp_MBTO6E60jDWncSVCQ935dKymX6ui0FseMWnlFv1HoKZIXWozoH_L__vaD_vZSU=w185",
      largeImage: "https://lh3.googleusercontent.com/FaKeBzecAARKwOClTYxp_MBTO6E60jDWncSVCQ935dKymX6ui0FseMWnlFv1HoKZIXWozoH_L__vaD_vZSU",
      isDelete: false,
      category: {
        id: 3,
        name: "Gia Vị - Đồ Khô",
        description: "",
        image: "https://image.cooky.vn/ads/s320/1459e7e9-0d7f-4812-a74b-edebc92d9950.jpeg",
        isDelete: false,
        createdAt: "2021-08-11T00:10:38.438Z",
        updatedAt: "2021-08-11T00:10:38.438Z"
      },
      supplier: {
        id: 4,
        name: "Omachi",
        email: "omachi@gmail.com",
        phone: "123456789",
        address: "227 Nguyễn Văn Cừ, phường 4, quận 5",
        createdAt: "2021-08-11T00:16:00.822Z",
        updatedAt: "2021-08-11T00:16:00.822Z",
        isDelete: false
      },
      productName: "Mì gói ăn liền khoai tây vị xốt bò hầm Omachi gói 80g"
    },
    {
      id: 17,
      sku: "10010458",
      description: "<h2>Giới thiệu Kem đặc có đường Vinamilk Ngôi Sao Phương Nam hộp 1,284g</h2><h3>Thương hiệu</h3><p><strong>Kem đặc có đường Vinamilk Ngôi Sao Phương Nam hộp 1,284g&nbsp;</strong>là sản phẩm của Vinamilk, thương hiệu sữa hàng đầu tại Việt Nam được thành lập vào này 20/08/1976, chuyên về chế biến, sản xuất các mặt hàng sản phẩm bơ sữa và sữa bò. Với cam kết mang đến cho cộng đồng nguồn dinh dưỡng và chất lượng cao cấp hàng đầu bằng chính sự trân trọng, tình yêu và trách nhiệm cao của mình với cuộc sống con người và xã hội, các sản phẩm của thương hiệu này đã chiếm được sự tin tưởng của đa số người dùng trong nước cũng như trên thị trường quốc tế.</p><h3>Sản phẩm Sữa Đặc Có Đường Ngôi Sao Phương Nam Xanh (1284g)</h3><p>Hương nâu nồng nàn Hà Nội, chất hào sảng ly phin Sài Gòn hay cốc bạc xỉu đậm đà sẻ chia... tất cả đươh hòa quyện cùng vị cà phê và hương creamer đặc Ngôi Sao Phương Nam ngọt nào, mang đến cho bạn những khoảnh khắc thưởng thức tuyệt vời nhất.</p><p>Sánh mịn, ngọt thanh và thơm dịu, Sữa đặc Ngôi Sao Phương Nam hòa quyện<br>đắm say cùng vị cà phê đắng mang đến hương vị đậm đà, giúp bạn trải nghiệm<br>khoảnh khắc “cà phê sữa ngon đúng điệu”</p><p>Không chỉ dùng lại với những cốc cà phê, bạn còn có thể sáng tạo muôn vàn món ăn với sữa đặc hoàn hảo, có thể sử dụng cho nhiều mục đích khác nhau như uống như một loại sữa khi khuấy với nước ấm đã đun sôi, dùng với bánh mì, làm sữa chua, pha cà phê sữa, làm sinh tố,…</p><p>Sữa đặc Ngôi Sao Phương Nam được đóng lon nhỏ gọn, tiện lợi sử dụng trong gia đình, lon đựng sản phẩm làm từ nguyên liệu sạch, không lẫn tạp chất hóa học độc hại.</p><p><strong>Lưu ý:</strong></p><p><strong>- Hạn sử dụng thực tế quý khách vui lòng xem trên bao bì.</strong></p><p><strong>- Hình sản phẩm chỉ mang tính chất minh họa, hình bao bì của sản phẩm tùy thời điểm sẽ khác so với thực tế.</strong></p>",
      price: 63100,
      unit: "",
      discount: 0,
      categoryId: 5,
      supplierId: 10,
      createdAt: "2021-08-13T01:49:56.346Z",
      updatedAt: "2021-08-13T01:49:56.346Z",
      smallImage: "https://lh3.googleusercontent.com/W6SZoBRCJDj-Cf1x_LLbrsPjhe7pwjSHsugMEzgik5iTKjTOnGT5ES5MljgwKn4oqbN_WuIGZ0NmTMsPvDD_=w185",
      largeImage: "https://lh3.googleusercontent.com/W6SZoBRCJDj-Cf1x_LLbrsPjhe7pwjSHsugMEzgik5iTKjTOnGT5ES5MljgwKn4oqbN_WuIGZ0NmTMsPvDD_",
      isDelete: false,
      category: {
        id: 5,
        name: "Sữa",
        description: "",
        image: "https://image.cooky.vn/ads/s320/26d4fb05-a828-4292-a8b4-4e7a10e3722d.png",
        isDelete: false,
        createdAt: "2021-08-11T00:10:52.148Z",
        updatedAt: "2021-08-11T00:10:52.148Z"
      },
      supplier: {
        id: 10,
        name: "Vinamilk",
        email: "vinamilk@gmail.com",
        phone: "123456789",
        address: "227 Nguyễn Văn Cừ, phường 4, quận 5",
        createdAt: "2021-08-11T00:18:00.404Z",
        updatedAt: "2021-08-11T00:18:00.404Z",
        isDelete: false
      },
      productName: "Sữa đặc Ngôi sao Phương Nam có đường hộp 1284g"
    },
    {
      id: 18,
      sku: "10322798",
      description: "<h2><strong>Giới thiệu sản phẩm&nbsp;Creamer đặc có đường Ngôi Sao Phương Nam Vinamilk hộp 1,284kg</strong></h2><p><strong>Creamer đặc có đường Ngôi Sao Phương Nam Vinamilk hộp 1,284kg</strong>&nbsp;là một trong những sản phẩm rất được tin dùng của thương hiệu&nbsp;<strong>Vinamilk</strong>. Điều này là hoàn toàn dễ hiểu vì&nbsp;<strong>Vinamilk&nbsp;</strong>là một thương hiệu lâu đời và đã có chỗ đứng vững chắc tại thị trường Việt Nam. Với hơn 200 chủng loại sản phẩm dinh dưỡng các loại, mỗi năm hàng tỷ sản phẩm của Vinamilk được khách hàng mua và sử dụng. Bên cạnh đó, Vinamilk cũng xuất khẩu sản phẩm của mình tới nhiều quốc gia và vùng lãnh thổ khác nhau trên thế giới.&nbsp;Ngoài 13 nhà máy tại Việt Nam, Vinamilk còn có 3 nhà máy tại Mỹ, New Zealand và Campuchia.</p><p><strong>Creamer đặc có đường Ngôi Sao Phương Nam Vinamilk hộp 1,284kg&nbsp;</strong>là sản phẩm được người tiêu dùng tin tưởng và sử dụng phổ biến trong các công thức chế biến như bánh flan, sinh tố, yogurt,...&nbsp;Đặc biệt, Ngôi Sao Phương Nam là bí quyết không thể thiếu để pha ly cà phê sữa thơm ngon, đúng điệu nhờ vào độ sánh đặc, thơm béo. Sản phẩm được sử dụng phù hợp cho cả gia đình.</p><p>Sản phẩm được sử dụng phổ biến để pha chế cà phê, sinh tố, làm bánh,... giúp tạo vị ngon đậm đà, sánh mịn cho tất cả các thức uống.&nbsp; Một bí quyết không thể thiếu trong các công thức pha chế, đặc biệt khi dùng với cà phê sẽ tạo ra mùi vị thơm ngon đặc trưng của ly cà phê sữa.</p><p><strong>Lưu ý:</strong></p><p style='font-weight: 400;'><strong>- Hạn sử dụng thực tế quý khách vui lòng xem trên bao bì.</strong></p><p style='font-weight: 400;'><strong>- Hình sản phẩm chỉ mang tính chất minh họa, hình bao bì của sản phẩm tùy thời điểm sẽ khác so với thực tế.</strong></p><p><strong>- Hạn sử dụng thực tế quý khách vui lòng xem trên bao bì.</strong></p><p><strong>- Hình sản phẩm chỉ mang tính chất minh họa, hình bao bì của sản phẩm tùy thời điểm sẽ khác so với thực tế.</strong></p>",
      price: 55200,
      unit: "",
      discount: 0,
      categoryId: 5,
      supplierId: 10,
      createdAt: "2021-08-13T01:51:40.171Z",
      updatedAt: "2021-08-13T01:51:40.171Z",
      smallImage: "https://lh3.googleusercontent.com/25pvT_thgq93VpZ4l5VD59zsP43F3SR2aYGKlLV5dVQrFr21b_WeZdmXPwCRfiLJ4ELDhsYb4xXkwYJTmw=w185",
      largeImage: "https://lh3.googleusercontent.com/25pvT_thgq93VpZ4l5VD59zsP43F3SR2aYGKlLV5dVQrFr21b_WeZdmXPwCRfiLJ4ELDhsYb4xXkwYJTmw",
      isDelete: false,
      category: {
        id: 5,
        name: "Sữa",
        description: "",
        image: "https://image.cooky.vn/ads/s320/26d4fb05-a828-4292-a8b4-4e7a10e3722d.png",
        isDelete: false,
        createdAt: "2021-08-11T00:10:52.148Z",
        updatedAt: "2021-08-11T00:10:52.148Z"
      },
      supplier: {
        id: 10,
        name: "Vinamilk",
        email: "vinamilk@gmail.com",
        phone: "123456789",
        address: "227 Nguyễn Văn Cừ, phường 4, quận 5",
        createdAt: "2021-08-11T00:18:00.404Z",
        updatedAt: "2021-08-11T00:18:00.404Z",
        isDelete: false
      },
      productName: "Creamer đặc có đường Ngôi Sao Phương Nam Vinamilk hộp 1,284kg"
    },
    {
      id: 19,
      sku: "10005402",
      description: "<h2><strong>Giới thiệu tổng quan về Sữa tiệt trùng Vinamilk không đường túi 220ml.</strong></h2><p><strong>Sữa tiệt trùng Vinamilk không đường túi 220ml</strong> với thành phần nước, đường tinh luyện, sữa bột, dầu thực vật, chất béo sữa, chất ổn định, hương liệu tổng hợp dùng cho thực phẩm... Sản phẩm với đầy đủ thành phần dưỡng chất, đảm bảo đáp ứng đầy đủ tất cả các nhu cầu dinh dưỡng của sức khỏe.</p><p>Sữa là một nguồn dinh dưỡng giàu canxi. Khoáng chất này rất cần thiết để giúp cho xương và răng khỏe mạnh. Hơn nữa, sữa cũng là một nguồn cung cấp&nbsp;giàu vitamin D, nó có tác dụng làm giảm viêm nhiễm và tăng cường hệ miễn dịch cho cơ thể. Ngoài ra, thành phần&nbsp;Protein có trong sữa, là điều cần thiết cho sự tăng trưởng cơ bắp đối với những người tham gia vào các hoạt động thể chất nên đưa sữa vào danh sách những thực phẩm thiết yếu hàng ngày. Sữa giúp bù lại nước cho cơ thể mà bạn bị mất sau khi tập thể dục, và làm giảm đau nhức cơ bắp.</p><p><strong>Sữa tiệt trùng Vinamilk không đường túi 220ml</strong> có chứa đạm, chất béo, canxi và các vitamin... cần thiết giúp xương chắc khỏe, cung cấp năng lượng cho quá trình vận động diễn ra hàng ngày của cơ thể.</p><p><strong>Lưu ý:</strong></p><p><strong>- Hạn sử dụng thực tế quý khách vui lòng xem trên bao bì.</strong></p><p><strong>- Hình sản phẩm chỉ mang tính chất minh họa, hình bao bì của sản phẩm tùy thời điểm sẽ khác so với thực tế.</strong></p>",
      price: 6900,
      unit: "",
      discount: 7,
      categoryId: 5,
      supplierId: 10,
      createdAt: "2021-08-13T01:53:21.178Z",
      updatedAt: "2021-08-13T01:53:21.178Z",
      smallImage: "https://lh3.googleusercontent.com/gVLhbx9BvlY9IqigIsbtWMup0VYowVPbm116j9Mfwk38WSAWB5c_aYQC-R447o9Ua7LHk47hc4QloJcgmw=w185",
      largeImage: "https://lh3.googleusercontent.com/gVLhbx9BvlY9IqigIsbtWMup0VYowVPbm116j9Mfwk38WSAWB5c_aYQC-R447o9Ua7LHk47hc4QloJcgmw",
      isDelete: false,
      category: {
        id: 5,
        name: "Sữa",
        description: "",
        image: "https://image.cooky.vn/ads/s320/26d4fb05-a828-4292-a8b4-4e7a10e3722d.png",
        isDelete: false,
        createdAt: "2021-08-11T00:10:52.148Z",
        updatedAt: "2021-08-11T00:10:52.148Z"
      },
      supplier: {
        id: 10,
        name: "Vinamilk",
        email: "vinamilk@gmail.com",
        phone: "123456789",
        address: "227 Nguyễn Văn Cừ, phường 4, quận 5",
        createdAt: "2021-08-11T00:18:00.404Z",
        updatedAt: "2021-08-11T00:18:00.404Z",
        isDelete: false
      },
      productName: "Sữa tiệt trùng Vinamilk không đường túi 220ml"
    },
    {
      id: 20,
      sku: "10234701",
      description: "<h2><strong>Giới thiệu tổng quan về&nbsp;Sữa bột Abbott Ensure Gold ít ngọt hương vani hộp 850g</strong></h2><p><strong>Sữa bột Abbott Ensure Gold ít ngọt hương vani hộp 850g</strong> được chế biến và sản xuất bởi thương hiệu&nbsp;<strong>Abbott</strong> –&nbsp;là một thương hiệu tầm quốc tế chuyên nghiên cứu, phát triển những loại dược phẩm và công nghệ mới nhằm mục tiêu chăm sóc &amp; nâng cao sức khỏe con người. Những sản phẩm của Abbott trải rộng từ dược phẩm, thực phẩm dinh dưỡng đến công nghệ y sinh và thiết bị chuyên dụng phục vụ trong y tế.</p><p><strong>Sữa bột Abbott Ensure Gold ít ngọt hương vani hộp 850g</strong> được đặc chế với hỗn hợp chất béo giàu PUFA, MUFA rất tốt cho hệ tim mạch cũng như cung cấp Cholin và Acid Oleic giúp hỗ trợ trí nhớ và hoạt động của hệ thần kinh. Ngoài ra,&nbsp;sữa cũng cung cấp các acid béo thiết yếu như Linoleic và Linolenic, hàm lượng acid béo no và Cholesterol thấp phù hợp với chế độ ăn lành mạnh hằng ngày của bạn.</p><p><strong>Sữa bột Abbott Ensure Gold ít ngọt hương vani hộp 850g</strong> giúp hệ tiêu hóa khỏe mạnh và hoạt động tốt. Dưỡng chất FOS có trong sữa còn được tăng thêm hiệu quả hoạt độngnhờ sự kết hợp lý tưởng với Inulin* (chất xơ hòa tan) để hình thành hệ Prebiotic kép – Beneo.</p><p>Hơn nữa, <strong>Sữa bột Abbott Ensure Gold ít ngọt hương vani hộp 850g</strong> còn cung cấp đầy đủ vitamin và khoáng chất rất thích hợp khi cần phục hồi sức khỏe nhanh. Người dùng cũng có thể dùng sữa để bổ sung vào khẩu phần ăn khi có nhu cầu tăng thêm về năng lượng và chất đạm, hoặc để duy trì tình trạng dinh dưỡng tốt Sữa Bột Abbott Ensure Gold ESS có thể thay thế hoàn toàn hay một phần bữa ăn để duy trì hoặc tăng cường sức khỏe cho bạn và gia đình.</p><p><strong>Sữa bột Abbott Ensure Gold ít ngọt hương vani hộp 850g</strong> thích hợp cho người ăn uống kém và người bệnh cần phục hồi nhanh.</p><p><strong>Lưu ý:</strong></p><p><strong>- Hạn sử dụng thực tế quý khách vui lòng xem trên bao bì.</strong></p><p><strong>- Hình sản phẩm chỉ mang tính chất minh họa, hình bao bì của sản phẩm tùy thời điểm sẽ khác so với thực tế.</strong></p>",
      price: 752000,
      unit: "",
      discount: 0,
      categoryId: 5,
      supplierId: 14,
      createdAt: "2021-08-13T01:55:48.173Z",
      updatedAt: "2021-08-13T01:55:48.173Z",
      smallImage: "https://lh3.googleusercontent.com/GLYJOUI6IRuAdWfwMdGp3I6hR4UJPfVEu9Lotk61klC4tLp-sb3WhgomBFmrM89ev2lut1LF9JpOEhxndQpl=w185",
      largeImage: "https://lh3.googleusercontent.com/GLYJOUI6IRuAdWfwMdGp3I6hR4UJPfVEu9Lotk61klC4tLp-sb3WhgomBFmrM89ev2lut1LF9JpOEhxndQpl",
      isDelete: false,
      category: {
        id: 5,
        name: "Sữa",
        description: "",
        image: "https://image.cooky.vn/ads/s320/26d4fb05-a828-4292-a8b4-4e7a10e3722d.png",
        isDelete: false,
        createdAt: "2021-08-11T00:10:52.148Z",
        updatedAt: "2021-08-11T00:10:52.148Z"
      },
      supplier: {
        id: 14,
        name: "Abbott",
        email: "abbott@gmail.com",
        phone: "123456789",
        address: "227 Nguyễn Văn Cừ, phường 4, quận 5",
        createdAt: "2021-08-13T01:55:42.003Z",
        updatedAt: "2021-08-13T01:55:42.003Z",
        isDelete: false
      },
      productName: "Sữa bột Abbott Ensure Gold ít ngọt hương vani 850g"
    },
    {
      id: 31,
      sku: "10054020",
      description: "<h2> Bắp cải trắng </h2><p><img src=\"https://tmp.phongvu.vn/wp-content/uploads/2021/05/Bắp-cải-trắng-500g-e1621997971169.jpg\"></p><h3>Thông tin sản phẩm</h3><p>Bắp cải trắng hay còn được gọi là cải bắp trắng thuộc họ cải, nhóm 2 lá mầm, cây thân thảo, sống khoảng hai năm. Ở nước ta, cải bắp trắng xuất hiện nhiều ở Tây Nguyên, các tỉnh miền Trung và phía Bắc, được trồng chủ yếu trong vụ đông xuân.</p><p>Loại rau này có vị ngọt thanh đặc trưng, chứa nhiều chất chống oxy hóa, đặc biệt nhất là Sulforaphane – một chất có khả năng phá hủy được những tế bào gây nên bệnh ung thư. Ngoài ra, trong Bắp cải trắng còn có vitamin A, C và P. Nghiên cứu khoa học còn chứng minh được rằng phụ nữ ăn khoảng 4 – 5 bữa ăn có cải bắp trong tuần thì nguy cơ mắc bệnh ung thư vú sẽ giảm đến 74%.</p><p>Bắp cải trắng thì chúng ta có thể chế biến được rất nhiều món ăn siêu ngon như súp, xào, luộc…</p>",
      price: 5490,
      unit: "",
      discount: 0,
      categoryId: 1,
      supplierId: 7,
      createdAt: "2021-08-12T02:26:18.203Z",
      updatedAt: "2021-08-12T02:26:18.203Z",
      smallImage: "https://cdn-crownx.winmart.vn/images/prod/162428572368810054020-KG-Bap-non-200g.jpg",
      largeImage: "https://cdn-crownx.winmart.vn/images/prod/162428572368810054020-KG-Bap-non-200g.jpg",
      isDelete: false,
      category: {
        id: 1,
        name: "Rau Củ",
        description: "",
        image: "https://image.cooky.vn/ads/s320/39d51e75-05cd-4c5b-a3a0-082bdae74b63.png",
        isDelete: false,
        createdAt: "2021-08-11T00:10:09.199Z",
        updatedAt: "2021-08-11T00:10:09.199Z"
      },
      supplier: {
        id: 7,
        name: "Nông sản nội địa",
        email: "nongsannoidia@gmail.com",
        phone: "123456789",
        address: "227 Nguyễn Văn Cừ, phường 4, quận 5",
        createdAt: "2021-08-11T00:16:53.035Z",
        updatedAt: "2021-08-11T00:16:53.035Z",
        isDelete: false
      },
      productName: "Bắp cải trắng"
    },
  ],
  pagination: {},
};

//----------ACTIONS----------
export const getProductList = createAsyncThunk(
  "products/getProductList",
  async () => {
    const response = await productApi.getProductList();
    return response.data;
  }
);

export const getProductsbySearch = createAsyncThunk(
  "products/getProductsbySearch",
  async (search) => {
    const res = await productApi.getProductsbySearch(search);
    if(res && res.data.totalCount > 0){
      return res;
    }
    return 0;
  }
);

export const getProductByIdAsync = createAsyncThunk(
  "products/getById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await productApi.getProductById(id);  
      return response.data;
    } catch (err) {
      let error = err;

      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductByCategoryAsync = createAsyncThunk(
  'products/getByCategory',
  async (id, { rejectWithValue }) => {
    try {
      const response = await productApi.getProductsByCategoryId(id);
      return response.data;
    } catch (err) {
      let error = err;

      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

export const getProductByCategorySingleAsync = createAsyncThunk(
  'products/getByCategorySingle',
  async (id, { rejectWithValue }) => {
    try {
      const response = await productApi.getProductsByCategoryId(id);
      return response.data;
    } catch (err) {
      let error = err;

      if (!error.response) {
        throw err;
      }

      return rejectWithValue(error.response.data);
    }
  }
);

//------------------------UTILITIES------------------------
const isPendingAction = (action) =>
  action.type.endsWith("/pending") && action.type.includes("product");
const isRejectedAction = (action) =>
  action.type.endsWith("/rejected") && action.type.includes("product");

//----------REDUCERS----------
const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    getProductsByCategoryId: (state, action) => {
      const { catId } = action.payload;

      state[`filteredProducts${catId}`]  = state.originalProducts.filter((product) => product.categoryId === catId);
    },
    getProductById: (state, action) => {
      const { productId } = action.payload;
      const result = state.originalProducts.find( ({ id }) => id === +productId);

      state.details = result;
    },
    setDataToEmpty: (state) => {
      state.detail = initialState.detail;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProductList.fulfilled, (state, action) => {
        state.isFetching = false;
        state.list = action.payload;
      })
      .addCase(getProductByIdAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getProductByIdAsync.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.details = payload;
      })
      .addCase(getProductByIdAsync.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.errorMessage;
        } else {
          state.error = action.error.message;
        }
         state.isFetching = false;
      })
      .addCase(getProductByCategoryAsync.pending, (state, {meta}) => {
        state[`isFetchingProductList${meta.arg}`] = true;
      })
      .addCase(getProductByCategoryAsync.fulfilled, (state, { meta, payload }) => {
        state[`isFetchingProductList${meta.arg}`] = false;
        state[`productList${meta.arg}`] = payload.data;
      })
      .addCase(getProductByCategoryAsync.rejected, (state, {meta, payload, error}) => {
        if (payload) {
          state.error = payload.errorMessage;
        } else {
          state.error = error.message;
        }
        state[`isFetchingProductList${meta.arg}`] = false;
      })
      .addCase(getProductByCategorySingleAsync.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(getProductByCategorySingleAsync.fulfilled, (state, { payload }) => {
        state.isFetching = false;
        state.products = payload.data;
      })
      .addCase(getProductByCategorySingleAsync.rejected, (state, {payload, error}) => {
        if (payload) {
          state.error = payload.errorMessage;
        } else {
          state.error = error.message;
        }
        state.isFetching = false;
      })
      // .addCase(getProductByIdAsync.pending, (state) => {
      //   state.isFetching = true;
      // })
      .addCase(getProductsbySearch.fulfilled, (state, action) => {
        state.isFetching = false;
        if (Array.isArray(action.payload?.data?.data) ) {
          state.list = action.payload?.data?.data
        }
        else
          state.list = []
      })

      //---------------PENDING & REJECTION---------------
      .addMatcher(isPendingAction, (state) => {
        state.isFetching = true;
      })
      .addMatcher(isRejectedAction, (state, action) => {
        state.isFetching = state.success = false;
        state.message = action.error.message;
        NotifyHelper.error(action.error.message, "Yêu cầu thất bại!");
      });
  },
});

export const { setDataToEmpty, getProductById } = productSlice.actions;

export const selectProduct = (state) => state.product;

export const selectProducts = (state) => state.product.products;
export const selectProductDetails = (state) => state.product.details;

export const selectIsFetching = (state) => state.product.isFetching;

export const selectIsFetching2 = (state) => state.product.isFetchingProductList2;

export const selectIsFetching3 = (state) => state.product.isFetchingProductList3;

export const selectIsFetching4 = (state) => state.product.isFetchingProductList4;

export const selectIsFetching5 = (state) => state.product.isFetchingProductList5;

export default productSlice.reducer;
