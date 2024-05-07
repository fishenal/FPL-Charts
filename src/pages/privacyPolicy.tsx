import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How Many Times App Privacy Policy",
  description: "How Many Times App Privacy Policy",
};

export default function PPPage({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <h1>Privacy Policy</h1>
      <p>
        This APP will not collect and store your personal information in any
        form, including account information and location information,
        advertising identification, device ID and other private information, and
        it is impossible to share your information with third parties or other
        users.
      </p>
      <h1>Privacy Policy Terms</h1>
      <p>
        By using this App, you agree to the terms and conditions of this Privacy
        Policy. If you do not agree to this policy, please do not use the App.
        We reserve the right to change, modify, add or delete parts of this
        policy at any time at our discretion. Please check this page
        periodically for any revisions. If you continue to use our App after the
        posting of any changes to these terms will mean that you have accepted
        those adjustments.
      </p>
    </div>
  );
}
