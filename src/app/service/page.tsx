import FramePage from "@/components/Frame";
import { Box, Typography } from "@mui/material";

const service = `
歡迎造訪 qingshu.shop（以下簡稱「本網站」）。在使用本網站前，請仔細閱讀本服務條款。使用本網站即表示您同意遵守以下條款。

一、使用條件

您同意僅以合法、合規的方式使用本網站。

您不得以任何方式干擾網站運作，包括但不限於：

非法存取網站內容

上傳惡意程式或病毒

破壞網站服務或其他使用者權益

二、知識產權

本網站所有內容，包括文字、圖片、影片、程式碼及設計，皆受著作權法及相關智慧財產權保護。

未經本網站書面同意，禁止以任何形式複製、轉載、公開或商業使用本網站內容。

三、廣告與第三方服務

本網站使用 Google AdSense 及其他第三方廣告服務。

第三方廣告商可能使用 Cookie 或其他技術提供個人化廣告。

對第三方服務的行為與政策，本網站概不負責。

若您對廣告內容有疑問，請參閱相關第三方隱私權政策。

四、責任限制

本網站提供的內容僅供參考，對於因使用本網站內容所造成的任何直接或間接損失，本網站不承擔任何法律責任。

本網站不保證網站服務將持續不中斷或無錯誤，亦不保證對特定結果之適用性。

五、隱私與個人資訊

本網站依照 隱私權政策 蒐集及使用資訊，請參閱本網站隱私權政策。

使用本網站即表示您同意我們依隱私權政策處理您的資訊。

六、服務條款修改

本網站保留隨時修改、更新本服務條款的權利。

任何修改將即時公告於本頁，使用者應定期查看。

若您繼續使用本網站，即表示您同意修改後的條款。

七、適用法律與爭議解決

本條款適用中華民國法律。

若有任何與本條款相關之爭議，雙方同意以台灣台北地方法院為第一審管轄法院。

八、聯絡我們

若您對本服務條款有任何疑問，請透過以下方式聯絡我們：

📧 6619766@gmail.shop

🌐 網站：https://qingshu.shop

`


function ServiceContent(){
    return (
      <>
        <Box>
          <Typography variant="h1" gutterBottom>
            服務條款
          </Typography>
          <Typography variant="body2" sx={{ whiteSpace: "pre-line" }}>
            {service}
          </Typography>
        </Box>
        
      </>
    );
}
export default function TermsofService() {
  return (
    <FramePage>
        <ServiceContent></ServiceContent>
    </FramePage>
  );
}