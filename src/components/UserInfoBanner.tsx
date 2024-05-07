import React from "react";
import { toast } from "react-toastify";
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
      toast.warning("ID need to be numbers");
    }
  };

  const renderDataInfo = () => {
    if (userInfoData) {
      return (
        <div className="flex items-center gap-2">
          <div className="cursor-pointer" onMouseOver={handleClick}>
            Current Data from User <AssignmentIndIcon /> {userInfoData.id}
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
          <CustomButton onClick={updateId}>Update My Data</CustomButton>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-2">
          No Available Data.
          <CustomButton>
            <Link href="/#help">Need Help?</Link>
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
            <span className="font-bold">Team Name: </span>
            {userInfoData.name}
          </p>
          <p>
            <span className="font-bold">Player Name: </span>
            {userInfoData.player_first_name} {userInfoData.player_last_name}
          </p>
          <p>
            <span className="font-bold">Region:</span>{" "}
            {userInfoData.player_region_name}
          </p>
          <p>
            <span className="font-bold">Overall Points:</span>{" "}
            {userInfoData.summary_overall_points}
          </p>
          <p>
            <span className="font-bold">Overall Rank: </span>
            {userInfoData.summary_overall_rank}
          </p>
          <p>
            <span className="font-bold">UpdateTime: </span>
            {dayjs(userInfoData.updateAt).format()}
          </p>
          <p>
            <span className="font-bold">Until GW: </span>
            {userInfoData.current_event}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="border-b">
      <div className="max-w-screen-lg mx-auto flex w-full">
        <div className="flex justify-between w-full my-4">
          {renderDataInfo()}
          <IdInput />
        </div>
        {/* {renderBasicInfo()} */}

        <GlobalLoading isLoading={isLoading} />
      </div>
    </div>
  );
};
