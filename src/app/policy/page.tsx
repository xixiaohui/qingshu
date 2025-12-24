import FramePage from "@/components/Frame";
import { Box, Typography } from "@mui/material";

const privacy = `
歡迎造訪 qingshu.shop（以下簡稱「本網站」）。
我們非常重視您的隱私權，致力於保護您的個人資訊安全。本隱私權政策說明我們如何蒐集、使用與保護您的資訊。
一、我們蒐集的資訊
當您造訪本網站時，我們可能會自動蒐集以下非個人識別資訊： 瀏覽器類型
裝置資訊 訪問時間 訪問頁面 來源網址（Referrer）
這些資訊僅用於網站統計及優化使用者體驗，不會用於辨識您的個人身份。

二、Cookie 的使用 本網站可能會使用 Cookie
來儲存訪客偏好，以提升使用者體驗。 Cookie 可能用途：
記錄使用者瀏覽行為 分析網站流量 提供個人化內容與廣告
您可以透過瀏覽器設定選擇停用
Cookie，但這可能影響部分網站功能正常運作。 

三、Google AdSense
與第三方廣告 本網站使用 Google AdSense 提供廣告服務。 Google
及其合作夥伴可能會： 使用 Cookie（包括 DoubleClick Cookie）
根據使用者造訪本網站及其他網站的情況，顯示相關廣告 Google
如何使用資料： Google 會使用 Cookie 來投放廣告
使用者可透過以下連結了解更多資訊並選擇退出個人化廣告： 👉
https://policies.google.com/technologies/ads 

四、第三方隱私權政策
本網站的隱私權政策 不適用於其他廣告商或第三方網站。
建議您查閱這些第三方廣告商或網站的隱私權政策，以獲取更詳細資訊。

五、兒童資訊保護 本網站不會主動蒐集任何 13 歲以下兒童的個人資訊。
若您認為您的孩子在本網站提供了個人資訊，請立即聯絡我們，我們將及時刪除相關資料。

六、隱私權政策的同意
使用本網站，即表示您同意本隱私權政策，並同意其條款內容。

七、隱私權政策的更新 我們可能會不定期更新本隱私權政策。
所有更改將在本頁發布，建議您定期查看。 

八、聯絡我們
若您對本隱私權政策有任何疑問，請透過以下方式聯絡我們： 
📧 6619766@gmail.com 
🌐 網站：https://qingshu.shop

`


function PrivacyPolicyContent(){
    return (
      <>
        <Box>
          <Typography variant="h1" gutterBottom>
            隱私權政策
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
            {privacy}
          </Typography>
        </Box>
        
      </>
    );
}
export default function PrivacyPolicy() {
  return (
    <FramePage>
        <PrivacyPolicyContent></PrivacyPolicyContent>
    </FramePage>
  );
}