import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Many Times App Privacy Policy",
  description: "How Many Times App Privacy Policy",
};

export default function PPCNPage({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1>隐私政策</h1>
      <p>
        本APP不会收集及以任何形式储存您的个人信息，包括账号信息和位置信息，广告标识，设备ID等私密信息。.本APP不包含任何第三方服务和广告SDK，也不会向任何第三方或其他用户分享您的任何信息.
      </p>
      <h1>隐私政策条款</h1>
      <p>
        使用本App即表示您同意此隐私政策的条款和条件。如果您不同意本政策，请不要使用该App。我们保留权利，在我们決定更改，修改，增加或刪除本政策的部分，在任何時候。请定期浏览此网页查阅任何修改。如果您继续使用我们的App以后的任何更改这些条款的发布将意味着你已经接受了这些调整。
      </p>
    </div>
  );
}
