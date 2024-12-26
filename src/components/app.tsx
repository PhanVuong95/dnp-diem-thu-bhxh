import React, { Suspense, useEffect } from "react";
import { RecoilRoot } from "recoil";
import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import { App, ZMPRouter, SnackbarProvider } from "zmp-ui";
import HomePage from "../pages";
import LayoutPage from "../layout/layout";
import HistoryPage from "../pages/history_page";
import UserPage from "../pages/user";
import ListSocialInsurance from "../pages/list_social_insurance";
import ListHealthInsurance from "../pages/BHYT/list_health_insurance";
import ProductDetailPage from "./product_detail";
import BillPayPage from "./bill_pay";
import BillPayBHYTPage from "./bill_pay_bhyt";
import BuillDetailPage from "../pages/bill_detail";
import RegisterBHXH from "./register_bhxh";
import ProductDetailPage1 from "./product_detail_1";
import HistoryUnpaidPage from "./history_unpaid";
import ListsHistoryPage from "../pages/lists_history_page";
import { SpecificProvider } from "./specific_context";
import RegisterBHYT from "../pages/BHYT/register_bhyt";
import ListHistoryBHYT from "../pages/BHYT/list_history_bhyt";
import InfoDetailBHYT from "../pages/BHYT/info_detail_bhyt";
import { ProfileProvider } from "./user_profile_context";
import splash from "../../assets-src/splash.png";
import { closeLoading } from "zmp-sdk/apis";
import CheckStatusProcedure from "../pages/check_status_procedure";
import PrivacyPolicyPage from "./privacy_policy";
import LuckUpBHXH from "../pages/luckup_bhxh";
import LoginPortalPage from "../pages/LoginPortal/portal";
import ProfileDetailPage from "../pages/profile_detail_page";
import GuidePage from "../pages/guide_page";
import PolicyTermPage from "../pages/policy_terms_page";
import RegisterCollaborate from "../pages/register_collaborate_page";
import PartnerPage from "../pages/partner_page";
import PartnerTermsPage from "../pages/partnership_terms_page";
import IntroducingPartnersPage from "../pages/introducing_partners_page";
import ProfilePartnerDetailPage from "../pages/profile_partner_detail_page";
import BankInfoPage from "../pages/bank_info";
import ReportPartnerPage from "../pages/report_partner_page";
import ListCollabrorates from "../pages/list_collabrorate_page";
import ProfileCollaborateDetailPage from "../pages/profile_collaborate_detail_page";
import ScrollToTop from "../utils/hock";
import ToolSupportPage from "../pages/tool_support_page";
import WithdrawBHXH from "./withdraw_bhxh";
import CloseRateBXH from "./close_rate_bhxh";
import PensionCalculation from "./pension_calculation";
import CardNewDetailPage from "./card_new_detail_page"

const MyApp = () => {
  useEffect(() => {
    closeLoading({

      fail: (error) => {
        console.log(error);
      },
    });
  }, []);

  return (
    <RecoilRoot>
      <ProfileProvider>
        <Suspense fallback={<img src={splash} />}>
          <App>
            <ToastContainer
              style={{
                width: "80%",
                borderRadius: "20px",
                marginTop: "40px",
                marginLeft: "10%",
                marginRight: "10%",
              }}
              toastStyle={{
                borderRadius: "7px",
              }}
              position="top-center"
              autoClose={3000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
            <SnackbarProvider>
              <ZMPRouter>
                <Routes>
                  <Route path="/" element={<LayoutPage key="layout" />}>
                    <Route index element={<HomePage />} />
                    <Route path="partner" element={<PartnerPage />} />
                    <Route path="history" element={<HistoryPage />} />
                    <Route path="user" element={<UserPage />} />
                  </Route>

                  <Route
                    path="/social-insurance"
                    element={
                      <SpecificProvider>
                        <ListSocialInsurance />
                      </SpecificProvider>
                    }
                  />

                  <Route
                    path="/health-insurance"
                    element={<ListHealthInsurance />}
                  />

                  <Route
                    path="/product-detail/:id"
                    element={
                      <SpecificProvider>
                        <ProductDetailPage />
                      </SpecificProvider>
                    }
                  />

                  <Route
                    path="/product-detail-1/:id"
                    element={<ProductDetailPage1 />}
                  />

                  <Route
                    path="/privacy_policy/"
                    element={<PrivacyPolicyPage />}
                  />

                  <Route
                    path="/buill-pay/:id"
                    element={
                      <SpecificProvider>
                        <BillPayPage w={""} h={""} url={""} />
                      </SpecificProvider>
                    }
                  />

                  <Route
                    path="/bill-pay-bhyt/:id"
                    element={<BillPayBHYTPage />}
                  />

                  <Route
                    path="/buill-detail/:id"
                    element={
                      <SpecificProvider>
                        <BuillDetailPage />
                      </SpecificProvider>
                    }
                  />

                  <Route
                    path="/register-BHXH"
                    element={
                      <SpecificProvider>
                        <RegisterBHXH />
                      </SpecificProvider>
                    }
                  />

                  <Route path="/register-BHYT/"
                    element={<RegisterBHYT />} />

                  <Route
                    path="/lists-history"
                    element={<ListsHistoryPage w={""} h={""} url={""} />}
                  />

                  <Route
                    path="/info-detail-bhyt/:id/:statusName"
                    element={<InfoDetailBHYT />}
                  />

                  <Route
                    path="/list-history-bhyt"
                    element={<ListHistoryBHYT />}
                  />

                  <Route
                    path="/check-status-procedure/:id"
                    element={<CheckStatusProcedure />}
                  />


                  <Route
                    path="/history-unpaid/:id/:statusName"
                    element={
                      <SpecificProvider>
                        <HistoryUnpaidPage />
                      </SpecificProvider>
                    }
                  />

                  {/* Tra cứu bảo hiểm xã hội  */}
                  <Route path="/luckup-bhxh"
                    element={<LuckUpBHXH />} />

                  {/* Login web  */}
                  <Route
                    path="/login/portal"
                    element={<LoginPortalPage />}
                  />

                  {/* Chi tiết thông tin tài khoản */}
                  <Route
                    path="/user-detail"
                    element={<ProfileDetailPage />}
                  />

                  {/* Tài liệu hướng đẫn*/}
                  <Route
                    path="/guide"
                    element={<GuidePage />}
                  />

                  {/* Điều kiện và điều khoản sử dụng dịch vụ */}
                  <Route
                    path="/policy-terms"
                    element={<PolicyTermPage />}
                  />

                  {/* Điều khoản đối tác */}
                  <Route
                    path="/partnership-terms"
                    element={<PartnerTermsPage />}
                  />

                  {/* Đăng ký công tác viên */}
                  <Route
                    path="/register-collaborate"
                    element={<RegisterCollaborate />}
                  />

                  {/* Thông tin giới thiệu đối tác */}
                  <Route
                    path="/introducing-partners"
                    element={<IntroducingPartnersPage />}
                  />


                  {/* Thông tin giới thiệu đối tác */}
                  <Route
                    path="/profile-partner-detail"
                    element={<ProfilePartnerDetailPage />}
                  />

                  {/* Thông tin ngân hàng */}
                  <Route
                    path="/bank-info"
                    element={<BankInfoPage />}
                  />

                  {/* Báo cáo thống kê */}
                  <Route
                    path="/report-partner"
                    element={<ReportPartnerPage />}
                  />

                  {/* Danh sách cộng tác viên*/}
                  <Route
                    path="/list-collabrorate"
                    element={<ListCollabrorates />}
                  />

                  {/* Danh sách cộng tác viên*/}
                  <Route
                    path="/profile-collaborate-detail/:id"
                    element={<ProfileCollaborateDetailPage />}
                  />

                  <Route
                    path="/tool-support"
                    element={<ToolSupportPage />}
                  />

                  {/* Tính toán lương hưu */}
                  <Route
                    path="/pension-calculation"
                    element={<PensionCalculation />}
                  />

                  {/* Rút BHXH một lần */}
                  <Route
                    path="/withdraw-bhxh"
                    element={<WithdrawBHXH />}
                  />

                  {/* Mức đóng BHXH còn thiếu */}
                  <Route
                    path="/close-rate-bhxh"
                    element={<CloseRateBXH />}
                  />

                  {/* Chi tiết tin tức */}
                  <Route path="new-detail/:id" element={<CardNewDetailPage />} />
                </Routes>
              </ZMPRouter>
            </SnackbarProvider>
          </App>
        </Suspense>
      </ProfileProvider>
    </RecoilRoot>
  );
};

export default MyApp;
