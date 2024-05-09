import { HowTo } from "@/components/howTo";
import { RootLayout } from "@/components/layout";

export default function AppHelp() {
  return (
    <RootLayout withoutUserInfoBanner>
      <HowTo />
    </RootLayout>
  );
}
