import type { Metadata } from "next";
import { RootLayout } from "../components/layout";

export const metadata: Metadata = {
  title: "How Many Times App Privacy Policy",
  description: "How Many Times App Privacy Policy",
};

export default function PPSite({ children }: { children: React.ReactNode }) {
  return (
    <RootLayout innerFix>
      <div className="my-8">
        <h1 className="font-bold text-xl mb-6">Privacy Policy</h1>
        <p>
          This Site will collect your <i>OPEN GAME DATA & FPL GAME ID</i> from{" "}
          <a href="https://fantasy.premierleague.com/">
            Premier League Fantasy
          </a>
          , and store them in your local browser(localStorage), It will never
          share to other sites or other players. Data not including FPL account
          information & login token & any privacy data, and it is impossible to
          share your information with third parties or other users. Beside that,
          will not collect and store other data, including your personal
          information ,account information and location information, advertising
          identification, device ID and other private information, and it is
          impossible to share your information with third parties or other
          users.
        </p>
        <h1>Privacy Policy Terms</h1>
        <p>
          By using this App, you agree to the terms and conditions of this
          Privacy Policy. If you do not agree to this policy, please do not use
          the App. We reserve the right to change, modify, add or delete parts
          of this policy at any time at our discretion. Please check this page
          periodically for any revisions. If you continue to use our App after
          the posting of any changes to these terms will mean that you have
          accepted those adjustments.
        </p>
      </div>
    </RootLayout>
  );
}
