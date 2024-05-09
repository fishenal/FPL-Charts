import React from "react";
import { useAppConfig } from "../hooks/useAppConfig";
import { SolvedBasicInfo, basicInfofetcher } from "@/lib/fetcher";
import useSWR from "swr";
import dayjs from "dayjs";
import { GlobalLoading } from "./globalLoading";
import Link from "next/link";
import { CustomButton } from "./Button";
import { IdInput } from "./IdInput";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import Popover from "@mui/material/Popover";
import { EventBus } from "@/utils/eventBus";
import i18nHelper from "@/i18n";

export const UserInfoBanner = () => {
  const { id, setId } = useAppConfig();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const { data: userInfoData, isLoading } = useSWR<SolvedBasicInfo>(
    () => (id ? `/api/fpl/user/${id}` : ""),
    basicInfofetcher
  );

  const updateId = () => {
    if (/^\d+$/.test(id)) {
      setId(id);
    } else {
      EventBus.$emit("onMessage", i18nHelper.t("message.idNumber"));
    }
  };

  const renderDataInfo = () => {
    if (userInfoData) {
      return (
        <div className="flex sm:items-center gap-2 flex-col sm:flex-row items-start pb-2 sm:pb-0">
          <div className="cursor-pointer" onMouseOver={handleClick}>
            {i18nHelper.t("currentUser")} <AssignmentIndIcon />{" "}
            {userInfoData.id}
          </div>
          <Popover
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <div className="p-4 rounded-md">{renderBasicInfo()}</div>
          </Popover>
          <CustomButton onClick={updateId}>
            {i18nHelper.t("updateData")}
          </CustomButton>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-2 flex-col sm:flex-row">
          {i18nHelper.t("noData")}
          <CustomButton>
            <Link href="/appHelp">{i18nHelper.t("needHelp")}</Link>
          </CustomButton>
        </div>
      );
    }
  };

  const renderBasicInfo = () => {
    if (userInfoData) {
      return (
        <div>
          <p>
            <span className="font-bold">{i18nHelper.t("user.team")}</span>
            {userInfoData.name}
          </p>
          <p>
            <span className="font-bold">{i18nHelper.t("user.player")}</span>
            {userInfoData.player_first_name} {userInfoData.player_last_name}
          </p>
          <p>
            <span className="font-bold">{i18nHelper.t("user.region")}</span>
            {userInfoData.player_region_name}
          </p>
          <p>
            <span className="font-bold">{i18nHelper.t("user.points")}</span>{" "}
            {userInfoData.summary_overall_points}
          </p>
          <p>
            <span className="font-bold">{i18nHelper.t("user.rank")}</span>
            {userInfoData.summary_overall_rank}
          </p>
          <p>
            <span className="font-bold">{i18nHelper.t("user.updateTime")}</span>
            {dayjs(userInfoData.updateAt).format("DD/MM/YYYY")}
          </p>
          <p>
            <span className="font-bold">{i18nHelper.t("user.gw")}</span>
            {userInfoData.current_event}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="border-b">
      <div className="max-w-screen-lg mx-4 lg:mx-auto">
        <div className="flex justify-between w-full my-4 flex-col sm:flex-row">
          {renderDataInfo()}
          <IdInput />
        </div>

        <GlobalLoading isLoading={isLoading} />
      </div>
    </div>
  );
};
